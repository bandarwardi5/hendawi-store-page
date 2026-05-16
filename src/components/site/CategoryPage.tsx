import { ReactNode } from "react";
import { Layout, SectionTitle } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { ArrowLeft } from "lucide-react";

export interface CategoryProduct {
  image: string;
  title: string;
  subtitle?: string;
  price: string;
  oldPrice?: string;
  rating?: number;
  reviews?: number;
  badge?: { label: string; tone?: "gold" | "emerald" | "red" };
}

export function CategoryHero({
  eyebrow,
  title,
  highlight,
  description,
  image,
  ctaPrimary,
  ctaSecondary,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  image: string;
  ctaPrimary: string;
  ctaSecondary?: string;
}) {
  return (
    <section className="relative bg-navy-deep text-ivory overflow-hidden">
      <div className="absolute inset-0">
        <img src={image} alt="" className="w-full h-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-l from-navy-deep via-navy-deep/80 to-navy-deep/40" />
      </div>
      <div className="relative container mx-auto px-6 py-20 md:py-28">
        <div className="max-w-2xl animate-fade-up">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-12 h-px bg-gold" />
            <span className="text-xs tracking-[0.4em] text-gold font-semibold">{eyebrow}</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl leading-tight mb-5">
            {title} {highlight && <span className="text-gradient-gold">{highlight}</span>}
          </h1>
          <p className="text-ivory/75 text-lg mb-8 leading-relaxed">{description}</p>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 bg-gold text-navy-deep font-bold px-7 py-3.5 rounded-full hover:shadow-gold transition">
              {ctaPrimary} <ArrowLeft className="w-4 h-4" />
            </button>
            {ctaSecondary && (
              <button className="border border-gold/50 text-ivory font-semibold px-7 py-3.5 rounded-full hover:bg-gold hover:text-navy-deep transition">
                {ctaSecondary}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CategoryPage({
  heroProps,
  filters,
  products,
  title,
  subtitle,
  children,
}: {
  heroProps: Parameters<typeof CategoryHero>[0];
  filters?: string[];
  products: CategoryProduct[];
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <Layout>
      <CategoryHero {...heroProps} />

      {filters && filters.length > 0 && (
        <section className="bg-white border-b border-border sticky top-[88px] z-30">
          <div className="container mx-auto px-6 py-4 flex gap-2 overflow-x-auto">
            {filters.map((f, i) => (
              <button
                key={f}
                className={`text-sm px-4 py-2 rounded-full whitespace-nowrap transition ${
                  i === 0 ? "bg-navy-deep text-ivory" : "bg-beige text-navy-deep hover:bg-gold"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="container mx-auto px-6 py-16">
        <SectionTitle eyebrow="مجموعتنا" title={title} subtitle={subtitle} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <ProductCard key={p.title} {...p} />
          ))}
        </div>
      </section>

      {children}
    </Layout>
  );
}
