import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNews } from "@/hooks/useNews";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const NewsSection = () => {
  const { data: news, isLoading } = useNews(4);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return format(date, "dd MMM", { locale: ptBR });
    } catch {
      return "";
    }
  };

  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge-primary mb-4">Fique sempre atualizado</span>
          <h2 className="section-title">Notícias Empresariais</h2>
          <p className="section-subtitle mx-auto">
            Atualize-se com os principais acontecimentos do mundo contábil! Acompanhe em nosso site as últimas e principais notícias sobre contabilidade e negócios.
          </p>
          <Button variant="outline" className="mt-6" asChild>
            <Link to="/noticias">
              Veja mais notícias <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-background rounded-2xl overflow-hidden animate-pulse">
                <div className="h-32 bg-muted" />
                <div className="p-5">
                  <div className="h-4 bg-muted rounded w-1/3 mb-3" />
                  <div className="h-5 bg-muted rounded w-full mb-2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
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
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={`/noticias/${item.slug}`}
                  className="block bg-background rounded-2xl overflow-hidden card-shadow hover:shadow-card-hover transition-all duration-300 group h-full"
                >
                  {/* Date badge */}
                  <div className="bg-primary text-primary-foreground p-4 text-center">
                    <div className="text-2xl font-bold leading-none">
                      {formatDate(item.published_at).split(" ")[0]}
                    </div>
                    <div className="text-sm uppercase opacity-80">
                      {formatDate(item.published_at).split(" ")[1]}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-bold text-heading mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
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
