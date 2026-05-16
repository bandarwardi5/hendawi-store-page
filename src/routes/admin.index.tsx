import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Package, ShoppingBag, DollarSign, Users, Database } from "lucide-react";
import { fetchAllProducts, fetchAllOrders, seedProducts, formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  const load = async () => {
    setLoading(true);
    const [products, orders] = await Promise.all([fetchAllProducts(), fetchAllOrders()]);
    setStats({
      products: products.length,
      orders: orders.length,
      revenue: orders.reduce((sum, o) => sum + (o.total || 0), 0),
      pending: orders.filter((o) => o.status === "pending").length,
    });
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSeed = async () => {
    if (!confirm("هل تريد تعبئة قاعدة البيانات بمنتجات تجريبية؟")) return;
    setSeeding(true);
    try {
      const count = await seedProducts();
      toast.success(`تم إضافة ${count} منتج`);
      await load();
    } catch (e) {
      toast.error("فشل التعبئة. تحقق من قواعد Firestore.");
    } finally {
      setSeeding(false);
    }
  };

  const cards = [
    { label: "المنتجات", value: stats.products, icon: Package, color: "text-blue-600" },
    { label: "الطلبات", value: stats.orders, icon: ShoppingBag, color: "text-emerald-600" },
    { label: "الإيرادات", value: formatPrice(stats.revenue), icon: DollarSign, color: "text-amber-600" },
    { label: "قيد الانتظار", value: stats.pending, icon: Users, color: "text-red-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">نظرة عامة</h1>
          <p className="text-sm text-muted-foreground">إحصائيات سريعة عن متجرك</p>
        </div>
        <Button onClick={handleSeed} disabled={seeding} variant="outline" className="gap-2">
          <Database className="h-4 w-4" />
          {seeding ? "جارٍ التعبئة..." : "تعبئة منتجات تجريبية"}
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border bg-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{c.label}</span>
              <c.icon className={`h-5 w-5 ${c.color}`} />
            </div>
            <div className="text-2xl font-bold">{loading ? "..." : c.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/admin/products" className="rounded-2xl border bg-card p-6 hover:bg-muted/50 transition">
          <Package className="h-8 w-8 mb-3 text-primary" />
          <h3 className="font-bold mb-1">إدارة المنتجات</h3>
          <p className="text-sm text-muted-foreground">إضافة وتعديل وحذف المنتجات</p>
        </Link>
        <Link to="/admin/orders" className="rounded-2xl border bg-card p-6 hover:bg-muted/50 transition">
          <ShoppingBag className="h-8 w-8 mb-3 text-primary" />
          <h3 className="font-bold mb-1">إدارة الطلبات</h3>
          <p className="text-sm text-muted-foreground">متابعة وتحديث حالات الطلبات</p>
        </Link>
      </div>
    </div>
  );
}
