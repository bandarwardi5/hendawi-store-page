import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import heroPerfume from "@/assets/hero-perfume.jpg";
import pPerfume from "@/assets/product-perfume-1.jpg";

export const Route = createFileRoute("/perfumes")({
  component: Perfumes,
  head: () => ({
    meta: [
      { title: "العطور الخليجية الفاخرة — Hendawi" },
      { name: "description", content: "تشكيلة فاخرة من العطور الخليجية، العود، البخور والعطور النيش." },
    ],
  }),
});

const products = Array.from({ length: 8 }).map((_, i) => ({
  image: pPerfume,
  title: ["عود سوبريم 2077", "مسك الإمارات", "عطر الفرسان", "بخور لطافة", "عطر دار الحرمين", "أفنان الذهبي", "عطر القمة", "ريف الفخامة"][i],
  subtitle: "عطر فاخر • 100 مل",
  price: `${[499, 389, 549, 199, 459, 329, 599, 279][i]} ر.س`,
  oldPrice: i % 3 === 0 ? `${[599, 489, 649][i % 3]} ر.س` : undefined,
  rating: 4 + (i % 2) * 0.5,
  reviews: 30 + i * 12,
  badge: i === 0 ? { label: "الأكثر طلباً", tone: "gold" as const } : i === 2 ? { label: "جديد", tone: "emerald" as const } : undefined,
}));

function Perfumes() {
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
