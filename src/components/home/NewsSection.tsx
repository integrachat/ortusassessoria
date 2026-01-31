import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNews } from "@/hooks/useNews";
import { useHomeSections } from "@/hooks/useHomeSections";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronRight, FileText } from "lucide-react";

const NewsSection = () => {
  const { data: news, isLoading } = useNews(4);
  const { data: sections } = useHomeSections();
  const newsContent = sections?.news;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return { day: "", month: "" };
    try {
      const date = new Date(dateString);
      return {
        day: format(date, "dd", { locale: ptBR }),
        month: format(date, "MM", { locale: ptBR }),
      };
    } catch {
      return { day: "", month: "" };
    }
  };

  return (
    <section className="py-20 bg-gradient-mint relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute -left-20 bottom-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-3xl" />
      
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-primary mb-6">
              {newsContent?.badge || "Fique sempre atualizado"}
            </span>
            
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
              {newsContent?.title || "Notícias Empresariais"}
            </h2>
            
            <h3 className="text-xl font-semibold text-heading/80 mb-6">
              {newsContent?.subtitle || "Atualize-se com os principais acontecimentos do mundo contábil!"}
            </h3>
            
            <p className="text-body-text mb-8 leading-relaxed">
              {newsContent?.description || "Acompanhe em nosso site as últimas e principais notícias sobre contabilidade e negócios. Entrevistas, análises, destaques, opiniões e muito mais."}
            </p>

            {/* Image preview */}
            {newsContent?.image_url && (
              <div className="mb-8 rounded-2xl overflow-hidden shadow-lg max-w-[300px]">
                <img
                  src={newsContent.image_url}
                  alt="Notícias"
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            <Button className="btn-primary h-12 px-6 gap-2" asChild>
              <Link to="/noticias">
                Veja mais notícias
                <ChevronRight size={18} />
              </Link>
            </Button>
          </motion.div>

          {/* News cards */}
          <div className="space-y-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-4 animate-pulse flex gap-4">
                  <div className="w-16 h-16 bg-muted rounded-lg" />
                  <div className="flex-1">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-3 bg-muted rounded w-full" />
                  </div>
                </div>
              ))
            ) : (
              news?.map((item, index) => {
                const dateInfo = formatDate(item.published_at);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      to={`/noticias/${item.slug}`}
                      className="group flex gap-4 bg-white rounded-xl p-4 card-shadow hover:shadow-lg transition-all"
                    >
                      {/* Date badge */}
                      <div className="w-14 h-14 bg-primary rounded-lg flex flex-col items-center justify-center text-white flex-shrink-0">
                        <span className="text-lg font-bold leading-none">{dateInfo.day}</span>
                        <span className="text-xs opacity-80">{dateInfo.month}</span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-heading text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-body-text text-xs line-clamp-2">
                          {item.excerpt}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
