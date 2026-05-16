import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, FormEvent } from "react";
import { Layout, SectionTitle } from "@/components/site/Layout";
import { useAuth } from "@/lib/auth-context";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, LogOut, User as UserIcon, MapPin, Phone, Package, Heart } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({ meta: [{ title: "حسابي — Hendawi Group" }] }),
});

function ProfilePage() {
  const { user, profile, loading, logout, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    displayName: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/login" });
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (profile) {
      setForm({
        displayName: profile.displayName || "",
        phone: profile.phone || "",
        address: profile.address || "",
        city: profile.city || "",
        country: profile.country || "",
      });
    }
  }, [profile]);

  const onSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setMsg("");
    try {
      await updateDoc(doc(db, "profiles", user.uid), form);
      await refreshProfile();
      setMsg("تم حفظ التعديلات بنجاح");
    } catch (e) {
      setMsg("حدث خطأ أثناء الحفظ");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !user) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-32 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container mx-auto px-6 py-16">
        <SectionTitle eyebrow="حسابي" title={`أهلاً، ${profile?.displayName || user.email}`} center={false} />

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="bg-white border border-border rounded-2xl p-5 h-fit">
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <div className="w-12 h-12 rounded-full bg-gold text-navy-deep flex items-center justify-center font-bold">
                {(profile?.displayName || user.email || "?")[0].toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-navy-deep truncate">{profile?.displayName || "—"}</div>
                <div className="text-xs text-muted-foreground truncate">{user.email}</div>
              </div>
            </div>
            <nav className="flex flex-col gap-1 mt-3 text-sm">
              <a href="#info" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-beige text-navy-deep">
                <UserIcon className="w-4 h-4" /> المعلومات الشخصية
              </a>
              <a href="#orders" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-beige text-navy-deep">
                <Package className="w-4 h-4" /> طلباتي
              </a>
              <a href="#favorites" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-beige text-navy-deep">
                <Heart className="w-4 h-4" /> المفضلة
              </a>
              {profile?.role === "admin" && (
                <Link to="/admin" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-beige text-gold-deep font-semibold">
                  لوحة الإدارة
                </Link>
              )}
              <button
                onClick={async () => {
                  await logout();
                  navigate({ to: "/" });
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 mt-2"
              >
                <LogOut className="w-4 h-4" /> تسجيل الخروج
              </button>
            </nav>
          </aside>

          {/* Content */}
          <div className="space-y-8">
            <div id="info" className="bg-white border border-border rounded-2xl p-6">
              <h2 className="font-display text-2xl text-navy-deep mb-5">المعلومات الشخصية</h2>
              {msg && <div className="bg-emerald-50 text-emerald-700 text-sm rounded-lg p-3 mb-4">{msg}</div>}
              <form onSubmit={onSave} className="grid md:grid-cols-2 gap-4">
                <Field label="الاسم الكامل" icon={UserIcon} value={form.displayName} onChange={(v) => setForm({ ...form, displayName: v })} />
                <Field label="رقم الهاتف" icon={Phone} value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                <Field label="العنوان" icon={MapPin} value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
                <Field label="المدينة" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
                <Field label="الدولة" value={form.country} onChange={(v) => setForm({ ...form, country: v })} />
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-navy-deep text-ivory hover:bg-gold hover:text-navy-deep transition px-6 py-3 rounded-lg font-bold disabled:opacity-50 flex items-center gap-2"
                  >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    حفظ التعديلات
                  </button>
                </div>
              </form>
            </div>

            <div id="orders" className="bg-white border border-border rounded-2xl p-6">
              <h2 className="font-display text-2xl text-navy-deep mb-3">طلباتي</h2>
              <p className="text-sm text-muted-foreground">لا توجد طلبات سابقة بعد. ابدأ التسوّق الآن من <Link to="/" className="text-gold font-semibold">الرئيسية</Link>.</p>
            </div>

            <div id="favorites" className="bg-white border border-border rounded-2xl p-6">
              <h2 className="font-display text-2xl text-navy-deep mb-3">المفضلة</h2>
              <p className="text-sm text-muted-foreground">قائمة المفضلة فارغة حالياً.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Field({
  label,
  value,
  onChange,
  icon: Icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  icon?: any;
}) {
  return (
    <label className="block">
      <span className="block text-xs text-muted-foreground mb-1.5">{label}</span>
      <div className="relative">
        {Icon && <Icon className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full border border-border rounded-lg ${Icon ? "pr-10" : "pr-3"} pl-3 py-2.5 text-sm focus:outline-none focus:border-gold`}
        />
      </div>
    </label>
  );
}
