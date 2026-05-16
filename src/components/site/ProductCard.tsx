import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function ProductCard({
  productId,
  image,
  title,
  subtitle,
  price,
  oldPrice,
  rating = 4.5,
  reviews = 0,
  badge,
}: {
  productId?: string;
  image: string;
  title: string;
  subtitle?: string;
  price: string;
  oldPrice?: string;
  rating?: number;
  reviews?: number;
  badge?: { label: string; tone?: "gold" | "emerald" | "red" };
}) {
  const tone = badge?.tone ?? "gold";
  const toneCls =
    tone === "emerald"
      ? "bg-emerald text-ivory"
      : tone === "red"
      ? "bg-red-600 text-white"
      : "bg-gold text-navy-deep";

  const ImageWrap = ({ children }: { children: React.ReactNode }) =>
    productId ? (
      <Link to="/products/$productId" params={{ productId }} className="block">
        {children}
      </Link>
    ) : (
      <>{children}</>
    );

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-border hover-lift">
      <div className="relative aspect-square bg-beige overflow-hidden">
        <ImageWrap>
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </ImageWrap>
        {badge && (
          <span className={`absolute top-3 right-3 ${toneCls} text-[11px] font-bold px-3 py-1 rounded-full`}>
            {badge.label}
          </span>
        )}
        <button className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-navy-deep hover:bg-gold hover:text-navy-deep transition">
          <Heart className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4">
        {productId ? (
          <Link to="/products/$productId" params={{ productId }}>
            <h3 className="font-bold text-navy-deep text-sm mb-1 line-clamp-1 hover:text-gold transition">{title}</h3>
          </Link>
        ) : (
          <h3 className="font-bold text-navy-deep text-sm mb-1 line-clamp-1">{title}</h3>
        )}
        {subtitle && <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{subtitle}</p>}
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < Math.round(rating) ? "fill-gold text-gold" : "text-border"}`} />
          ))}
          <span className="text-[10px] text-muted-foreground mr-1">({reviews})</span>
        </div>
        <div className="flex items-baseline justify-between gap-2 mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-navy-deep">{price}</span>
            {oldPrice && <span className="text-xs text-muted-foreground line-through">{oldPrice}</span>}
          </div>
        </div>
        {productId ? (
          <Link
            to="/products/$productId"
            params={{ productId }}
            className="w-full bg-navy-deep text-ivory hover:bg-gold hover:text-navy-deep transition py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" /> عرض المنتج
          </Link>
        ) : (
          <button className="w-full bg-navy-deep text-ivory hover:bg-gold hover:text-navy-deep transition py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
            <ShoppingBag className="w-4 h-4" /> أضف إلى السلة
          </button>
        )}
      </div>
    </div>
  );
}
