import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import heroFashion from "@/assets/hero-fashion.jpg";
import pBag from "@/assets/product-bag-1.jpg";

export const Route = createFileRoute("/fashion")({
  component: Fashion,
  head: () => ({
    meta: [
      { title: "الأزياء والإكسسوارات الفاخرة — Hendawi" },
      { name: "description", content: "حقائب جلدية فاخرة، نظارات، محافظ، أحزمة وإكسسوارات راقية." },
    ],
  }),
});

const products = Array.from({ length: 8 }).map((_, i) => ({
  image: pBag,
  title: ["حقيبة جلد كلاسيك", "محفظة جلد إيطالي", "حزام رجالي فاخر", "نظارة شمسية بنية", "حقيبة كروس بودي", "محفظة نسائية", "حزام نسائي ذهبي", "نظارة طيار ذهبية"][i],
  subtitle: "جلد طبيعي 100%",
  price: `${[649, 249, 199, 379, 549, 229, 189, 329][i]} ر.س`,
  rating: 4 + (i % 2) * 0.5,
  reviews: 20 + i * 8,
  badge: i === 1 ? { label: "جديد", tone: "emerald" as const } : undefined,
}));

function Fashion() {
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
