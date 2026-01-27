import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SiteConfig {
  [key: string]: string;
}

export const useSiteConfig = () => {
  return useQuery({
    queryKey: ["site-config"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_config")
        .select("key, value");
      
      if (error) throw error;
      
      const config: SiteConfig = {};
      data?.forEach((item) => {
        config[item.key] = item.value || "";
      });
      
      return config;
    },
  });
};
