import { collection, doc, getDoc, getDocs, query, where, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import pPerfume from "@/assets/product-perfume-1.jpg";
import pWatch from "@/assets/product-watch-1.jpg";
import pGift from "@/assets/product-gift-1.jpg";
import pBag from "@/assets/product-bag-1.jpg";
import pElec from "@/assets/product-electronics-1.jpg";
import heroBooks from "@/assets/hero-books.jpg";

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
  // Perfumes
  { id: "perf-001", title: "عود سوبريم 2077", subtitle: "عطر فاخر • 100 مل", category: "perfumes", price: 499, oldPrice: 599, image: pPerfume, rating: 5, reviews: 128, badge: { label: "الأكثر طلباً", tone: "gold" }, brand: "Lattafa", stock: 25, description: "تركيبة شرقية فاخرة من العود الكمبودي والمسك الأبيض مع لمسات من الورد الطائفي والعنبر. ثبات يمتد لأكثر من 12 ساعة." },
  { id: "perf-002", title: "مسك الإمارات", subtitle: "عطر • 75 مل", category: "perfumes", price: 389, image: pPerfume, rating: 4.5, reviews: 96, brand: "Afnan", stock: 40 },
  { id: "perf-003", title: "عطر الفرسان", subtitle: "عطر رجالي • 100 مل", category: "perfumes", price: 549, image: pPerfume, rating: 5, reviews: 84, badge: { label: "جديد", tone: "emerald" }, brand: "Armaf", stock: 18 },
  { id: "perf-004", title: "بخور لطافة", subtitle: "بخور فاخر • 50 جم", category: "perfumes", price: 199, image: pPerfume, rating: 4.5, reviews: 60, brand: "Lattafa", stock: 100 },
  { id: "perf-005", title: "عطر دار الحرمين", subtitle: "عطر • 100 مل", category: "perfumes", price: 459, image: pPerfume, rating: 5, reviews: 72, brand: "Al Haramain", stock: 30 },
  { id: "perf-006", title: "أفنان الذهبي", subtitle: "عطر • 100 مل", category: "perfumes", price: 329, image: pPerfume, rating: 4.5, reviews: 54, brand: "Afnan", stock: 35 },

  // Watches
  { id: "wat-001", title: "ساعة كلاسيك ذهبية", subtitle: "ساعة رجالية • سويسرية", category: "watches", price: 1899, oldPrice: 2299, image: pWatch, rating: 5, reviews: 142, badge: { label: "الأفضل", tone: "gold" }, brand: "Hendawi", stock: 12, description: "ساعة كلاسيكية بمينا أبيض اللون مع إطار ذهبي 18 قيراط، حركة سويسرية أوتوماتيكية، مقاومة للماء حتى 50م." },
  { id: "wat-002", title: "ساعة الفخامة الفضية", subtitle: "ساعة رجالية", category: "watches", price: 1499, image: pWatch, rating: 4.5, reviews: 96, brand: "Hendawi", stock: 15 },
  { id: "wat-003", title: "ساعة نسائية روز جولد", subtitle: "ساعة نسائية", category: "watches", price: 1299, image: pWatch, rating: 5, reviews: 87, brand: "Hendawi", stock: 20 },
  { id: "wat-004", title: "ساعة سبورت كرونوغراف", subtitle: "ساعة رجالية", category: "watches", price: 2199, image: pWatch, rating: 5, reviews: 113, brand: "Hendawi", stock: 8 },

  // Gifts
  { id: "gift-001", title: "باكج الإيمان", subtitle: "مصحف • مسبحة • عطر", category: "gifts", price: 299, image: pGift, rating: 5, reviews: 75, badge: { label: "الأفضل مبيعاً", tone: "gold" }, stock: 50 },
  { id: "gift-002", title: "باكج الرجل الأنيق", subtitle: "ساعة + محفظة + قلم", category: "gifts", price: 449, image: pGift, rating: 4.5, reviews: 53, badge: { label: "مميزة", tone: "gold" }, stock: 30 },
  { id: "gift-003", title: "باكج العطر الملكي", subtitle: "عطر + بخور + محفظة", category: "gifts", price: 399, image: pGift, rating: 4, reviews: 64, stock: 25 },
  { id: "gift-004", title: "باكج الأناقة", subtitle: "إكسسوارات وعطر", category: "gifts", price: 349, image: pGift, rating: 4.5, reviews: 41, stock: 35 },

  // Fashion
  { id: "fas-001", title: "حقيبة جلد كلاسيك", subtitle: "جلد طبيعي 100%", category: "fashion", price: 649, image: pBag, rating: 4.5, reviews: 88, brand: "Hendawi Leather", stock: 14 },
  { id: "fas-002", title: "محفظة جلد إيطالي", subtitle: "محفظة رجالية", category: "fashion", price: 249, image: pBag, rating: 5, reviews: 64, badge: { label: "جديد", tone: "emerald" }, stock: 40 },
  { id: "fas-003", title: "حزام رجالي فاخر", subtitle: "جلد إيطالي", category: "fashion", price: 199, image: pBag, rating: 4.5, reviews: 52, stock: 60 },
  { id: "fas-004", title: "نظارة شمسية بنية", subtitle: "حماية UV400", category: "fashion", price: 379, image: pBag, rating: 4, reviews: 38, stock: 22 },
  { id: "fas-005", title: "حقيبة كروس بودي", subtitle: "نسائية • جلد طبيعي", category: "fashion", price: 549, image: pBag, rating: 5, reviews: 71, stock: 18 },

  // Electronics
  { id: "elec-001", title: "باور بانك 20000mAh", subtitle: "شحن سريع PD", category: "electronics", price: 349, oldPrice: 429, image: pElec, rating: 4.5, reviews: 132, badge: { label: "خصم 20%", tone: "red" }, brand: "Anker", stock: 80, description: "بطارية محمولة بسعة 20000 mAh مع شحن سريع PD 65W، يدعم الشحن المتزامن لجهازين." },
  { id: "elec-002", title: "شاحن لاسلكي ماجنت", subtitle: "MagSafe 15W", category: "electronics", price: 199, image: pElec, rating: 4.5, reviews: 76, brand: "Apple", stock: 50 },
  { id: "elec-003", title: "يد تحكم PS5", subtitle: "DualSense أصلية", category: "electronics", price: 449, image: pElec, rating: 5, reviews: 98, badge: { label: "PS5", tone: "gold" }, brand: "Sony", stock: 25 },
  { id: "elec-004", title: "سماعات بلوتوث برو", subtitle: "إلغاء ضوضاء نشط", category: "electronics", price: 299, image: pElec, rating: 4.5, reviews: 65, stock: 35 },
  { id: "elec-005", title: "كيبل تايب-سي سريع", subtitle: "100W • 2 متر", category: "electronics", price: 89, image: pElec, rating: 4.5, reviews: 110, stock: 200 },

  // Books
  { id: "book-001", title: "التحليل المالي للقوائم المالية", subtitle: "PDF + ورقي", category: "books", price: 49, image: heroBooks, rating: 4.5, reviews: 32, stock: 100 },
  { id: "book-002", title: "المحاسبة المالية المتقدمة طبقاً لمعايير IFRS", subtitle: "PDF + ورقي", category: "books", price: 69, image: heroBooks, rating: 5, reviews: 88, badge: { label: "الأكثر مبيعاً", tone: "gold" }, stock: 50 },
  { id: "book-003", title: "المراجعة والرقابة الداخلية", subtitle: "PDF + ورقي", category: "books", price: 59, image: heroBooks, rating: 4.5, reviews: 41, stock: 60 },
  { id: "book-004", title: "المحاسبة الإدارية", subtitle: "PDF + ورقي", category: "books", price: 49, image: heroBooks, rating: 4.5, reviews: 35, stock: 70 },
  { id: "book-005", title: "الضرائب والزكاة في السعودية", subtitle: "PDF + ورقي", category: "books", price: 39, image: heroBooks, rating: 5, reviews: 56, badge: { label: "جديد", tone: "emerald" }, stock: 80 },
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
