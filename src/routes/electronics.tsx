import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import heroElectronics from "@/assets/hero-electronics.jpg";
import pElec from "@/assets/product-electronics-1.jpg";

export const Route = createFileRoute("/electronics")({
  component: Electronics,
  head: () => ({
    meta: [
      { title: "إلكترونيات وملحقات تقنية — Hendawi" },
      { name: "description", content: "باور بانك، شواحن، إكسسوارات ألعاب ومنتجات PlayStation أصلية." },
    ],
  }),
});

const products = Array.from({ length: 8 }).map((_, i) => ({
  image: pElec,
  title: ["باور بانك 20000mAh", "شاحن لاسلكي ماجنت", "يد تحكم PS5", "سماعات بلوتوث برو", "كيبل تايب-سي سريع", "ستاند ألعاب RGB", "ماوس ألعاب احترافي", "كيبورد ميكانيكي"][i],
  subtitle: "ضمان دولي • أصلي",
  price: `${[349, 199, 449, 299, 89, 249, 329, 549][i]} ر.س`,
  oldPrice: i % 2 === 0 ? `${[429, 269, 539, 379][i % 4]} ر.س` : undefined,
  rating: 4 + (i % 2) * 0.5,
  reviews: 25 + i * 9,
  badge: i === 0 ? { label: "خصم 20%", tone: "red" as const } : i === 2 ? { label: "PS5", tone: "gold" as const } : undefined,
}));

function Electronics() {
  return (
    <CategoryPage
      heroProps={{
        eyebrow: "ELECTRONICS",
        title: "تقنية بمعايير",
        highlight: "احترافية",
        description: "أحدث الإلكترونيات وإكسسوارات الألعاب بضمان أصلي وتسليم سريع.",
        image: heroElectronics,
        ctaPrimary: "تسوّق الآن",
      }}
      filters={["الكل", "باور بانك", "شواحن", "إكسسوارات ألعاب", "PlayStation", "سماعات", "كابلات"]}
      products={products}
      title="الأكثر مبيعاً"
      subtitle="منتجات منتقاة بضمان دولي."
    />
  );
}
