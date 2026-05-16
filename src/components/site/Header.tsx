import { Link } from "@tanstack/react-router";
import { Search, User, Heart, ShoppingBag, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo-hendawi.png";

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
          <button className="hidden md:block p-2 hover:text-gold transition"><User className="w-5 h-5" /></button>
          <button className="hidden md:block p-2 hover:text-gold transition"><Heart className="w-5 h-5" /></button>
          <button className="relative p-2 hover:text-gold transition">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-gold text-navy-deep text-[10px] font-bold flex items-center justify-center">2</span>
          </button>
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
