import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function SectionTitle({ eyebrow, title, subtitle, center = true }: { eyebrow?: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={`${center ? "text-center" : ""} mb-12`}>
      {eyebrow && (
        <div className={`flex items-center gap-3 ${center ? "justify-center" : ""} mb-3`}>
          <span className="w-8 h-px bg-gold" />
          <span className="text-xs tracking-[0.4em] text-gold-deep font-semibold uppercase">{eyebrow}</span>
          <span className="w-8 h-px bg-gold" />
        </div>
      )}
      <h2 className="font-display text-3xl md:text-5xl text-navy-deep">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}
