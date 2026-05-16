import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import heroWatches from "@/assets/hero-watches.jpg";
import { SEED_PRODUCTS, formatPrice } from "@/lib/products";

export const Route = createFileRoute("/watches")({
  component: Watches,
  head: () => ({
    meta: [
      { title: "الساعات الفاخرة والهدايا — Hendawi" },
      { name: "description", content: "ساعات راقية للرجال والنساء وباقات هدايا فاخرة بتغليف مميز." },
    ],
  }),
});

function Watches() {
  const products = SEED_PRODUCTS.filter((p) => p.category === "watches" || p.category === "gifts").map((p) => ({
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
        eyebrow: "TIMEPIECES & GIFTS",
        title: "الفخامة تعكس",
        highlight: "شخصيتك",
        description: "ساعات راقية من أرقى البيوت العالمية وباقات هدايا مصممة بعناية لمناسباتك المميزة.",
        image: heroWatches,
        ctaPrimary: "تسوّق الساعات",
        ctaSecondary: "صمّم باقتك",
      }}
      filters={["الكل", "ساعات رجالية", "ساعات نسائية", "باقات هدايا", "هدايا مواليد", "هدايا تخرج", "هدايا حب"]}
      products={products}
      title="الأكثر مبيعاً"
      subtitle="من علامات Richard Mille، Rolex، Audemars Piguet، Hublot، Cartier، Omega وأكثر."
    />
  );
}
