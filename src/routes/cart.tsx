import { Link, createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useCart } from "@/hooks/use-cart";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const { items, updateQuantity, removeItem, getCartTotal } = useCart();
  const subtotal = getCartTotal();
  const shipping = items.length > 0 ? 50 : 0; // Fixed shipping for now
  const total = subtotal + shipping;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 lg:py-20 min-h-screen">
        <h1 className="text-3xl font-display text-navy-deep mb-8">سلة المشتريات</h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl shadow-sm border border-border">
            <ShoppingBag className="w-16 h-16 text-gold/50 mb-4" />
            <h2 className="text-xl font-bold text-navy-deep mb-2">سلتك فارغة</h2>
            <p className="text-navy-deep/60 mb-6">لم تقم بإضافة أي منتجات إلى سلتك بعد.</p>
            <Link
              to="/"
              className="px-8 py-3 bg-navy-deep text-ivory rounded-full hover:bg-gold hover:text-navy-deep transition font-semibold"
            >
              مواصلة التسوق
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-border items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-navy-deep mb-1">{item.name}</h3>
                    <p className="text-gold font-bold">{item.price} ر.س</p>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-beige px-3 py-1.5 rounded-full">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:text-gold transition text-navy-deep/70"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-6 text-center font-bold text-navy-deep">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:text-gold transition text-navy-deep/70"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-full transition ml-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-border h-fit sticky top-24">
              <h2 className="text-xl font-bold text-navy-deep mb-6">ملخص الطلب</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-navy-deep/80">
                  <span>المجموع الفرعي</span>
                  <span className="font-bold">{subtotal} ر.س</span>
                </div>
                <div className="flex justify-between text-navy-deep/80">
                  <span>تكلفة الشحن</span>
                  <span className="font-bold">{shipping} ر.س</span>
                </div>
                <div className="pt-4 border-t border-border flex justify-between text-lg font-bold text-navy-deep">
                  <span>المجموع النهائي</span>
                  <span className="text-gold">{total} ر.س</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full py-4 bg-navy-deep text-ivory rounded-full hover:bg-gold hover:text-navy-deep transition font-semibold flex items-center justify-center shadow-luxe"
              >
                متابعة للدفع
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
