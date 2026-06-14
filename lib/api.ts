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
