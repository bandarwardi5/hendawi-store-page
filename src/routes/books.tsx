import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import heroBooks from "@/assets/hero-books.jpg";
import { SEED_PRODUCTS, formatPrice } from "@/lib/products";

export const Route = createFileRoute("/books")({
  component: Books,
  head: () => ({
    meta: [
      { title: "الكتب المحاسبية والمالية — Hendawi" },
      { name: "description", content: "كتب محاسبة، مالية، تدقيق ومعايير IFRS — ورقية ورقمية بجودة عالية." },
    ],
  }),
});

function Books() {
  const products = SEED_PRODUCTS.filter((p) => p.category === "books").map((p) => ({
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
        eyebrow: "ACCOUNTING LIBRARY",
        title: "مكتبة متخصصة في",
        highlight: "الكتب المحاسبية",
        description: "للمعرفة التي تصنع الفرق — مصادر موثوقة، محتوى احترافي وتنمية مستمرة.",
        image: heroBooks,
        ctaPrimary: "تصفّح المكتبة",
        ctaSecondary: "الكتب الرقمية PDF",
      }}
      filters={["الكل", "المحاسبة المالية", "المحاسبة الإدارية", "المراجعة والرقابة", "الضرائب والزكاة", "المعايير الدولية IFRS"]}
      products={products}
      title="تصفّح كتب المحاسبة"
      subtitle="مراجع موثوقة ومحدّثة باستمرار."
    />
  );
}
