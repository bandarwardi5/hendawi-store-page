import { collection, doc, getDoc, getDocs, query, where, setDoc, serverTimestamp, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import pPerfume from "@/assets/product-perfume-1.jpg";
import pWatch from "@/assets/product-watch-1.jpg";
import pGift from "@/assets/product-gift-1.jpg";
import pBag from "@/assets/product-bag-1.jpg";
import pElec from "@/assets/product-electronics-1.jpg";
import heroBooks from "@/assets/hero-books.jpg";
import pPerfumeM from "@/assets/perfume-mens.jpg";
import pPerfumeW from "@/assets/perfume-womens.jpg";
import pPerfumeU from "@/assets/perfume-unisex.jpg";

export type Category = "perfumes" | "watches" | "fashion" | "electronics" | "books" | "gifts";

export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  category: Category;
  price: number;
  oldPrice?: number;
  currency?: string;
  image: string;
  images?: string[];
  rating?: number;
  reviews?: number;
  stock?: number;
  variants?: { label: string; options: string[] }[];
  badge?: { label: string; tone?: "gold" | "emerald" | "red" };
  brand?: string;
  tags?: string[];
}

// Seed catalog — used as fallback when Firestore is empty
export const SEED_PRODUCTS: Product[] = [
  // ─── Perfumes ─── Gulf brands
  { id: "perf-lat-01", title: "عود سوبريم 2077", subtitle: "عطر فاخر • 100 مل", category: "perfumes", price: 499, oldPrice: 599, image: pPerfumeM, rating: 5, reviews: 128, badge: { label: "الأكثر طلباً", tone: "gold" }, brand: "Lattafa", stock: 25, tags: ["mens", "oud"], description: "تركيبة شرقية فاخرة من العود الكمبودي والمسك الأبيض مع لمسات من الورد الطائفي والعنبر. ثبات يمتد لأكثر من 12 ساعة." },
  { id: "perf-lat-02", title: "بخور لطافة الذهبي", subtitle: "بخور • 50 جم", category: "perfumes", price: 199, image: pPerfume, rating: 4.5, reviews: 60, brand: "Lattafa", stock: 100, tags: ["incense"] },
  { id: "perf-lat-03", title: "لطافة بيرل", subtitle: "نسائي • 100 مل", category: "perfumes", price: 279, image: pPerfumeW, rating: 4.5, reviews: 88, brand: "Lattafa", stock: 50, tags: ["womens"] },
  { id: "perf-afn-01", title: "أفنان سوبريمسي", subtitle: "رجالي • 100 مل", category: "perfumes", price: 389, image: pPerfumeM, rating: 4.5, reviews: 96, brand: "Afnan", stock: 40, tags: ["mens"] },
  { id: "perf-afn-02", title: "أفنان روج", subtitle: "نسائي • 80 مل", category: "perfumes", price: 329, image: pPerfumeW, rating: 4.5, reviews: 54, brand: "Afnan", stock: 35, tags: ["womens"] },
  { id: "perf-arm-01", title: "أرماف كلوب دي نويت", subtitle: "رجالي • 105 مل", category: "perfumes", price: 549, image: pPerfumeM, rating: 5, reviews: 184, badge: { label: "جديد", tone: "emerald" }, brand: "Armaf", stock: 18, tags: ["mens"] },
  { id: "perf-arm-02", title: "أرماف نيش غولد", subtitle: "يونيسكس • 100 مل", category: "perfumes", price: 469, image: pPerfumeU, rating: 4.5, reviews: 64, brand: "Armaf", stock: 22, tags: ["unisex", "niche"] },
  { id: "perf-ras-01", title: "رصاصي هاوايس", subtitle: "نسائي • 75 مل", category: "perfumes", price: 359, image: pPerfumeW, rating: 5, reviews: 92, brand: "Rasasi", stock: 30, tags: ["womens"] },
  { id: "perf-ras-02", title: "رصاصي لاتجاه", subtitle: "رجالي • 100 مل", category: "perfumes", price: 379, image: pPerfumeM, rating: 4.5, reviews: 71, brand: "Rasasi", stock: 28, tags: ["mens"] },
  { id: "perf-kha-01", title: "خداج وردي", subtitle: "نسائي • 100 مل", category: "perfumes", price: 249, image: pPerfumeW, rating: 4.5, reviews: 48, brand: "Khadlaj", stock: 45, tags: ["womens"] },
  { id: "perf-kha-02", title: "خداج هاتون", subtitle: "يونيسكس • 100 مل", category: "perfumes", price: 289, image: pPerfumeU, rating: 4.5, reviews: 39, brand: "Khadlaj", stock: 40, tags: ["unisex"] },
  { id: "perf-frv-01", title: "فرنش أفينيو إيليت", subtitle: "رجالي • 100 مل", category: "perfumes", price: 429, image: pPerfumeM, rating: 5, reviews: 76, brand: "French Avenue", stock: 20, tags: ["mens"] },
  { id: "perf-amg-01", title: "أحمد المغربي نوار", subtitle: "نيش • 100 مل", category: "perfumes", price: 599, image: pPerfumeU, rating: 5, reviews: 112, badge: { label: "نيش", tone: "gold" }, brand: "Ahmed Al Maghribi", stock: 12, tags: ["niche", "unisex"] },
  { id: "perf-reef-01", title: "ريف عود رويال", subtitle: "رجالي • 80 مل", category: "perfumes", price: 489, image: pPerfumeM, rating: 4.5, reviews: 58, brand: "Reef", stock: 18, tags: ["mens", "oud"] },
  { id: "perf-har-01", title: "دار الحرمين أمواج", subtitle: "يونيسكس • 100 مل", category: "perfumes", price: 459, image: pPerfumeU, rating: 5, reviews: 72, brand: "Al Haramain", stock: 30, tags: ["unisex"] },

  // ─── Watches ─── Luxury brands
  { id: "wat-rolex-01", title: "Rolex Datejust 41", subtitle: "126334 • Oystersteel", category: "watches", price: 41500, image: pWatch, rating: 5, reviews: 142, badge: { label: "Rolex", tone: "gold" }, brand: "Rolex", stock: 4, tags: ["mens"], description: "ساعة Datejust الكلاسيكية بإطار مضلع من الذهب الأبيض، مينا أزرق وحركة Calibre 3235 الأوتوماتيكية." },
  { id: "wat-rolex-02", title: "Rolex Submariner Date", subtitle: "126610LV • أخضر", category: "watches", price: 44900, image: pWatch, rating: 5, reviews: 178, brand: "Rolex", stock: 2 },
  { id: "wat-rolex-03", title: "Rolex GMT-Master II", subtitle: "126710BLNR • Batman", category: "watches", price: 53900, image: pWatch, rating: 4.5, reviews: 156, brand: "Rolex", stock: 1 },
  { id: "wat-rolex-04", title: "Rolex Day-Date 40", subtitle: "228238 • Yellow Gold", category: "watches", price: 89900, image: pWatch, rating: 5, reviews: 96, brand: "Rolex", stock: 2 },
  { id: "wat-rolex-05", title: "Rolex Yacht-Master 42", subtitle: "226659 • White Gold", category: "watches", price: 42900, image: pWatch, rating: 4.5, reviews: 113, brand: "Rolex", stock: 3 },
  { id: "wat-rolex-06", title: "Rolex Explorer II", subtitle: "226570 • أبيض", category: "watches", price: 38900, image: pWatch, rating: 4, reviews: 78, brand: "Rolex", stock: 4 },
  { id: "wat-patek-01", title: "Patek Philippe Nautilus", subtitle: "5711/1A • أزرق", category: "watches", price: 195000, image: pWatch, rating: 5, reviews: 42, badge: { label: "حصري", tone: "gold" }, brand: "Patek Philippe", stock: 1 },
  { id: "wat-patek-02", title: "Patek Philippe Calatrava", subtitle: "6119G • روز جولد", category: "watches", price: 89500, image: pWatch, rating: 5, reviews: 24, brand: "Patek Philippe", stock: 1 },
  { id: "wat-ap-01", title: "Audemars Piguet Royal Oak 41", subtitle: "15500ST • أزرق", category: "watches", price: 142000, image: pWatch, rating: 5, reviews: 88, brand: "Audemars Piguet", stock: 1 },
  { id: "wat-hub-01", title: "Hublot Big Bang Unico", subtitle: "King Gold 42mm", category: "watches", price: 79000, image: pWatch, rating: 4.5, reviews: 36, brand: "Hublot", stock: 2 },
  { id: "wat-car-01", title: "Cartier Santos", subtitle: "Medium • Steel", category: "watches", price: 32500, image: pWatch, rating: 5, reviews: 64, brand: "Cartier", stock: 3 },
  { id: "wat-omega-01", title: "Omega Speedmaster Moonwatch", subtitle: "Professional 42mm", category: "watches", price: 27900, image: pWatch, rating: 5, reviews: 142, badge: { label: "Moon", tone: "gold" }, brand: "Omega", stock: 5 },
  { id: "wat-tag-01", title: "TAG Heuer Carrera Chronograph", subtitle: "44mm • أسود", category: "watches", price: 21500, image: pWatch, rating: 4.5, reviews: 92, brand: "TAG Heuer", stock: 4 },
  { id: "wat-long-01", title: "Longines Master Collection", subtitle: "40mm • أبيض", category: "watches", price: 11900, image: pWatch, rating: 4.5, reviews: 56, brand: "Longines", stock: 6 },
  { id: "wat-tis-01", title: "Tissot PRX Powermatic 80", subtitle: "40mm • Blue", category: "watches", price: 4900, image: pWatch, rating: 4.5, reviews: 184, brand: "Tissot", stock: 12 },
  { id: "wat-seik-01", title: "Seiko Prospex Diver", subtitle: "200m Automatic", category: "watches", price: 3500, image: pWatch, rating: 4.5, reviews: 92, brand: "Seiko", stock: 15 },
  { id: "wat-cas-01", title: "Casio G-Shock GA-2100", subtitle: "CasiOak", category: "watches", price: 590, image: pWatch, rating: 4.5, reviews: 312, brand: "Casio", stock: 50 },
  { id: "wat-ver-01", title: "Versace Greca Logo", subtitle: "45mm • Gold Tone", category: "watches", price: 8900, image: pWatch, rating: 4, reviews: 28, brand: "Versace", stock: 5 },
  { id: "wat-rm-01", title: "Richard Mille RM 11-03", subtitle: "Flyback Chronograph", category: "watches", price: 850000, image: pWatch, rating: 5, reviews: 12, badge: { label: "إستثنائي", tone: "red" }, brand: "Richard Mille", stock: 1 },

  // ─── Gifts (packages) ───
  { id: "gift-faith", title: "باكج الإيمان", subtitle: "مصحف • مسبحة • عطر", category: "gifts", price: 299, image: pGift, rating: 5, reviews: 75, badge: { label: "الأفضل مبيعاً", tone: "gold" }, stock: 50, tags: ["religious"] },
  { id: "gift-royal", title: "باكج العطر الملكي", subtitle: "عطر + بخور + محفظة", category: "gifts", price: 399, image: pGift, rating: 4.5, reviews: 96, badge: { label: "جديد", tone: "emerald" }, stock: 30, tags: ["unisex"] },
  { id: "gift-luxe", title: "باكج الفخامة", subtitle: "ساعة + عطر + إكسسوارات", category: "gifts", price: 499, image: pGift, rating: 5, reviews: 128, badge: { label: "الأكثر طلباً", tone: "gold" }, stock: 25, tags: ["mens"] },
  { id: "gift-gent", title: "باكج الرجل الأنيق", subtitle: "ساعة • محفظة • قلم", category: "gifts", price: 449, image: pGift, rating: 4.5, reviews: 53, badge: { label: "هدية مثالية", tone: "gold" }, stock: 30, tags: ["mens"] },
  { id: "gift-elegance", title: "باكج الأناقة", subtitle: "عطر • إكسسوارات • وردة", category: "gifts", price: 349, image: pGift, rating: 4.5, reviews: 41, stock: 35, tags: ["womens"] },
  { id: "gift-love", title: "باكج ورد مع دمية", subtitle: "وردة • دمية • شوكولاتة", category: "gifts", price: 159, oldPrice: 199, image: pGift, rating: 4, reviews: 38, badge: { label: "خصم 20%", tone: "red" }, stock: 40, tags: ["love"] },
  { id: "gift-grad", title: "باكج التخرج", subtitle: "ساعة • قلم • محفظة", category: "gifts", price: 379, image: pGift, rating: 4.5, reviews: 34, stock: 25, tags: ["graduation"] },
  { id: "gift-baby", title: "باكج المواليد", subtitle: "بطانية • لعبة • هدية", category: "gifts", price: 219, image: pGift, rating: 5, reviews: 27, stock: 30, tags: ["baby"] },

  // ─── Fashion ───
  { id: "fas-bag-01", title: "حقيبة جلد كلاسيك", subtitle: "جلد طبيعي 100%", category: "fashion", price: 649, image: pBag, rating: 4.5, reviews: 88, brand: "Hendawi Leather", stock: 14 },
  { id: "fas-bag-02", title: "حقيبة كروس بودي", subtitle: "نسائية • جلد طبيعي", category: "fashion", price: 549, image: pBag, rating: 5, reviews: 71, stock: 18 },
  { id: "fas-wal-01", title: "محفظة جلد إيطالي", subtitle: "محفظة رجالية", category: "fashion", price: 249, image: pBag, rating: 5, reviews: 64, badge: { label: "جديد", tone: "emerald" }, stock: 40 },
  { id: "fas-belt-01", title: "حزام رجالي فاخر", subtitle: "جلد إيطالي", category: "fashion", price: 199, image: pBag, rating: 4.5, reviews: 52, stock: 60 },
  { id: "fas-sun-01", title: "نظارة شمسية بنية", subtitle: "حماية UV400", category: "fashion", price: 379, image: pBag, rating: 4, reviews: 38, stock: 22 },
  { id: "fas-sun-02", title: "نظارة Aviator كلاسيك", subtitle: "ذهبية", category: "fashion", price: 329, image: pBag, rating: 4.5, reviews: 44, stock: 28 },

  // ─── Electronics ───
  { id: "elec-pb-01", title: "Anker PowerCore 20000mAh", subtitle: "شحن سريع PD 65W", category: "electronics", price: 349, oldPrice: 429, image: pElec, rating: 4.5, reviews: 132, badge: { label: "خصم 20%", tone: "red" }, brand: "Anker", stock: 80, description: "بطارية محمولة بسعة 20000 mAh مع شحن سريع PD 65W، يدعم الشحن المتزامن لجهازين." },
  { id: "elec-mag-01", title: "شاحن MagSafe لاسلكي", subtitle: "15W • أصلي", category: "electronics", price: 199, image: pElec, rating: 4.5, reviews: 76, brand: "Apple", stock: 50 },
  { id: "elec-ps5-01", title: "يد تحكم PS5 DualSense", subtitle: "أصلية • أبيض", category: "electronics", price: 449, image: pElec, rating: 5, reviews: 198, badge: { label: "PS5", tone: "gold" }, brand: "Sony", stock: 25 },
  { id: "elec-ps5-02", title: "PlayStation 5 Slim", subtitle: "1TB • Disc Edition", category: "electronics", price: 2899, image: pElec, rating: 5, reviews: 142, badge: { label: "متوفر", tone: "emerald" }, brand: "Sony", stock: 8 },
  { id: "elec-aud-01", title: "AirPods Pro 2", subtitle: "إلغاء ضوضاء نشط", category: "electronics", price: 999, image: pElec, rating: 4.5, reviews: 265, brand: "Apple", stock: 35 },
  { id: "elec-cab-01", title: "كيبل USB-C 100W", subtitle: "2 متر • نايلون", category: "electronics", price: 89, image: pElec, rating: 4.5, reviews: 410, brand: "Anker", stock: 200 },
  { id: "elec-watch-01", title: "Apple Watch Series 10", subtitle: "GPS • 46mm", category: "electronics", price: 1899, image: pElec, rating: 5, reviews: 88, brand: "Apple", stock: 22 },

  // ─── Books ─── Accounting library
  { id: "book-fa-01", title: "التحليل المالي للقوائم المالية", subtitle: "PDF + ورقي", category: "books", price: 49, image: heroBooks, rating: 4.5, reviews: 32, stock: 100, tags: ["financial"] },
  { id: "book-ifrs-01", title: "المحاسبة المالية المتقدمة طبقاً لمعايير IFRS", subtitle: "PDF + ورقي", category: "books", price: 69, image: heroBooks, rating: 5, reviews: 88, badge: { label: "الأكثر مبيعاً", tone: "gold" }, stock: 50, tags: ["ifrs"] },
  { id: "book-aud-01", title: "المراجعة والرقابة الداخلية", subtitle: "PDF + ورقي", category: "books", price: 59, image: heroBooks, rating: 4.5, reviews: 41, stock: 60, tags: ["audit"] },
  { id: "book-mgmt-01", title: "المحاسبة الإدارية", subtitle: "PDF + ورقي", category: "books", price: 49, image: heroBooks, rating: 4.5, reviews: 35, stock: 70, tags: ["managerial"] },
  { id: "book-tax-01", title: "الضرائب والزكاة في السعودية", subtitle: "PDF + ورقي", category: "books", price: 39, image: heroBooks, rating: 5, reviews: 56, badge: { label: "جديد", tone: "emerald" }, stock: 80, tags: ["tax"] },
  { id: "book-cost-01", title: "محاسبة التكاليف", subtitle: "PDF + ورقي", category: "books", price: 45, image: heroBooks, rating: 4.5, reviews: 28, stock: 60, tags: ["managerial"] },
  { id: "book-erp-01", title: "نظم المعلومات المحاسبية وERP", subtitle: "PDF + ورقي", category: "books", price: 65, image: heroBooks, rating: 4.5, reviews: 22, stock: 40, tags: ["systems"] },
];

