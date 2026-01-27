import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order_index: number | null;
}

export const useFaq = () => {
  return useQuery({
    queryKey: ["faq"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("faq")
        .select("*")
        .order("order_index", { ascending: true });
      
      if (error) throw error;
      return data as FaqItem[];
    },
  });
};
