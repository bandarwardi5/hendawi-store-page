import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout, SectionTitle } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { fetchProduct, fetchProductsByCategory, formatPrice, Product } from "@/lib/products";
import { Loader2, Star, Heart, ShoppingBag, Truck, ShieldCheck, BadgeCheck, ChevronLeft, Minus, Plus } from "lucide-react";

export const Route = createFileRoute("/products/$productId")({
  loader: async ({ params }) => {
    const product = await fetchProduct(params.productId);
    if (!product) throw notFound();
    const related = (await fetchProductsByCategory(product.category)).filter((p) => p.id !== product.id).slice(0, 4);
    return { product, related };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.title} — Hendawi Group` },
          { name: "description", content: loaderData.product.description?.slice(0, 160) || loaderData.product.subtitle || loaderData.product.title },
          { property: "og:title", content: loaderData.product.title },
          { property: "og:description", content: loaderData.product.subtitle || "" },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [{ title: "منتج — Hendawi Group" }],
  }),
  component: ProductDetailPage,
  notFoundComponent: () => (
    <Layout>
      <div className="container mx-auto px-6 py-32 text-center">
        <h1 className="font-display text-4xl text-navy-deep mb-3">المنتج غير موجود</h1>
        <p className="text-muted-foreground mb-6">عذراً، لم نتمكن من العثور على هذا المنتج.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-gold text-navy-deep font-bold px-6 py-3 rounded-full">العودة للرئيسية</Link>
      </div>
    </Layout>
  ),
  errorComponent: ({ error }) => {
    const router = useRouter();
    return (
      <Layout>
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="font-display text-3xl text-navy-deep mb-3">حدث خطأ</h1>
          <p className="text-muted-foreground mb-6">{error.message}</p>
          <button onClick={() => router.invalidate()} className="bg-navy-deep text-ivory px-6 py-3 rounded-full">إعادة المحاولة</button>
        </div>
      </Layout>
    );
  },
});

const CATEGORY_LABELS: Record<Product["category"], string> = {
  perfumes: "العطور الخليجية",
  watches: "الساعات",
  fashion: "الأزياء",
  electronics: "الإلكترونيات",
  books: "الكتب المحاسبية",
  gifts: "الهدايا",
};

const CATEGORY_LINKS: Record<Product["category"], "/perfumes" | "/watches" | "/fashion" | "/electronics" | "/books" | "/"> = {
  perfumes: "/perfumes",
  watches: "/watches",
  fashion: "/fashion",
  electronics: "/electronics",
  books: "/books",
  gifts: "/watches",
};

function ProductDetailPage() {
  const { product, related } = Route.useLoaderData() as { product: Product; related: Product[] };
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const [activeImage, setActiveImage] = useState(images[0]);

  useEffect(() => {
    setActiveImage(images[0]);
    setQty(1);
  }, [product.id]);

  const onAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
    // TODO: Cart integration in Phase 4
  };

  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-beige border-b border-border">
        <div className="container mx-auto px-6 py-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-gold">الرئيسية</Link>
          <ChevronLeft className="w-3 h-3" />
          <Link to={CATEGORY_LINKS[product.category]} className="hover:text-gold">{CATEGORY_LABELS[product.category]}</Link>
          <ChevronLeft className="w-3 h-3" />
          <span className="text-navy-deep font-semibold truncate">{product.title}</span>
        </div>
      </div>

      <section className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            <div className="aspect-square rounded-2xl bg-beige overflow-hidden mb-4">
              <img src={activeImage} alt={product.title} className="w-full h-full object-cover" />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {images.map((img) => (
                  <button
                    key={img}
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition ${activeImage === img ? "border-gold" : "border-border"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.brand && <div className="text-xs tracking-[0.3em] text-gold-deep uppercase mb-2">{product.brand}</div>}
            <h1 className="font-display text-3xl md:text-4xl text-navy-deep mb-3">{product.title}</h1>
            {product.subtitle && <p className="text-muted-foreground mb-4">{product.subtitle}</p>}

            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating || 0) ? "fill-gold text-gold" : "text-border"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews || 0} تقييم)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-4xl text-navy-deep">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
                  <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full">خصم {discount}%</span>
                </>
              )}
            </div>

            {product.description && <p className="text-navy-deep/80 leading-relaxed mb-6">{product.description}</p>}

            {product.variants?.map((v) => (
              <div key={v.label} className="mb-5">
                <div className="text-sm font-bold text-navy-deep mb-2">{v.label}</div>
                <div className="flex flex-wrap gap-2">
                  {v.options.map((opt) => (
                    <button key={opt} className="px-4 py-2 rounded-lg border border-border hover:border-gold text-sm">
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex items-center gap-4 mb-6">
              <div className="text-sm font-bold text-navy-deep">الكمية:</div>
              <div className="flex items-center border border-border rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-beige"><Minus className="w-4 h-4" /></button>
                <span className="px-5 text-navy-deep font-bold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 py-2 hover:bg-beige"><Plus className="w-4 h-4" /></button>
              </div>
              {product.stock !== undefined && (
                <span className={`text-xs ${product.stock > 0 ? "text-emerald-700" : "text-red-600"}`}>
                  {product.stock > 0 ? `متوفر (${product.stock})` : "غير متوفر"}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={onAdd}
                disabled={product.stock === 0}
                className="flex-1 min-w-[200px] bg-navy-deep text-ivory hover:bg-gold hover:text-navy-deep transition py-3.5 rounded-full font-bold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShoppingBag className="w-5 h-5" /> {added ? "تمت الإضافة ✓" : "أضف إلى السلة"}
              </button>
              <button className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-gold hover:text-gold transition">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border">
              {[
                { icon: Truck, t: "شحن سريع" },
                { icon: ShieldCheck, t: "دفع آمن" },
                { icon: BadgeCheck, t: "أصلي 100%" },
              ].map((b) => (
                <div key={b.t} className="flex flex-col items-center text-center gap-1 text-xs text-muted-foreground">
                  <b.icon className="w-5 h-5 text-gold-deep" />
                  {b.t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-beige py-16">
          <div className="container mx-auto px-6">
            <SectionTitle eyebrow="منتجات ذات صلة" title="قد يعجبك أيضاً" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((p) => (
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
          </div>
        </section>
      )}
    </Layout>
  );
}
