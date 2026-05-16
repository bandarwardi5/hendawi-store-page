import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import heroPerfume from "@/assets/hero-perfume.jpg";
import { SEED_PRODUCTS, formatPrice } from "@/lib/products";

export const Route = createFileRoute("/perfumes")({
  component: Perfumes,
  head: () => ({
    meta: [
      { title: "العطور الخليجية الفاخرة — Hendawi" },
      { name: "description", content: "تشكيلة فاخرة من العطور الخليجية، العود، البخور والعطور النيش." },
    ],
  }),
});

function Perfumes() {
  const products = SEED_PRODUCTS.filter((p) => p.category === "perfumes").map((p) => ({
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
        eyebrow: "GULF PERFUMES",
        title: "عطور خليجية أصلية",
        highlight: "من الخليج إلى عالمك",
        description: "عبير الخليج بفخامته العريقة — عود، بخور وعطور نيش مختارة من أفضل دور العطور.",
        image: heroPerfume,
        ctaPrimary: "اكتشف العطور",
        ctaSecondary: "صمم باقتك",
      }}
      filters={["الكل", "رجالي", "نسائي", "يونيسكس", "عود", "بخور", "نيش", "باقات هدايا"]}
      products={products}
      title="أشهر دور العطور"
      subtitle="تشكيلة منتقاة من Lattafa، Afnan، Armaf، Rasasi، Khadlaj وأكثر."
    />
  );
}
