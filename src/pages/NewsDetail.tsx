import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: news, isLoading } = useQuery({
    queryKey: ["news-detail", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      });
    } catch {
      return "";
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!news) {
    return (
      <Layout>
        <div className="container-custom section-padding text-center">
          <h1 className="text-3xl font-bold text-heading mb-4">
            Notícia não encontrada
          </h1>
          <p className="text-body-text mb-8">
            A notícia que você procura não existe ou foi removida.
          </p>
          <Button asChild>
            <Link to="/noticias">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para notícias
            </Link>
          </Button>
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
            className="max-w-4xl mx-auto"
          >
            <Link
              to="/noticias"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors"
            >
              <ArrowLeft size={18} />
              Voltar para notícias
            </Link>

            <div className="flex items-center gap-3 text-muted-foreground mb-4">
              <Calendar size={18} />
              <span>{formatDate(news.published_at)}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading">
              {news.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {news.excerpt && (
              <p className="text-xl text-body-text leading-relaxed mb-8 font-medium">
                {news.excerpt}
              </p>
            )}

            <div className="prose prose-lg max-w-none text-body-text">
              {news.content?.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.article>
        </div>
      </section>
    </Layout>
  );
};

export default NewsDetail;
