import { createFileRoute } from "@tanstack/react-router";
import { Layout, SectionTitle } from "@/components/site/Layout";
import { CategoryHero } from "@/components/site/CategoryPage";
import heroShipping from "@/assets/hero-shipping.jpg";
import { Plane, Package, MapPin, Clock, ShieldCheck, FileEdit, Warehouse, Truck, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/shipping")({
  component: Shipping,
  head: () => ({
    meta: [
      { title: "خدمات الشحن الدولي — Hendawi" },
      { name: "description", content: "شحن جوي سريع من الصين وتركيا إلى ليبيا، مصر، تونس، الخليج، الأردن، سوريا وأوروبا." },
    ],
  }),
});

const from = ["الصين", "تركيا"];
const to = ["ليبيا", "مصر", "تونس", "سوريا", "الأردن", "الخليج", "أوروبا"];
const steps = [
  { icon: FileEdit, t: "تعبئة طلب عرض السعر", d: "أرسل تفاصيل شحنتك" },
  { icon: Warehouse, t: "استلام البضاعة", d: "في مكتبنا بإسطنبول" },
  { icon: Plane, t: "شحن جوي سريع", d: "إلى الوجهة المطلوبة" },
  { icon: Truck, t: "التسليم النهائي", d: "من مكتبنا مباشرة" },
];

function Shipping() {
  return (
    <Layout>
      <CategoryHero
        eyebrow="INTERNATIONAL SHIPPING"
        title="شحن بضاعتك بسرعة وأمان من"
        highlight="الصين وتركيا إلى العالم"
        description="شحن جوي احترافي مع تتبع كامل وتسليم سريع خلال 3-7 أيام عمل."
        image={heroShipping}
        ctaPrimary="ابدأ الشحن من هنا"
        ctaSecondary="احسب التكلفة"
      />

      {/* From / To */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-navy-deep text-ivory rounded-2xl p-8">
            <h3 className="text-gold text-center text-lg font-bold mb-6">الدول الرئيسية (من)</h3>
            <div className="grid grid-cols-2 gap-4">
              {from.map((c) => (
                <div key={c} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xl font-bold">{c[0]}</div>
                  <div className="font-bold">{c}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-navy-deep text-ivory rounded-2xl p-8">
            <h3 className="text-gold text-center text-lg font-bold mb-6">الدول المستهدفة (إلى)</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {to.map((c) => (
                <div key={c} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:border-gold/50 transition">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-bold">{c[0]}</div>
                  <div className="text-xs font-semibold">{c}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote form + Info */}
      <section className="container mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white border border-border rounded-2xl p-8 shadow-luxe">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-gold font-bold">احصل على</span>
              <span className="font-display text-2xl text-navy-deep">أفضل سعر شحن خلال دقائق</span>
            </div>
            <form className="grid sm:grid-cols-2 gap-4">
              {[
                { l: "من (الدولة)", p: "اختر الدولة" },
                { l: "إلى (الدولة)", p: "اختر الدولة" },
                { l: "اتجاه الشحن", p: "اختر الاتجاه" },
                { l: "نوع البضاعة", p: "اختر نوع البضاعة" },
                { l: "الوزن التقديري (كغ)", p: "أدخل الوزن" },
                { l: "هل البضاعة ماركة؟", p: "اختر" },
              ].map((f) => (
                <label key={f.l} className="text-sm">
                  <span className="block text-navy-deep font-semibold mb-1.5">{f.l}</span>
                  <input className="w-full bg-beige border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold" placeholder={f.p} />
                </label>
              ))}
              <label className="text-sm sm:col-span-2">
                <span className="block text-navy-deep font-semibold mb-1.5">ملاحظات إضافية</span>
                <textarea rows={3} className="w-full bg-beige border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold" placeholder="اكتب أي معلومات إضافية" />
              </label>
              <button type="button" className="sm:col-span-2 bg-navy-deep text-ivory font-bold py-3.5 rounded-xl hover:bg-gold hover:text-navy-deep transition flex items-center justify-center gap-2">
                اطلب عرض سعر الآن <ArrowLeft className="w-4 h-4" />
              </button>
            </form>
            <div className="flex flex-wrap gap-4 mt-5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-gold" /> بياناتك آمنة 100%</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gold" /> الردّ خلال نفس اليوم</span>
            </div>
          </div>

          <div className="bg-navy-deep text-ivory rounded-2xl p-8">
            <h3 className="text-center text-gold font-bold mb-6">معلومات عن الخدمة</h3>
            <div className="space-y-5">
              {[
                { icon: Plane, t: "شحن جوي سريع", d: "توصيل خلال 3 إلى 7 أيام" },
                { icon: ShieldCheck, t: "أمان كامل", d: "حماية شحنتك من الاستلام حتى التسليم" },
                { icon: MapPin, t: "تتبع الشحنة", d: "متابعة مستمرة لحالة الشحنة" },
                { icon: Warehouse, t: "استلام في إسطنبول", d: "استلام من مكتبنا في إسطنبول" },
                { icon: Package, t: "تسليم في العالم", d: "تسليم مباشر من مكتبنا" },
              ].map((b) => (
                <div key={b.t} className="flex items-start gap-4 pb-4 border-b border-white/10 last:border-0">
                  <div className="w-11 h-11 rounded-full bg-gold/15 flex items-center justify-center text-gold shrink-0">
                    <b.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold mb-0.5">{b.t}</div>
                    <div className="text-ivory/65 text-sm">{b.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-beige py-20">
        <div className="container mx-auto px-6">
          <SectionTitle eyebrow="HOW IT WORKS" title="كيف تتم عملية الشحن؟" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((s, i) => (
              <div key={s.t} className="bg-white border border-border rounded-2xl p-6 text-center relative">
                <div className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-gold text-navy-deep font-bold flex items-center justify-center">{steps.length - i}</div>
                <div className="w-16 h-16 mx-auto rounded-full bg-navy-deep text-gold flex items-center justify-center mb-4">
                  <s.icon className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-navy-deep mb-1">{s.t}</h4>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
