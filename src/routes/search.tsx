import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts, formatPrice } from "@/lib/products";
import { Layout, SectionTitle } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { Search as SearchIcon, Loader2 } from "lucide-react";

const searchSchema = z.object({
  q: z.string().optional().catch(""),
});

export const Route = createFileRoute("/search")({
  validateSearch: (search) => searchSchema.parse(search),
  component: SearchPage,
});

function SearchPage() {
  const { q = "" } = Route.useSearch();
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  const filteredProducts = products.filter((p) => {
    const query = q.toLowerCase();
    return (
      p.title.toLowerCase().includes(query) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(query)) ||
      (p.description && p.description.toLowerCase().includes(query)) ||
      p.category.toLowerCase().includes(query) ||
      (p.brand && p.brand.toLowerCase().includes(query))
    );
  });

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <SectionTitle 
          eyebrow="نتائج البحث" 
          title={`نتائج البحث عن: ${q}`} 
          subtitle={isLoading ? "جاري البحث..." : `وجدنا ${filteredProducts.length} منتجات تطابق بحثك`}
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-gold animate-spin mb-4" />
            <p className="text-navy-deep/60">جاري تحميل المنتجات...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                productId={p.id}
                image={p.image}
                title={p.title}
                subtitle={p.subtitle}
                price={formatPrice(p.price)}
                oldPrice={p.oldPrice ? formatPrice(p.oldPrice) : undefined}
                rating={p.rating}
                reviews={p.reviews}
                badge={p.badge}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-beige/30 rounded-3xl border border-dashed border-border">
            <div className="w-16 h-16 rounded-full bg-beige flex items-center justify-center text-gold mb-4">
              <SearchIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-navy-deep mb-2">لا توجد نتائج</h3>
            <p className="text-navy-deep/60 mb-6">جرّب الكلمات المفتاحية مرة أخرى أو ابحث في الأقسام الرئيسية.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
