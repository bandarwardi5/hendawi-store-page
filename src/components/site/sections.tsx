import { ReactNode } from "react";
import { ArrowLeft, Crown, ShieldCheck, Truck, Gift as GiftIcon, Headphones, BadgeCheck, Package } from "lucide-react";
import { Link } from "@tanstack/react-router";

// ───────────────────────────────────────────── Brand strip
export interface BrandItem {
  name: string;
  subtitle?: string;
  active?: boolean;
}

export function BrandStrip({
  title = "أشهر دور العطور",
  brands,
  tone = "ivory",
}: {
  title?: string;
  brands: BrandItem[];
  tone?: "ivory" | "navy";
}) {
  const isNavy = tone === "navy";
  return (
    <section className={`py-10 ${isNavy ? "bg-navy-deep text-ivory" : "bg-beige"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Crown className={`w-5 h-5 ${isNavy ? "text-gold" : "text-gold-deep"}`} />
          <h3 className={`font-display text-xl md:text-2xl ${isNavy ? "text-ivory" : "text-navy-deep"}`}>{title}</h3>
          <Crown className={`w-5 h-5 ${isNavy ? "text-gold" : "text-gold-deep"}`} />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin snap-x">
          {brands.map((b) => (
            <div
              key={b.name}
              className={`shrink-0 snap-start min-w-[120px] md:min-w-[140px] rounded-xl border px-4 py-5 text-center transition cursor-pointer ${
                b.active
                  ? "bg-gold text-navy-deep border-gold shadow-gold"
                  : isNavy
                  ? "bg-white/5 border-white/15 hover:border-gold/60"
                  : "bg-white border-border hover:border-gold"
              }`}
            >
              <div className={`font-display text-lg leading-tight ${b.active ? "text-navy-deep" : isNavy ? "text-ivory" : "text-navy-deep"}`}>
                {b.name}
              </div>
              {b.subtitle && (
                <div className={`text-[10px] mt-1 tracking-wider ${b.active ? "text-navy-deep/70" : isNavy ? "text-ivory/60" : "text-muted-foreground"}`}>
                  {b.subtitle}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────── Gender cards
export function GenderCards({
  items,
}: {
  items: { label: string; sub: string; image: string; to?: string }[];
}) {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.map((it) => (
          <div key={it.label} className="relative rounded-2xl bg-white border border-border overflow-hidden hover-lift group">
            <div className="grid grid-cols-2 items-center gap-4 p-5">
              <div className="aspect-square bg-beige rounded-xl overflow-hidden">
                <img src={it.image} alt={it.label} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="text-center">
                <h3 className="font-display text-2xl text-navy-deep mb-1">{it.label}</h3>
                <p className="text-xs text-muted-foreground tracking-widest mb-4">{it.sub}</p>
                <button className="bg-navy-deep text-ivory px-5 py-2 rounded-full text-sm font-semibold hover:bg-gold hover:text-navy-deep transition">
                  تسوّق الآن
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ───────────────────────────────────────────── Benefits bar
export interface Benefit { icon: any; title: string; desc: string }
export const defaultBenefits: Benefit[] = [
  { icon: BadgeCheck, title: "منتجات أصلية 100%", desc: "مع ضمان الجودة" },
  { icon: GiftIcon, title: "تغليف فاخر", desc: "جاهز للإهداء" },
  { icon: Truck, title: "شحن سريع وآمن", desc: "إلى جميع دول العالم" },
  { icon: Headphones, title: "دعم عملاء مميز", desc: "عبر واتساب" },
  { icon: ShieldCheck, title: "دفع آمن وموثوق", desc: "وسائل دفع متعددة" },
];

export function BenefitsBar({ items = defaultBenefits, tone = "ivory" }: { items?: Benefit[]; tone?: "ivory" | "navy" }) {
  const isNavy = tone === "navy";
  return (
    <section className={`${isNavy ? "bg-navy-deep text-ivory" : "bg-white border-y border-border"}`}>
      <div className="container mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {items.map((b) => (
          <div key={b.title} className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${isNavy ? "bg-white/10 text-gold" : "bg-beige text-gold-deep"}`}>
              <b.icon className="w-5 h-5" />
            </div>
            <div>
              <div className={`font-bold text-sm ${isNavy ? "text-ivory" : "text-navy-deep"}`}>{b.title}</div>
              <div className={`text-xs ${isNavy ? "text-ivory/60" : "text-muted-foreground"}`}>{b.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ───────────────────────────────────────────── Process steps
export function ProcessSteps({ steps, title = "كيف تتم العملية؟" }: { steps: { icon: any; t: string; d: string }[]; title?: string }) {
  return (
    <section className="container mx-auto px-4 py-14">
      <div className="text-center mb-10">
        <h3 className="font-display text-3xl text-navy-deep">{title}</h3>
        <div className="gold-divider mt-3 max-w-xs mx-auto" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {steps.map((s, i) => (
          <div key={s.t} className="relative bg-white border border-border rounded-2xl p-5 text-center hover-lift">
            <span className="absolute -top-3 right-5 bg-gold text-navy-deep w-8 h-8 rounded-full font-bold flex items-center justify-center text-sm">
              {steps.length - i}
            </span>
            <div className="w-14 h-14 rounded-full bg-navy-deep text-gold mx-auto flex items-center justify-center mb-4">
              <s.icon className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-navy-deep mb-1">{s.t}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ───────────────────────────────────────────── Section card wrapper
export function PanelCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-border rounded-2xl p-5 md:p-7 ${className}`}>
      {children}
    </div>
  );
}

// ───────────────────────────────────────────── Cross-category gift block
export function CrossSellGifts({
  items,
}: {
  items: { title: string; sub: string; image: string; to: string; cta?: string }[];
}) {
  return (
    <section className="container mx-auto px-4 py-14">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 text-gold-deep mb-2">
          <GiftIcon className="w-5 h-5" />
          <span className="text-xs tracking-[0.4em]">CROSS-CATEGORY</span>
        </div>
        <h3 className="font-display text-2xl md:text-3xl text-navy-deep">أضف هدية من أقسامنا الأخرى</h3>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((it) => (
          <Link to={it.to as any} key={it.title} className="bg-white border border-border rounded-2xl overflow-hidden hover-lift group">
            <div className="aspect-[4/3] bg-beige overflow-hidden">
              <img src={it.image} alt={it.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="p-4 text-center">
              <h4 className="font-bold text-navy-deep">{it.title}</h4>
              <p className="text-xs text-muted-foreground mb-3 mt-1">{it.sub}</p>
              <span className="inline-flex items-center gap-1 text-emerald text-sm font-semibold">
                {it.cta || "تسوّق الآن"} <ArrowLeft className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ───────────────────────────────────────────── Occasions grid (gifts page)
export function OccasionsGrid({
  occasions,
}: {
  occasions: { icon: any; label: string; color: string }[];
}) {
  return (
    <section className="container mx-auto px-4 py-12">
      <PanelCard>
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-gold-deep mb-2">
            <GiftIcon className="w-5 h-5" />
            <span className="text-xs tracking-[0.4em]">OCCASIONS</span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl text-navy-deep">اختر الهدية حسب المناسبة</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {occasions.map((o) => (
            <div key={o.label} className="text-center bg-beige rounded-2xl p-4 hover-lift cursor-pointer">
              <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-3 ${o.color}`}>
                <o.icon className="w-8 h-8" />
              </div>
              <div className="font-bold text-sm text-navy-deep mb-1">{o.label}</div>
              <span className="text-xs text-gold-deep inline-flex items-center gap-1">تسوق الآن <ArrowLeft className="w-3 h-3" /></span>
            </div>
          ))}
        </div>
      </PanelCard>
    </section>
  );
}

// ───────────────────────────────────────────── Tabs (gender selector)
export function PillTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: string; label: string; icon?: any }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 my-6">
      {tabs.map((t) => {
        const isActive = t.id === active;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition border ${
              isActive ? "bg-emerald text-ivory border-emerald shadow-luxe" : "bg-white text-navy-deep border-border hover:border-emerald"
            }`}
          >
            {t.icon && <t.icon className="w-4 h-4 inline ml-1" />}
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

// ───────────────────────────────────────────── Wholesaler/Suggest CTA box (perfumes page)
export function CTABox({
  icon: Icon,
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  tone = "beige",
}: {
  icon: any;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref?: string;
  tone?: "beige" | "navy" | "gold";
}) {
  const styles = {
    beige: { bg: "bg-beige", text: "text-navy-deep", btn: "bg-emerald text-ivory" },
    navy: { bg: "bg-navy-deep", text: "text-ivory", btn: "bg-gold text-navy-deep" },
    gold: { bg: "gradient-gold", text: "text-navy-deep", btn: "bg-navy-deep text-ivory" },
  }[tone];
  return (
    <div className={`relative rounded-2xl p-6 md:p-8 ${styles.bg} ${styles.text} border border-gold/20`}>
      <div className="flex items-start gap-5">
        <div className="w-14 h-14 rounded-2xl bg-white shadow flex items-center justify-center shrink-0 text-gold-deep">
          <Icon className="w-7 h-7" />
        </div>
        <div className="flex-1">
          <div className="text-xs tracking-[0.3em] mb-1 opacity-70">{eyebrow}</div>
          <h3 className="font-display text-2xl mb-2">{title}</h3>
          <p className="text-sm opacity-80 mb-4 leading-relaxed">{description}</p>
          <button className={`${styles.btn} px-5 py-2.5 rounded-full text-sm font-bold inline-flex items-center gap-2 hover:opacity-90 transition`}>
            {ctaLabel} <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────── Mini package grid (gift packages line cards)
export function GiftPackageStrip({
  items,
}: {
  items: { name: string; image: string; tone: string; cta?: string }[];
}) {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 text-gold-deep mb-2">
          <Package className="w-5 h-5" />
          <span className="text-xs tracking-[0.4em]">EXCLUSIVE PACKAGES</span>
        </div>
        <h3 className="font-display text-2xl md:text-3xl text-navy-deep">باقات عطور HENDAWI الحصرية</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {items.map((p) => (
          <div key={p.name} className={`rounded-2xl overflow-hidden border border-gold/20 ${p.tone} text-center p-4 hover-lift cursor-pointer`}>
            <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-white/30">
              <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="font-bold text-navy-deep mb-2">{p.name}</div>
            <button className="text-xs bg-navy-deep text-ivory px-4 py-1.5 rounded-full hover:bg-gold hover:text-navy-deep transition">
              {p.cta || "اكتشف الباقات"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}