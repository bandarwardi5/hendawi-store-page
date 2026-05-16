import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import heroFashion from "@/assets/hero-fashion.jpg";
import { SEED_PRODUCTS, formatPrice } from "@/lib/products";

export const Route = createFileRoute("/fashion")({
  component: Fashion,
  head: () => ({
    meta: [
      { title: "الأزياء والإكسسوارات الفاخرة — Hendawi" },
      { name: "description", content: "حقائب جلدية فاخرة، نظارات، محافظ، أحزمة وإكسسوارات راقية." },
    ],
  }),
});

function Fashion() {
  const products = SEED_PRODUCTS.filter((p) => p.category === "fashion").map((p) => ({
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
        eyebrow: "FASHION",
        title: "الأناقة في",
        highlight: "كل تفصيل",
        description: "حقائب جلدية إيطالية الصنع، إكسسوارات راقية ونظارات بإطلالة عصرية فاخرة.",
        image: heroFashion,
        ctaPrimary: "تسوّق الآن",
      }}
      filters={["الكل", "حقائب", "محافظ", "أحزمة", "نظارات شمسية", "إكسسوارات"]}
      products={products}
      title="أحدث وصول"
      subtitle="إطلالات فاخرة لمحبي التميّز."
    />
  );
}
