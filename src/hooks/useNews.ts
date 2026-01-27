import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  published_at: string | null;
  is_published: boolean | null;
}

export const useNews = (limit?: number) => {
  return useQuery({
    queryKey: ["news", limit],
    queryFn: async () => {
      let query = supabase
        .from("news")
        .select("*")
        .order("published_at", { ascending: false });
      
      if (limit) {
        query = query.limit(limit);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as NewsItem[];
    },
  });
};
