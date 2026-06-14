import { useEffect, useState } from "react";
import { getPromotion, type PromotionResponse } from "@/lib/api";

interface UsePromotionResult {
  data: PromotionResponse | null;
  isLoading: boolean;
  error: boolean;
}

export function usePromotion(tag: string): UsePromotionResult {
  const [data, setData] = useState<PromotionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    setIsLoading(true);
    setError(false);

    getPromotion(tag)
      .then((result) => {
        if (!active) return;
        if (result) {
          setData(result);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [tag]);

  return { data, isLoading, error };
}
