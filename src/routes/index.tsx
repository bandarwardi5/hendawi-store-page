import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, SectionTitle } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { ShieldCheck, Truck, Headphones, BadgeCheck, Sparkles, Gift, ArrowLeft, Plane, Watch, BookOpen, ShoppingBag, Cpu } from "lucide-react";
import heroPerfume from "@/assets/hero-perfume.jpg";
import heroGifts from "@/assets/hero-gifts.jpg";
import heroWatches from "@/assets/hero-watches.jpg";
import heroFashion from "@/assets/hero-fashion.jpg";
import heroElectronics from "@/assets/hero-electronics.jpg";
import heroBooks from "@/assets/hero-books.jpg";
import heroShipping from "@/assets/hero-shipping.jpg";
import pPerfume from "@/assets/product-perfume-1.jpg";
import pWatch from "@/assets/product-watch-1.jpg";
import pGift from "@/assets/product-gift-1.jpg";
import pBag from "@/assets/product-bag-1.jpg";
import pElec from "@/assets/product-electronics-1.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Hendawi Group — الفخامة بين يديك" },
      { name: "description", content: "متجر فاخر متعدد الأقسام: عطور خليجية أصلية، ساعات، هدايا، إلكترونيات، كتب محاسبية وشحن دولي." },
    ],
  }),
});

const categories = [
  { to: "/perfumes" as const, label: "العطور الخليجية", desc: "عود، بخور، عطور فاخرة", image: heroPerfume, icon: Sparkles },
  { to: "/watches" as const, label: "الساعات والهدايا", desc: "ساعات راقية وباقات مميزة", image: heroWatches, icon: Watch },
  { to: "/fashion" as const, label: "الأزياء", desc: "حقائب جلدية ونظارات", image: heroFashion, icon: ShoppingBag },
  { to: "/electronics" as const, label: "الإلكترونيات", desc: "شواحن، باور بانك، ألعاب", image: heroElectronics, icon: Cpu },
  { to: "/books" as const, label: "الكتب المحاسبية", desc: "مراجع مالية ومحاسبية", image: heroBooks, icon: BookOpen },
  { to: "/shipping" as const, label: "الشحن الدولي", desc: "من تركيا والصين إلى العالم", image: heroShipping, icon: Plane },
];

const trust = [
  { icon: BadgeCheck, title: "منتجات أصلية 100%", desc: "ضمان أصالة على جميع المنتجات" },
  { icon: Truck, title: "شحن سريع للعالم", desc: "توصيل لكافة دول العالم" },
  { icon: ShieldCheck, title: "دفع آمن وموثوق", desc: "وسائل دفع متعددة وآمنة" },
  { icon: Headphones, title: "دعم عملاء مميز", desc: "خدمة احترافية على مدار الساعة" },
];

