import Layout from "@/components/layout/Layout";
import { useNews } from "@/hooks/useNews";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const NewsPage = () => {
  const { data: news, isLoading } = useNews();

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
            <span className="badge-primary mb-4">Informativo</span>
            <h1 className="text-4xl md:text-5xl font-bold text-heading mb-4">
              Notícias Empresariais
            </h1>
            <p className="text-lg text-body-text max-w-2xl mx-auto">
              Acompanhe as últimas notícias sobre contabilidade, tributação e gestão empresarial.
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news?.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={`/noticias/${item.slug}`}
                    className="block bg-background rounded-2xl overflow-hidden card-shadow hover:shadow-card-hover transition-all duration-300 group h-full"
                  >
                    {/* Image or date badge */}
                    <div className="bg-primary h-32 flex items-center justify-center">
                      <div className="text-center text-primary-foreground">
                        <Calendar size={32} className="mx-auto mb-2 opacity-50" />
                        <span className="text-sm">
                          {formatDate(item.published_at)}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h2 className="text-xl font-bold text-heading mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h2>
                      <p className="text-body-text text-sm line-clamp-3">
                        {item.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default NewsPage;
