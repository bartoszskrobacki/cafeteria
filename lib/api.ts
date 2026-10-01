const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Meal {
  id?: string;
  name: string;
  description?: string;
  additionals?: string;
  price: number;
}

export interface Promotion {
  id: string;
  tag: string;
  name: string;
  meals: Meal[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PromotionResponse {
  promotion: Promotion;
  image: string;
}

export async function getPromotion(tag: string): Promise<PromotionResponse | null> {
  if (!API_URL) return null;

  try {
    const res = await fetch(`${API_URL}/promotion/${tag}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export interface MenuItem {
  id: number;
  name: string;
  description?: string | null;
  price: number | string;
  position: number;
}

export interface MenuCategory {
  id: number;
  name: string;
  description?: string | null;
  position: number;
  items: MenuItem[];
}

export interface Menu {
  id: number;
  tag: string;
  categories: MenuCategory[];
}

export async function getMenu(tag: string): Promise<Menu | null> {
  if (!API_URL) {
    // Missing config must not break the static build
    console.warn("[api] Brak NEXT_PUBLIC_API_URL — pomijam menu.");
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/menu/${tag}`);
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("[api] Nie udało się pobrać menu:", error);
    return null;
  }
}