function Home() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative bg-navy-deep text-ivory overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroPerfume} alt="" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-l from-navy-deep via-navy-deep/85 to-transparent" />
        </div>
        <div className="relative container mx-auto px-6 py-20 md:py-32 grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-12 h-px bg-gold" />
              <span className="text-xs tracking-[0.4em] text-gold font-semibold">HENDAWI GROUP</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
              الفخامة تعكس <span className="text-gradient-gold">شخصيتك</span>
              <br />امتلكها اليوم
            </h1>
            <p className="text-ivory/75 text-lg max-w-lg mb-8 leading-relaxed">
              مجموعة هنداوي — وجهتك الأولى للعطور الخليجية الأصلية، الساعات الفاخرة، الهدايا المميزة وخدمات الشحن الدولي من إسطنبول إلى عالمك.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/perfumes" className="inline-flex items-center gap-2 bg-gold text-navy-deep font-bold px-7 py-3.5 rounded-full hover:shadow-gold transition">
                تسوّق العطور <ArrowLeft className="w-4 h-4" />
              </Link>
              <Link to="/shipping" className="inline-flex items-center gap-2 border border-gold/50 text-ivory font-semibold px-7 py-3.5 rounded-full hover:bg-gold hover:text-navy-deep transition">
                خدمات الشحن
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-12 max-w-md">
              {[
                { n: "+15", l: "دولة شحن" },
                { n: "+1000", l: "منتج فاخر" },
                { n: "+50k", l: "عميل سعيد" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="font-display text-3xl text-gold">{s.n}</div>
                  <div className="text-xs text-ivory/60 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white border-y border-border">
        <div className="container mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {trust.map((t) => (
            <div key={t.title} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-beige flex items-center justify-center text-gold-deep shrink-0">
                <t.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-navy-deep text-sm">{t.title}</div>
                <div className="text-xs text-muted-foreground">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-6 py-20">
        <SectionTitle eyebrow="أقسامنا" title="تسوّق حسب القسم" subtitle="ستة أقسام رئيسية تجمع بين الفخامة والجودة العالمية في تجربة تسوق واحدة." />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((c, i) => (
            <Link to={c.to} key={c.to} className="group relative aspect-[4/3] rounded-2xl overflow-hidden hover-lift" style={{ animationDelay: `${i * 60}ms` }}>
              <img src={c.image} alt={c.label} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-center gap-2 mb-2 text-gold">
                  <c.icon className="w-5 h-5" />
                  <span className="text-[10px] tracking-[0.3em] uppercase">قسم</span>
                </div>
                <h3 className="font-display text-2xl text-ivory mb-1">{c.label}</h3>
                <p className="text-ivory/70 text-sm">{c.desc}</p>
                <div className="mt-3 inline-flex items-center gap-2 text-gold text-sm font-semibold opacity-0 group-hover:opacity-100 transition">
                  تصفّح القسم <ArrowLeft className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="bg-beige py-20">
        <div className="container mx-auto px-6">
          <SectionTitle eyebrow="الأكثر مبيعاً" title="باقات هدايا مميزة" subtitle="منتجات منتقاة بعناية لمحبي الفخامة." />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            <ProductCard productId="perf-001" image={pPerfume} title="عود سوبريم 2077" subtitle="عطر • 100 مل" price="499 ر.س" oldPrice="599 ر.س" rating={5} reviews={128} badge={{ label: "الأكثر طلباً", tone: "gold" }} />
            <ProductCard productId="wat-001" image={pWatch} title="ساعة كلاسيك ذهبية" subtitle="ساعة رجالية" price="1,899 ر.س" rating={4.5} reviews={96} badge={{ label: "جديد", tone: "emerald" }} />
            <ProductCard productId="gift-001" image={pGift} title="باكج الإيمان" subtitle="مصحف • مسبحة • عطر" price="299 ر.س" rating={5} reviews={75} badge={{ label: "الأفضل مبيعاً", tone: "gold" }} />
            <ProductCard productId="fas-001" image={pBag} title="حقيبة جلد فاخرة" subtitle="جلد طبيعي 100%" price="649 ر.س" rating={4} reviews={53} />
            <ProductCard productId="elec-001" image={pElec} title="شاحن لاسلكي + باور بانك" subtitle="20000 mAh" price="349 ر.س" oldPrice="429 ر.س" rating={4.5} reviews={41} badge={{ label: "خصم 20%", tone: "red" }} />
          </div>
        </div>
      </section>

      {/* GIFT BUILDER CTA */}
      <section className="container mx-auto px-6 py-20">
        <div className="relative rounded-3xl overflow-hidden bg-navy-deep text-ivory shadow-luxe">
          <div className="absolute inset-0">
            <img src={heroGifts} alt="" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-l from-navy-deep/95 via-navy-deep/60 to-transparent" />
          </div>
          <div className="relative grid md:grid-cols-2">
            <div className="p-10 md:p-16">
              <div className="flex items-center gap-3 mb-4 text-gold">
                <Gift className="w-5 h-5" />
                <span className="text-xs tracking-[0.4em]">صمّم هديتك</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl mb-4">اختر هديتك واترك الأثر</h2>
              <p className="text-ivory/75 mb-7 max-w-md">
                اختر من جميع الأقسام، أضف لمستك الخاصة، وسنصنع هدية فريدة بتغليف فاخر وبطاقة شخصية.
              </p>
              <Link to="/watches" className="inline-flex items-center gap-2 bg-gold text-navy-deep font-bold px-6 py-3 rounded-full hover:shadow-gold transition">
                ابدأ التصميم <ArrowLeft className="w-4 h-4" />
              </Link>

              <div className="flex flex-wrap gap-2 mt-8">
                {["العطور", "الساعات", "الهدايا", "الكتب", "الإلكترونيات"].map((t) => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-full border border-gold/30 text-ivory/80">{t}</span>
                ))}
              </div>
            </div>
            <div className="hidden md:block" />
          </div>
        </div>
      </section>

      {/* SHIPPING HIGHLIGHT */}
      <section className="bg-navy text-ivory py-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4 text-gold">
              <Plane className="w-5 h-5" />
              <span className="text-xs tracking-[0.4em]">SHIPPING</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl mb-5">
              شحن بضاعتك بسرعة وأمان<br />
              من <span className="text-gold">الصين</span> وتركيا إلى العالم
            </h2>
            <p className="text-ivory/70 mb-8 max-w-lg">
              شحن جوي احترافي إلى ليبيا، مصر، تونس، سوريا، الأردن، الخليج وأوروبا — مع إمكانية الشحن بالعكس إلى تركيا.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8 max-w-md">
              {[
                { t: "شحن جوي سريع", d: "خلال 3 إلى 7 أيام" },
                { t: "أمان كامل", d: "حماية شحنتك حتى التسليم" },
                { t: "تتبع الشحنة", d: "متابعة مستمرة" },
                { t: "استلام في إسطنبول", d: "من مكتبنا الرئيسي" },
              ].map((b) => (
                <div key={b.t} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-gold text-sm font-bold mb-1">{b.t}</div>
                  <div className="text-ivory/60 text-xs">{b.d}</div>
                </div>
              ))}
            </div>
            <Link to="/shipping" className="inline-flex items-center gap-2 bg-gold text-navy-deep font-bold px-6 py-3 rounded-full hover:shadow-gold transition">
              اطلب عرض سعر الآن <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative rounded-2xl overflow-hidden ring-gold">
            <img src={heroShipping} alt="الشحن الدولي" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container mx-auto px-6 py-20">
        <SectionTitle eyebrow="آراء العملاء" title="عملاؤنا يتحدّثون" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: "محمد العتيبي", c: "السعودية", t: "تجربة شراء راقية، العطر أصلي ووصلني بسرعة مع تغليف فاخر جداً." },
            { n: "ليلى الحسن", c: "الإمارات", t: "صمّمت هديتي بنفسي وكانت مفاجأة لا تُنسى. خدمة احترافية وذوق راقٍ." },
            { n: "أحمد بن صالح", c: "ليبيا", t: "أعتمد عليهم في شحن بضائعي من تركيا. سرعة في التسليم وأمان تام." },
          ].map((r) => (
            <div key={r.n} className="bg-white border border-border rounded-2xl p-6 hover-lift">
              <div className="flex gap-1 mb-4 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (<span key={i}>★</span>))}
              </div>
              <p className="text-navy-deep/85 leading-relaxed mb-5 font-serif text-lg">"{r.t}"</p>
              <div className="gold-divider mb-4" />
              <div>
                <div className="font-bold text-navy-deep">{r.n}</div>
                <div className="text-xs text-muted-foreground">{r.c}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container mx-auto px-6 pb-20">
        <div className="rounded-3xl bg-navy-deep text-ivory p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 gradient-gold" />
          <div className="relative">
            <Sparkles className="w-8 h-8 text-gold mx-auto mb-4" />
            <h3 className="font-display text-3xl md:text-4xl mb-3">انضم إلى عالم هنداوي</h3>
            <p className="text-ivory/70 mb-6 max-w-lg mx-auto">اشترك لتصلك أحدث الإصدارات والعروض الحصرية قبل الجميع.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="بريدك الإلكتروني" className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-ivory placeholder:text-ivory/50 focus:outline-none focus:border-gold" />
              <button className="bg-gold text-navy-deep font-bold px-6 py-3 rounded-full hover:shadow-gold transition">اشترك الآن</button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
