import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, FormEvent } from "react";
import { Layout } from "@/components/site/Layout";
import { useAuth } from "@/lib/auth-context";
import { Loader2, Mail, Lock, User as UserIcon } from "lucide-react";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  head: () => ({
    meta: [{ title: "إنشاء حساب — Hendawi Group" }],
  }),
});

function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await signUp(email, password, name);
      navigate({ to: "/profile" });
    } catch (e: any) {
      const code = e.code || "";
      const map: Record<string, string> = {
        "auth/email-already-in-use": "البريد مستخدم بالفعل",
        "auth/weak-password": "كلمة المرور ضعيفة (6 أحرف على الأقل)",
        "auth/invalid-email": "البريد الإلكتروني غير صالح",
      };
      setErr(map[code] || "حدث خطأ، حاول مجدداً");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="container mx-auto px-6 py-20 max-w-md">
        <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
          <h1 className="font-display text-3xl text-navy-deep mb-2 text-center">إنشاء حساب</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">انضم إلى عالم هنداوي</p>

          {err && <div className="bg-red-50 text-red-700 text-sm rounded-lg p-3 mb-4">{err}</div>}

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="relative">
              <UserIcon className="absolute right-3 top-3.5 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="الاسم الكامل"
                className="w-full border border-border rounded-lg pr-10 pl-3 py-3 text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div className="relative">
              <Mail className="absolute right-3 top-3.5 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="البريد الإلكتروني"
                className="w-full border border-border rounded-lg pr-10 pl-3 py-3 text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div className="relative">
              <Lock className="absolute right-3 top-3.5 w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="كلمة المرور (6 أحرف على الأقل)"
                className="w-full border border-border rounded-lg pr-10 pl-3 py-3 text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-navy-deep hover:shadow-gold transition py-3 rounded-lg font-bold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              إنشاء الحساب
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            لديك حساب بالفعل؟{" "}
            <Link to="/login" className="text-gold font-semibold">تسجيل الدخول</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
