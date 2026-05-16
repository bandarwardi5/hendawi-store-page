import { Link, useNavigate } from "@tanstack/react-router";
import { Search, User, Heart, ShoppingBag, Menu, X, Globe, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo-hendawi.png";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/hooks/use-cart";

const nav = [
  { to: "/" as const, label: "الرئيسية" },
  { to: "/perfumes" as const, label: "العطور الخليجية" },
  { to: "/fashion" as const, label: "الأزياء" },
  { to: "/watches" as const, label: "الساعات والهدايا" },
  { to: "/electronics" as const, label: "الإلكترونيات" },
  { to: "/books" as const, label: "الكتب المحاسبية" },
  { to: "/shipping" as const, label: "الشحن الدولي" },
  { to: "/contact" as const, label: "تواصل معنا" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const { user, profile, logout } = useAuth();
  const cartItemsCount = useCart((state) => state.getCartItemsCount());
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && search.trim()) {
      navigate({ to: "/search", search: { q: search.trim() } });
      setSearch("");
    }
  };
  return (
    <header className="sticky top-0 z-50 bg-navy-deep text-ivory border-b border-[color-mix(in_oklab,var(--gold)_25%,transparent)]">
      {/* Top strip */}
      <div className="hidden md:block border-b border-white/5 bg-black/20">
        <div className="container mx-auto px-6 py-2 flex justify-between items-center text-xs text-ivory/70">
          <div className="flex items-center gap-5">
            <span>شحن سريع لجميع دول العالم</span>
            <span className="opacity-40">•</span>
            <span>تغليف فاخر لكل هدية</span>
            <span className="opacity-40">•</span>
            <span>منتجات أصلية 100%</span>
          </div>
          <div className="flex items-center gap-2 text-gold">
            <Globe className="w-3.5 h-3.5" />
            <span>العربية</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-4 flex items-center gap-4">
        <button onClick={() => setOpen(!open)} className="lg:hidden text-ivory">
          {open ? <X /> : <Menu />}
        </button>

        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="Hendawi Group" className="w-12 h-12 object-contain" />
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-xl text-gold tracking-wide">HENDAWI</span>
            <span className="text-[10px] tracking-[0.4em] text-ivory/60">GROUP</span>
          </div>
        </Link>

        <div className="hidden lg:flex flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="ابحث عن منتج، علامة أو فئة..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full bg-white/5 border border-white/10 rounded-full pr-12 pl-4 py-2.5 text-sm text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60 transition"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1 text-sm">
          {nav.slice(0, 6).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-3 py-2 text-ivory/85 hover:text-gold transition relative"
              activeProps={{ className: "px-3 py-2 text-gold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 mr-auto">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenu(!userMenu)}
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 hover:bg-gold hover:text-navy-deep transition"
              >
                <div className="w-7 h-7 rounded-full bg-gold text-navy-deep flex items-center justify-center text-xs font-bold">
                  {(profile?.displayName || user.email || "?")[0].toUpperCase()}
                </div>
                <span className="text-sm max-w-[100px] truncate">{profile?.displayName || user.email}</span>
              </button>
              {userMenu && (
                <div className="absolute left-0 top-full mt-2 w-56 bg-white text-navy-deep rounded-xl shadow-luxe border border-border overflow-hidden z-50">
                  <Link to="/profile" onClick={() => setUserMenu(false)} className="flex items-center gap-2 px-4 py-3 hover:bg-beige text-sm">
                    <User className="w-4 h-4" /> حسابي
                  </Link>
                  {profile?.role === "admin" && (
                    <Link to="/admin" onClick={() => setUserMenu(false)} className="flex items-center gap-2 px-4 py-3 hover:bg-beige text-sm">
                      <LayoutDashboard className="w-4 h-4" /> لوحة الإدارة
                    </Link>
                  )}
                  <button
                    onClick={async () => { await logout(); setUserMenu(false); }}
                    className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-50 text-sm text-red-600 border-t border-border"
                  >
                    <LogOut className="w-4 h-4" /> تسجيل الخروج
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 hover:bg-gold hover:text-navy-deep transition text-sm font-semibold">
              <User className="w-4 h-4" /> دخول
            </Link>
          )}
          <button className="hidden md:block p-2 hover:text-gold transition"><Heart className="w-5 h-5" /></button>
          <Link to="/cart" className="relative p-2 hover:text-gold transition">
            <ShoppingBag className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-gold text-navy-deep text-[10px] font-bold flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-navy-deep">
          <nav className="container mx-auto px-6 py-4 flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-2.5 text-ivory/85 hover:text-gold border-b border-white/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
