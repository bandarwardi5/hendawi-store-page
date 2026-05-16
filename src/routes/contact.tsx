import { createFileRoute } from "@tanstack/react-router";
import { Layout, SectionTitle } from "@/components/site/Layout";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "تواصل معنا — Hendawi Group" },
      { name: "description", content: "تواصل مع فريق هنداوي عبر الواتساب، الهاتف أو البريد الإلكتروني — إسطنبول، تركيا." },
    ],
  }),
});

function Contact() {
  return (
    <Layout>
      <section className="bg-navy-deep text-ivory py-20">
        <div className="container mx-auto px-6 text-center">
          <SectionTitle eyebrow="CONTACT" title="تواصل معنا" subtitle="فريقنا جاهز للردّ على جميع استفساراتك خلال نفس اليوم." />
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 grid lg:grid-cols-2 gap-8">
        <div className="bg-white border border-border rounded-2xl p-8 shadow-luxe">
          <h3 className="font-display text-2xl text-navy-deep mb-6">أرسل لنا رسالة</h3>
          <form className="grid gap-4">
            <input className="bg-beige border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold" placeholder="الاسم الكامل" />
            <input className="bg-beige border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold" placeholder="البريد الإلكتروني" />
            <input className="bg-beige border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold" placeholder="رقم الجوال / واتساب" />
            <textarea rows={5} className="bg-beige border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold" placeholder="رسالتك" />
            <button type="button" className="bg-navy-deep text-ivory font-bold py-3 rounded-xl hover:bg-gold hover:text-navy-deep transition flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> إرسال الرسالة
            </button>
          </form>
        </div>

        <div className="space-y-4">
          {[
            { icon: MessageCircle, t: "واتساب", d: "+90 501 000 03 10", c: "bg-emerald text-ivory" },
            { icon: Phone, t: "اتصال مباشر", d: "+90 501 000 03 10", c: "bg-navy-deep text-ivory" },
            { icon: Mail, t: "البريد الإلكتروني", d: "info@hendawigroup.com", c: "bg-gold text-navy-deep" },
            { icon: MapPin, t: "موقعنا", d: "إسطنبول — تركيا", c: "bg-beige text-navy-deep border border-border" },
          ].map((b) => (
            <div key={b.t} className={`${b.c} rounded-2xl p-6 flex items-center gap-5 hover-lift`}>
              <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <b.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs opacity-80 mb-1">{b.t}</div>
                <div className="font-bold text-lg">{b.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
