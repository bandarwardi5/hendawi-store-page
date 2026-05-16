import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { LayoutDashboard, Package, ShoppingBag, ArrowLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) return null;

  if (profile?.role !== "admin") {
    return (
      <div className="container py-20 text-center" dir="rtl">
        <h1 className="text-2xl font-bold mb-2">ممنوع الوصول</h1>
        <p className="text-muted-foreground mb-6">هذه الصفحة متاحة للمشرفين فقط.</p>
        <Link to="/" className="text-primary underline">العودة للرئيسية</Link>
      </div>
    );
  }

  const items = [
    { to: "/admin", label: "نظرة عامة", icon: LayoutDashboard, exact: true },
    { to: "/admin/products", label: "المنتجات", icon: Package },
    { to: "/admin/orders", label: "الطلبات", icon: ShoppingBag },
  ];

  return (
    <div className="container py-8" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        <aside className="rounded-2xl border bg-card p-3 h-fit">
          <div className="px-3 py-2 mb-2">
            <h2 className="font-bold">لوحة الإدارة</h2>
            <p className="text-xs text-muted-foreground">{profile.email}</p>
          </div>
          <nav className="flex flex-col gap-1">
            {items.map((it) => {
              const active = it.exact ? pathname === it.to : pathname.startsWith(it.to);
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                    active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                  )}
                >
                  <it.icon className="h-4 w-4" />
                  {it.label}
                </Link>
              );
            })}
            <Link
              to="/"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted mt-2"
            >
              <ArrowLeft className="h-4 w-4" />
              العودة للمتجر
            </Link>
          </nav>
        </aside>
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