const PRODUCTS_COL = "products";

export function formatPrice(p: number, currency = "ر.س"): string {
  return `${p.toLocaleString("ar-EG")} ${currency}`;
}

/** Fetch all products from Firestore; falls back to SEED_PRODUCTS if empty/unavailable. */
export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const snap = await getDocs(collection(db, PRODUCTS_COL));
    if (snap.empty) return SEED_PRODUCTS;
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Product, "id">) }));
  } catch {
    return SEED_PRODUCTS;
  }
}

export async function fetchProductsByCategory(category: Category): Promise<Product[]> {
  try {
    const q = query(collection(db, PRODUCTS_COL), where("category", "==", category));
    const snap = await getDocs(q);
    if (snap.empty) return SEED_PRODUCTS.filter((p) => p.category === category);
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Product, "id">) }));
  } catch {
    return SEED_PRODUCTS.filter((p) => p.category === category);
  }
}

export async function fetchProduct(id: string): Promise<Product | null> {
  try {
    const snap = await getDoc(doc(db, PRODUCTS_COL, id));
    if (snap.exists()) return { id: snap.id, ...(snap.data() as Omit<Product, "id">) };
  } catch {
    /* fallthrough */
  }
  return SEED_PRODUCTS.find((p) => p.id === id) || null;
}

