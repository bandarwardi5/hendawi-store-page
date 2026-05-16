import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import {
  fetchAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  formatPrice,
  type Product,
  type Category,
} from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "perfumes", label: "عطور" },
  { value: "watches", label: "ساعات" },
  { value: "fashion", label: "أزياء" },
  { value: "electronics", label: "إلكترونيات" },
  { value: "books", label: "كتب" },
  { value: "gifts", label: "هدايا" },
];

interface FormState {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: Category;
  price: string;
  oldPrice: string;
  image: string;
  brand: string;
  stock: string;
}

const emptyForm: FormState = {
  id: "",
  title: "",
  subtitle: "",
  description: "",
  category: "perfumes",
  price: "",
  oldPrice: "",
  image: "",
  brand: "",
  stock: "",
};

function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setProducts(await fetchAllProducts());
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, id: `prod-${Date.now()}` });
    setOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      id: p.id,
      title: p.title,
      subtitle: p.subtitle ?? "",
      description: p.description ?? "",
      category: p.category,
      price: String(p.price),
      oldPrice: p.oldPrice ? String(p.oldPrice) : "",
      image: p.image,
      brand: p.brand ?? "",
      stock: p.stock != null ? String(p.stock) : "",
    });
    setOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.price) {
      toast.error("الاسم والسعر مطلوبان");
      return;
    }
    setSaving(true);
    try {
      const payload: Product = {
        id: form.id,
        title: form.title.trim(),
        subtitle: form.subtitle.trim() || undefined,
        description: form.description.trim() || undefined,
        category: form.category,
        price: Number(form.price),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
        image: form.image.trim() || "/placeholder.svg",
        brand: form.brand.trim() || undefined,
        stock: form.stock ? Number(form.stock) : undefined,
      };
      if (editing) {
        const { id, ...rest } = payload;
        await updateProduct(id, rest);
        toast.success("تم تحديث المنتج");
      } else {
        await createProduct(payload);
        toast.success("تم إضافة المنتج");
      }
      setOpen(false);
      await load();
    } catch (e) {
      console.error(e);
      toast.error("فشل الحفظ. تحقق من قواعد Firestore.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (p: Product) => {
    if (!confirm(`حذف "${p.title}"؟`)) return;
    try {
      await deleteProduct(p.id);
      toast.success("تم الحذف");
      await load();
    } catch {
      toast.error("فشل الحذف");
    }
  };

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">المنتجات</h1>
          <p className="text-sm text-muted-foreground">{products.length} منتج</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          إضافة منتج
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث بالاسم أو المعرف..."
          className="pr-9"
        />
      </div>

      <div className="rounded-2xl border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-right">
              <tr>
                <th className="p-3 font-medium">الصورة</th>
                <th className="p-3 font-medium">الاسم</th>
                <th className="p-3 font-medium">الفئة</th>
                <th className="p-3 font-medium">السعر</th>
                <th className="p-3 font-medium">المخزون</th>
                <th className="p-3 font-medium text-left">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">جارٍ التحميل...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">لا توجد منتجات</td></tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-3"><img src={p.image} alt={p.title} className="h-12 w-12 rounded object-cover" /></td>
                    <td className="p-3">
                      <div className="font-medium">{p.title}</div>
                      <div className="text-xs text-muted-foreground">{p.id}</div>
                    </td>
                    <td className="p-3">{CATEGORIES.find(c => c.value === p.category)?.label ?? p.category}</td>
                    <td className="p-3">{formatPrice(p.price)}</td>
                    <td className="p-3">{p.stock ?? "-"}</td>
                    <td className="p-3 text-left">
                      <div className="flex justify-end gap-1">
                        <Button size="icon" variant="ghost" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(p)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle>{editing ? "تعديل منتج" : "إضافة منتج"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
            <div className="md:col-span-2">
              <Label>الاسم *</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <Label>عنوان فرعي</Label>
              <Input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
            </div>
            <div>
              <Label>الفئة *</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as Category })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>الماركة</Label>
              <Input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
            </div>
            <div>
              <Label>السعر *</Label>
              <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div>
              <Label>السعر القديم</Label>
              <Input type="number" value={form.oldPrice} onChange={(e) => setForm({ ...form, oldPrice: e.target.value })} />
            </div>
            <div>
              <Label>المخزون</Label>
              <Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            </div>
            <div>
              <Label>المعرف</Label>
              <Input value={form.id} disabled={!!editing} onChange={(e) => setForm({ ...form, id: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <Label>رابط الصورة</Label>
              <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
            </div>
            <div className="md:col-span-2">
              <Label>الوصف</Label>
              <Textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>إلغاء</Button>
            <Button onClick={handleSave} disabled={saving}>{saving ? "جارٍ الحفظ..." : "حفظ"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
