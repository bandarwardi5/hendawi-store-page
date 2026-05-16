import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQOuX4og4AhyNo4kRfHSUFKfo2CqUik1k",
  authDomain: "hendawi-store.firebaseapp.com",
  projectId: "hendawi-store",
  storageBucket: "hendawi-store.firebasestorage.app",
  messagingSenderId: "773201910311",
  appId: "1:773201910311:web:9ae82bdd5d8a624e71cc02",
  measurementId: "G-442KCZ5Q8V",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
