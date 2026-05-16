import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchAllOrders, updateOrderStatus, formatPrice, type Order } from "@/lib/products";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

const STATUS_LABELS: Record<Order["status"], { label: string; tone: string }> = {
  pending: { label: "قيد الانتظار", tone: "bg-amber-100 text-amber-800" },
  processing: { label: "قيد المعالجة", tone: "bg-blue-100 text-blue-800" },
  shipped: { label: "تم الشحن", tone: "bg-purple-100 text-purple-800" },
  delivered: { label: "تم التوصيل", tone: "bg-emerald-100 text-emerald-800" },
  cancelled: { label: "ملغي", tone: "bg-red-100 text-red-800" },
};

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const list = await fetchAllOrders();
    list.sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
    setOrders(list);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (id: string, status: Order["status"]) => {
    try {
      await updateOrderStatus(id, status);
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
      toast.success("تم تحديث حالة الطلب");
    } catch {
      toast.error("فشل التحديث");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">الطلبات</h1>
        <p className="text-sm text-muted-foreground">{orders.length} طلب</p>
      </div>

      {loading ? (
        <div className="rounded-2xl border bg-card p-8 text-center text-muted-foreground">جارٍ التحميل...</div>
      ) : orders.length === 0 ? (
        <div className="rounded-2xl border bg-card p-8 text-center text-muted-foreground">
          لا توجد طلبات بعد. ستظهر هنا عند إتمام العملاء لعمليات الشراء.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="rounded-2xl border bg-card p-4">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <div>
                  <div className="font-bold">#{o.id.slice(-8)}</div>
                  <div className="text-xs text-muted-foreground">{o.userEmail ?? o.userId}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={STATUS_LABELS[o.status]?.tone}>{STATUS_LABELS[o.status]?.label ?? o.status}</Badge>
                  <Select value={o.status} onValueChange={(v) => handleStatusChange(o.id, v as Order["status"])}>
                    <SelectTrigger className="w-40 h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(STATUS_LABELS).map(([key, v]) => (
                        <SelectItem key={key} value={key}>{v.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border-t pt-3 space-y-2">
                {o.items?.map((it, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    {it.image && <img src={it.image} alt={it.title} className="h-10 w-10 rounded object-cover" />}
                    <div className="flex-1 min-w-0 truncate">{it.title} × {it.quantity}</div>
                    <div className="text-muted-foreground">{formatPrice(it.price * it.quantity)}</div>
                  </div>
                ))}
              </div>

              <div className="border-t mt-3 pt-3 flex justify-between text-sm">
                <span className="text-muted-foreground">الإجمالي</span>
                <span className="font-bold">{formatPrice(o.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
