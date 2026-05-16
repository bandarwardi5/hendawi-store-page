import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";
import heroWatches from "@/assets/hero-watches.jpg";
import pWatch from "@/assets/product-watch-1.jpg";
import pGift from "@/assets/product-gift-1.jpg";

export const Route = createFileRoute("/watches")({
  component: Watches,
  head: () => ({
    meta: [
      { title: "الساعات الفاخرة والهدايا — Hendawi" },
      { name: "description", content: "ساعات راقية للرجال والنساء وباقات هدايا فاخرة بتغليف مميز." },
    ],
  }),
});

const products = [
  { image: pWatch, title: "ساعة كلاسيك ذهبية", subtitle: "ساعة رجالية • سويسرية", price: "1,899 ر.س", oldPrice: "2,299 ر.س", rating: 5, reviews: 142, badge: { label: "الأفضل", tone: "gold" as const } },
  { image: pGift, title: "باكج الإيمان", subtitle: "مصحف • مسبحة • عطر", price: "299 ر.س", rating: 5, reviews: 75, badge: { label: "هدية", tone: "emerald" as const } },
  { image: pWatch, title: "ساعة الفخامة الفضية", subtitle: "ساعة رجالية", price: "1,499 ر.س", rating: 4.5, reviews: 96 },
  { image: pGift, title: "باكج الرجل الأنيق", subtitle: "ساعة + محفظة + قلم", price: "449 ر.س", rating: 4.5, reviews: 53, badge: { label: "مميزة", tone: "gold" as const } },
  { image: pWatch, title: "ساعة نسائية روز جولد", subtitle: "ساعة نسائية", price: "1,299 ر.س", rating: 5, reviews: 87 },
  { image: pGift, title: "باكج العطر الملكي", subtitle: "عطر + بخور + محفظة", price: "399 ر.س", rating: 4, reviews: 64 },
  { image: pWatch, title: "ساعة سبورت كرونوغراف", subtitle: "ساعة رجالية", price: "2,199 ر.س", rating: 5, reviews: 113 },
  { image: pGift, title: "باكج الأناقة", subtitle: "إكسسوارات وعطر", price: "349 ر.س", rating: 4.5, reviews: 41 },
];

function Watches() {
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
      title="الأكثر مبيعاً من Rolex وPatek Philippe"
      subtitle="من علامات Richard Mille، Rolex، Audemars Piguet، Hublot، Cartier، Omega وأكثر."
    />
  );
}
