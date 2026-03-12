import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNews } from "@/hooks/useNews";
import { useHomeSections } from "@/hooks/useHomeSections";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight } from "lucide-react";

const NewsSection = () => {
  const { data: news, isLoading } = useNews(3);
  const { data: sections } = useHomeSections();
  const newsContent = sections?.news;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "dd 'de' MMMM, yyyy", { locale: ptBR });
    } catch {
      return "";
    }
  };

  return (
    <section className="py-20 bg-surface">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <h2 className="section-title">
              {newsContent?.title || "Últimas Postagens"}
            </h2>
            <p className="section-subtitle mt-2">
              {newsContent?.subtitle || "Fique por dentro do nosso Blog!"}
            </p>
          </div>
          <Button className="btn-outline h-12 px-6 gap-2 shrink-0" asChild>
            <Link to="/noticias">
              Todos conteúdos <ArrowRight size={16} />
            </Link>
          </Button>
        </motion.div>

        {/* News grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-muted" />
                <div className="p-6">
                  <div className="h-4 bg-muted rounded w-1/3 mb-3" />
                  <div className="h-5 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-full" />
                </div>
              </div>
            ))
          ) : (
            news?.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/noticias/${item.slug}`}
                  className="group block bg-card rounded-2xl overflow-hidden card-shadow border border-border/50 hover:border-primary/30 transition-all h-full"
                >
                  {/* Image */}
                  <div className="h-48 overflow-hidden bg-muted">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-purple flex items-center justify-center">
                        <span className="text-primary-foreground/40 font-bold text-2xl font-heading">BLOG</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <p className="text-xs text-accent font-semibold mb-2">
                      {formatDate(item.published_at)}
                    </p>
                    <h4 className="font-bold text-heading text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors font-heading">
                      {item.title}
                    </h4>
                    <p className="text-body-text text-sm line-clamp-2">
                      {item.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
