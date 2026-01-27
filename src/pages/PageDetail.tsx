import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const PageDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  
  // For fixed routes like /institucional, /abrir-empresa, /trocar-de-contador
  // extract slug from pathname if no param is available
  const pageSlug = slug || location.pathname.replace("/", "");

  const { data: page, isLoading } = useQuery({
    queryKey: ["page", pageSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .eq("slug", pageSlug)
        .eq("is_published", true)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!pageSlug,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!page) {
    return (
      <Layout>
        <div className="container-custom section-padding text-center">
          <h1 className="text-3xl font-bold text-heading mb-4">
            Página não encontrada
          </h1>
          <p className="text-body-text">
            A página que você procura não existe ou foi removida.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-surface py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-heading mb-4">
              {page.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-4xl mx-auto"
            dangerouslySetInnerHTML={{ __html: page.content || "" }}
          />
        </div>
      </section>
    </Layout>
  );
};

export default PageDetail;
