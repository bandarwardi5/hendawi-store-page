import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  role?: "user" | "admin";
}

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (u: User) => {
    const ref = doc(db, "profiles", u.uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      setProfile({ uid: u.uid, ...(snap.data() as Omit<UserProfile, "uid">) });
    } else {
      const newProfile: UserProfile = {
        uid: u.uid,
        email: u.email,
        displayName: u.displayName,
        role: "user",
      };
      await setDoc(ref, { ...newProfile, createdAt: serverTimestamp() });
      setProfile(newProfile);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          await loadProfile(u);
        } catch (e) {
          console.error("Failed to load profile", e);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(cred.user, { displayName });
    }
    await setDoc(doc(db, "profiles", cred.user.uid), {
      email: cred.user.email,
      displayName,
      role: "user",
      createdAt: serverTimestamp(),
    });
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const refreshProfile = async () => {
    if (user) await loadProfile(user);
  };

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, signIn, signUp, logout, resetPassword, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