/** Push all seed products to Firestore. Admin-only. */
export async function seedProducts(): Promise<number> {
  let count = 0;
  for (const p of SEED_PRODUCTS) {
    const { id, ...rest } = p;
    await setDoc(doc(db, PRODUCTS_COL, id), { ...rest, createdAt: serverTimestamp() });
    count++;
  }
  return count;
}

export async function createProduct(p: Product): Promise<void> {
  const { id, ...rest } = p;
  await setDoc(doc(db, PRODUCTS_COL, id), { ...rest, createdAt: serverTimestamp() });
}

export async function updateProduct(id: string, data: Partial<Omit<Product, "id">>): Promise<void> {
  await updateDoc(doc(db, PRODUCTS_COL, id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, PRODUCTS_COL, id));
}

// Orders
export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}
export interface Order {
  id: string;
  userId: string;
  userEmail?: string | null;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress?: { name?: string; phone?: string; address?: string; city?: string; country?: string };
  createdAt?: { seconds: number; nanoseconds: number } | null;
}

const ORDERS_COL = "orders";

export async function fetchAllOrders(): Promise<Order[]> {
  try {
    const snap = await getDocs(collection(db, ORDERS_COL));
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Order, "id">) }));
  } catch {
    return [];
  }
}

export async function updateOrderStatus(id: string, status: Order["status"]): Promise<void> {
  await updateDoc(doc(db, ORDERS_COL, id), { status, updatedAt: serverTimestamp() });
}
