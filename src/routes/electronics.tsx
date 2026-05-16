import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import heroElectronics from "@/assets/hero-electronics.jpg";
import { SEED_PRODUCTS, formatPrice } from "@/lib/products";

export const Route = createFileRoute("/electronics")({
  component: Electronics,
  head: () => ({
    meta: [
      { title: "إلكترونيات وملحقات تقنية — Hendawi" },
      { name: "description", content: "باور بانك، شواحن، إكسسوارات ألعاب ومنتجات PlayStation أصلية." },
    ],
  }),
});

function Electronics() {
  const products = SEED_PRODUCTS.filter((p) => p.category === "electronics").map((p) => ({
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
