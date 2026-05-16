import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import heroBooks from "@/assets/hero-books.jpg";

export const Route = createFileRoute("/books")({
  component: Books,
  head: () => ({
    meta: [
      { title: "الكتب المحاسبية والمالية — Hendawi" },
      { name: "description", content: "كتب محاسبة، مالية، تدقيق ومعايير IFRS — ورقية ورقمية بجودة عالية." },
    ],
  }),
});

const titles = [
  "التحليل المالي للقوائم المالية",
  "المحاسبة المالية المتقدمة طبقاً للمعايير الدولية IFRS",
  "المراجعة والرقابة الداخلية",
  "المحاسبة الإدارية: التخطيط والرقابة واتخاذ القرار",
  "الضرائب والزكاة في المملكة العربية السعودية",
  "محاسبة التكاليف المتقدمة",
  "إدارة المخاطر المالية",
  "أساسيات التدقيق الداخلي",
];

const products = titles.map((t, i) => ({
  image: heroBooks,
  title: t,
  subtitle: "PDF + ورقي",
  price: `${[49, 69, 59, 49, 39, 55, 75, 45][i]} ر.س`,
  rating: 4.5 + (i % 2) * 0.5,
  reviews: 25 + i * 7,
  badge: i === 1 ? { label: "الأكثر مبيعاً", tone: "gold" as const } : i === 4 ? { label: "جديد", tone: "emerald" as const } : undefined,
}));

function Books() {
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
