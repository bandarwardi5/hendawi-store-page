import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, SectionTitle } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { OccasionsGrid, BenefitsBar, ProcessSteps, PanelCard } from "@/components/site/sections";
import { GraduationCap, Sparkles, Building2, Briefcase, Heart, Baby, Gift, FileEdit, Package, Edit3, Truck, ArrowLeft, Watch, BookOpen, Cpu } from "lucide-react";
import { useState } from "react";
import giftHero from "@/assets/gift-box-hero.jpg";
import { SEED_PRODUCTS, formatPrice } from "@/lib/products";

export const Route = createFileRoute("/gifts")({
  component: Gifts,
  head: () => ({
    meta: [
      { title: "الهدايا الفاخرة — Hendawi" },
      { name: "description", content: "اختر هديتك من باقات حصرية حسب المناسبة أو صمّم باقتك الخاصة بكل تفصيل." },
    ],
  }),
});

const occasions = [
  { icon: GraduationCap, label: "هدايا تخرج", color: "bg-gold/20 text-gold-deep" },
  { icon: Sparkles, label: "مناسبات خاصة", color: "bg-emerald/15 text-emerald" },
  { icon: Building2, label: "هدايا دينية", color: "bg-navy-deep/10 text-navy-deep" },
  { icon: Briefcase, label: "هدايا رسمية", color: "bg-gold/20 text-gold-deep" },
  { icon: Heart, label: "هدايا للحب", color: "bg-red-100 text-red-600" },
  { icon: Baby, label: "هدايا مواليد", color: "bg-pink-100 text-pink-600" },
];

const steps = [
  { icon: Package, t: "اختر المنتجات", d: "من جميع الأقسام" },
  { icon: Gift, t: "اختر التغليف والبطاقة", d: "تغليف فاخر مخصص" },
  { icon: Edit3, t: "أضف اسماً أو رسالة", d: "لمسة شخصية" },
  { icon: Truck, t: "نُجهزها ونوصلها", d: "إلى من تحب" },
];

const builderTabs = [
  { id: "perf", label: "العطور", icon: Sparkles },
  { id: "wat", label: "الساعات", icon: Watch },
  { id: "elec", label: "الإلكترونيات", icon: Cpu },
  { id: "books", label: "الكتب", icon: BookOpen },
];

function Gifts() {
  const [active, setActive] = useState("perf");
  const giftProducts = SEED_PRODUCTS.filter((p) => p.category === "gifts").map((p) => ({
    productId: p.id,
    image: p.image,
    title: p.title,
    subtitle: p.subtitle,
    price: formatPrice(p.price),
    oldPrice: p.oldPrice ? formatPrice(p.oldPrice) : undefined,
    rating: p.rating,
    reviews: p.reviews,
    badge: p.badge,
  }));

  return (
    <Layout>
      {/* HERO */}
      <section className="relative bg-ivory overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-up order-2 md:order-1">
            <h1 className="font-display text-4xl md:text-6xl text-navy-deep leading-tight mb-3">
              اختر هديتك...<br />
              <span className="text-gradient-gold">واترك الأثر</span>
            </h1>
            <p className="text-muted-foreground mb-6 text-lg">لحظات لا تُنسى تبدأ بهدية مميزة</p>
            <div className="grid grid-cols-4 gap-3 mb-8">
              {[
                { icon: Gift, t: "تغليف فاخر" },
                { icon: FileEdit, t: "بطاقة هدية" },
                { icon: Truck, t: "توصيل من تركيا" },
                { icon: Sparkles, t: "جودة 100%" },
              ].map((b) => (
                <div key={b.t} className="text-center">
                  <div className="w-12 h-12 mx-auto bg-beige rounded-xl flex items-center justify-center text-gold-deep mb-2">
                    <b.icon className="w-6 h-6" />
                  </div>
                  <div className="text-[11px] text-navy-deep font-semibold">{b.t}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 bg-gold text-navy-deep font-bold px-6 py-3 rounded-full hover:shadow-gold transition">
                <Gift className="w-4 h-4" /> صمّم هديتك الآن
              </button>
              <button className="inline-flex items-center gap-2 border-2 border-navy-deep text-navy-deep font-bold px-6 py-3 rounded-full hover:bg-navy-deep hover:text-ivory transition">
                تسوّق الباقات <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="relative order-1 md:order-2">
            <img src={giftHero} alt="باكج هدية فاخر" className="w-full rounded-2xl shadow-luxe" />
          </div>
        </div>
      </section>

      {/* OCCASIONS */}
      <OccasionsGrid occasions={occasions} />

      {/* BUILD YOUR OWN */}
      <section className="container mx-auto px-4 py-12">
        <PanelCard className="bg-beige">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-3xl text-navy-deep mb-3">صمّم هديتك الخاصة ♥</h3>
              <p className="text-muted-foreground mb-5 leading-relaxed">
                اختر من جميع الأقسام، أضف لمستك الخاصة لنصنع هدية فريدة من أجلك.
              </p>
              <button className="bg-navy-deep text-ivory px-6 py-3 rounded-full font-bold hover:bg-gold hover:text-navy-deep transition inline-flex items-center gap-2">
                ابدأ التصميم <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="flex flex-wrap gap-2 mt-5">
                {builderTabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActive(t.id)}
                    className={`text-sm px-4 py-2 rounded-full transition ${active === t.id ? "bg-navy-deep text-ivory" : "bg-white text-navy-deep border border-border"}`}
                  >
                    <t.icon className="w-4 h-4 inline ml-1" />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <ol className="space-y-3" dir="rtl">
              {steps.map((s, i) => (
                <li key={s.t} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-border">
                  <span className="w-9 h-9 rounded-full bg-gold text-navy-deep font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <div>
                    <div className="font-bold text-navy-deep text-sm">{s.t}</div>
                    <div className="text-xs text-muted-foreground">{s.d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </PanelCard>
      </section>

      {/* PACKAGES GRID */}
      <section className="container mx-auto px-4 py-12">
        <SectionTitle eyebrow="EXCLUSIVE PACKAGES" title="باكجات هدايا مميزة" subtitle="باقات منتقاة بعناية، جاهزة للإهداء بتغليف فاخر." />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {giftProducts.map((p) => (
            <ProductCard key={p.productId} {...p} />
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <BenefitsBar />

      {/* SHIPPING CTA */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-l from-gold/15 to-beige border border-gold/30 rounded-2xl p-6 md:p-10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="font-display text-2xl md:text-3xl text-navy-deep mb-3">نوصل هديتك من تركيا إلى من تحب</h3>
            <p className="text-muted-foreground mb-4">خدمات شحن موثوقة وسريعة مع تغليف فاخر وخدمة مميزة.</p>
            <Link to="/shipping" className="inline-flex items-center gap-2 bg-navy-deep text-ivory px-5 py-2.5 rounded-full font-bold hover:bg-gold hover:text-navy-deep transition">
              احسب الشحن الآن <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          <ul className="space-y-2 text-sm">
            {["تتبع الشحنة أونلاين", "تغليف فاخر للهدايا", "توصيل إلى باب المنزل"].map((t) => (
              <li key={t} className="flex items-center gap-2 text-navy-deep">
                <span className="w-2 h-2 rounded-full bg-gold" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}