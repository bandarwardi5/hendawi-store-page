import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { CheckCircle } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const subtotal = getCartTotal();
  const shipping = items.length > 0 ? 50 : 0;
  const total = subtotal + shipping;

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: "",
    paymentMethod: "cod", // Cash on Delivery
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);
    try {
      // Create the order document without needing specific security rules
      // (as long as write is allowed in firestore rules)
      const orderData = {
        userId: user?.uid || "guest",
        customerDetails: formData,
        items: items,
        subtotal,
        shipping,
        total,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "orders"), orderData);
      
      clearCart();
      setSuccess(true);
    } catch (error) {
      console.error("Error placing order: ", error);
      alert("حدث خطأ أثناء إتمام الطلب. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 min-h-[70vh] flex flex-col items-center justify-center text-center">
          <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
          <h1 className="text-4xl font-display text-navy-deep mb-4">تم تأكيد طلبك بنجاح!</h1>
          <p className="text-lg text-navy-deep/70 mb-8 max-w-lg">
            شكراً لتسوقك معنا. رقم طلبك قيد المعالجة وسنتواصل معك قريباً لتأكيد موعد التسليم.
          </p>
          <button
            onClick={() => navigate({ to: "/" })}
            className="px-8 py-3 bg-navy-deep text-ivory rounded-full hover:bg-gold hover:text-navy-deep transition font-semibold"
          >
            العودة للرئيسية
          </button>
        </div>
      </Layout>
    );
  }

  // Redirect if cart is empty
  if (items.length === 0 && !success) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-navy-deep mb-4">السلة فارغة</h1>
          <button onClick={() => navigate({ to: "/" })} className="text-gold hover:underline">
            العودة للتسوق
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 lg:py-20 min-h-screen">
        <h1 className="text-3xl font-display text-navy-deep mb-8">إتمام الطلب</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-border">
            <h2 className="text-xl font-bold text-navy-deep mb-6 border-b border-border pb-4">بيانات التوصيل</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-navy-deep mb-2">الاسم الكامل</label>
                  <input
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-gold focus:ring-1 focus:ring-gold outline-none transition"
                    placeholder="الاسم الثلاثي"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy-deep mb-2">رقم الجوال</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-gold focus:ring-1 focus:ring-gold outline-none transition text-right"
                    placeholder="05XXXXXXXX"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-navy-deep mb-2">المدينة</label>
                <select
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:border-gold focus:ring-1 focus:ring-gold outline-none transition"
                >
                  <option value="">اختر مدينتك</option>
                  <option value="Riyadh">الرياض</option>
                  <option value="Jeddah">جدة</option>
                  <option value="Dammam">الدمام</option>
                  <option value="Mecca">مكة المكرمة</option>
                  <option value="Medina">المدينة المنورة</option>
                  <option value="Other">مدينة أخرى</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-navy-deep mb-2">العنوان التفصيلي</label>
                <textarea
                  required
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:border-gold focus:ring-1 focus:ring-gold outline-none transition resize-none"
                  placeholder="اسم الحي، الشارع، رقم المبنى..."
                ></textarea>
              </div>

              <h2 className="text-xl font-bold text-navy-deep mb-6 border-b border-border pb-4 mt-8">طريقة الدفع</h2>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border border-gold bg-gold/5 rounded-xl cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-5 h-5 text-gold focus:ring-gold accent-gold"
                  />
                  <span className="font-bold text-navy-deep">الدفع عند الاستلام (Cash on Delivery)</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-border rounded-xl opacity-50 cursor-not-allowed">
                  <input
                    disabled
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    className="w-5 h-5"
                  />
                  <span className="font-bold text-navy-deep">البطاقة الائتمانية / مدى (قريباً)</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 py-4 bg-gold text-navy-deep rounded-full hover:bg-gold/90 transition font-bold text-lg shadow-luxe disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "جاري تأكيد الطلب..." : "تأكيد الطلب"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-navy-deep p-6 rounded-2xl shadow-sm border border-navy-deep h-fit sticky top-24 text-ivory">
            <h2 className="text-xl font-bold mb-6 text-gold">ملخص طلبك</h2>
            
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 text-sm border-b border-white/10 pb-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="font-bold line-clamp-2 mb-1">{item.name}</p>
                    <p className="text-ivory/60">الكمية: {item.quantity}</p>
                    <p className="text-gold font-bold">{item.price * item.quantity} ر.س</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex justify-between text-ivory/80">
                <span>المجموع الفرعي</span>
                <span>{subtotal} ر.س</span>
              </div>
              <div className="flex justify-between text-ivory/80">
                <span>تكلفة الشحن</span>
                <span>{shipping} ر.س</span>
              </div>
              <div className="pt-4 mt-2 border-t border-white/10 flex justify-between text-xl font-bold">
                <span>الإجمالي</span>
                <span className="text-gold">{total} ر.س</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
