import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  slug: string;
  content: string | null;
  order_index: number | null;
}

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("order_index", { ascending: true });
      
      if (error) throw error;
      return data as Service[];
    },
  });
};
