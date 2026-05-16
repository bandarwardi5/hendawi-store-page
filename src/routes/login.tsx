import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, FormEvent } from "react";
import { Layout } from "@/components/site/Layout";
import { useAuth } from "@/lib/auth-context";
import { Loader2, Mail, Lock } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [{ title: "تسجيل الدخول — Hendawi Group" }],
  }),
});

function LoginPage() {
  const { signIn, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErr("");
    setMsg("");
    setLoading(true);
    try {
      await signIn(email, password);
      navigate({ to: "/profile" });
    } catch (e: any) {
      setErr(translateError(e.code));
    } finally {
      setLoading(false);
    }
  };

  const onReset = async () => {
    if (!email) {
      setErr("أدخل بريدك الإلكتروني أولاً");
      return;
    }
    setErr("");
    try {
      await resetPassword(email);
      setMsg("تم إرسال رابط استعادة كلمة المرور إلى بريدك.");
    } catch (e: any) {
      setErr(translateError(e.code));
    }
  };

  return (
    <Layout>
      <section className="container mx-auto px-6 py-20 max-w-md">
        <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
          <h1 className="font-display text-3xl text-navy-deep mb-2 text-center">تسجيل الدخول</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">أهلاً بعودتك إلى هنداوي</p>

          {err && <div className="bg-red-50 text-red-700 text-sm rounded-lg p-3 mb-4">{err}</div>}
          {msg && <div className="bg-emerald-50 text-emerald-700 text-sm rounded-lg p-3 mb-4">{msg}</div>}

          <form onSubmit={onSubmit} className="space-y-4">
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="كلمة المرور"
                className="w-full border border-border rounded-lg pr-10 pl-3 py-3 text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-navy-deep text-ivory hover:bg-gold hover:text-navy-deep transition py-3 rounded-lg font-bold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              دخول
            </button>
          </form>

          <button onClick={onReset} className="block mx-auto mt-4 text-xs text-muted-foreground hover:text-gold">
            نسيت كلمة المرور؟
          </button>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            ليس لديك حساب؟{" "}
            <Link to="/signup" className="text-gold font-semibold">إنشاء حساب</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function translateError(code: string): string {
  const map: Record<string, string> = {
    "auth/invalid-credential": "بريد إلكتروني أو كلمة مرور غير صحيحة",
    "auth/invalid-email": "البريد الإلكتروني غير صالح",
    "auth/user-not-found": "لا يوجد حساب بهذا البريد",
    "auth/wrong-password": "كلمة المرور غير صحيحة",
    "auth/email-already-in-use": "البريد مستخدم بالفعل",
    "auth/weak-password": "كلمة المرور ضعيفة (6 أحرف على الأقل)",
    "auth/too-many-requests": "محاولات كثيرة، حاول لاحقاً",
  };
  return map[code] || "حدث خطأ، حاول مجدداً";
}
