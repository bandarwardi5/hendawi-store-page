import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo-hendawi.png";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-ivory mt-24">
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <img src={logo} alt="Hendawi" className="w-16 h-16 mb-4" />
            <p className="text-ivory/70 text-sm leading-relaxed mb-4">
              مجموعة هنداوي — وجهتك الأولى للعطور الخليجية الأصلية، الساعات الفاخرة، الهدايا المميزة وخدمات الشحن الدولي من إسطنبول إلى العالم.
            </p>
            <div className="flex gap-3 text-gold">
              <a className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold hover:text-navy-deep transition"><Facebook className="w-4 h-4" /></a>
              <a className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold hover:text-navy-deep transition"><Instagram className="w-4 h-4" /></a>
              <a className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold hover:text-navy-deep transition"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-gold font-bold mb-4 text-sm tracking-widest">الأقسام</h4>
            <ul className="space-y-2 text-sm text-ivory/75">
              <li><Link to="/perfumes" className="hover:text-gold">العطور الخليجية</Link></li>
              <li><Link to="/fashion" className="hover:text-gold">الأزياء والإكسسوارات</Link></li>
              <li><Link to="/watches" className="hover:text-gold">الساعات والهدايا</Link></li>
              <li><Link to="/electronics" className="hover:text-gold">الإلكترونيات</Link></li>
              <li><Link to="/books" className="hover:text-gold">الكتب المحاسبية</Link></li>
              <li><Link to="/shipping" className="hover:text-gold">الشحن الدولي</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold font-bold mb-4 text-sm tracking-widest">خدمة العملاء</h4>
            <ul className="space-y-2 text-sm text-ivory/75">
              <li>سياسة الإرجاع</li>
              <li>الشروط والأحكام</li>
              <li>سياسة الخصوصية</li>
              <li>الأسئلة الشائعة</li>
              <li>تتبع الطلب</li>
              <li>ضمان الأصالة</li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold font-bold mb-4 text-sm tracking-widest">تواصل معنا</h4>
            <ul className="space-y-3 text-sm text-ivory/75">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-gold" /> +90 552 123 45 67</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-gold" /> info@hendawigroup.com</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold" /> إسطنبول — تركيا</li>
            </ul>
            <div className="mt-5">
              <p className="text-xs text-ivory/60 mb-2">اشترك بالنشرة لتصلك العروض الحصرية</p>
              <div className="flex gap-2">
                <input className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-ivory placeholder:text-ivory/40" placeholder="بريدك الإلكتروني" />
                <button className="bg-gold text-navy-deep text-xs font-bold px-4 rounded">اشترك</button>
              </div>
            </div>
          </div>
        </div>

        <div className="gold-divider mb-6" />
        <p className="text-center text-xs text-ivory/50">
          © 2026 Hendawi Group. جميع الحقوق محفوظة. — صُمم بشغف في إسطنبول
        </p>
      </div>
    </footer>
  );
}
