import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useServices } from "@/hooks/useServices";
import { ClipboardCheck, Calculator, TrendingUp, Users, ArrowRight, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "clipboard-check": ClipboardCheck,
  calculator: Calculator,
  "trending-up": TrendingUp,
  users: Users,
};

const ServicesSection = () => {
  const { data: services, isLoading } = useServices();

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge-primary mb-4">Conheça nossas soluções</span>
          <h2 className="section-title">
            Uma solução sob medida para o seu negócio!
          </h2>
          <p className="section-subtitle mx-auto">
            Descomplicamos a vida da sua empresa e a sua. Somos uma empresa de contabilidade que chegou para descomplicar sua vida e economizar seu tempo e dinheiro.
          </p>
          <Button className="btn-primary mt-6" asChild>
            <a
              href={`https://wa.me/5500900000000?text=${encodeURIComponent("Olá, Quero saber mais sobre suas soluções!")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Conheça nossas soluções
            </a>
          </Button>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-surface rounded-2xl p-6 animate-pulse">
                <div className="w-14 h-14 bg-muted rounded-xl mb-4" />
                <div className="h-6 bg-muted rounded mb-2 w-2/3" />
                <div className="h-4 bg-muted rounded w-full" />
              </div>
            ))
          ) : (
            services?.map((service, index) => {
              const IconComponent = iconMap[service.icon || "clipboard-check"] || ClipboardCheck;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={`/servicos/${service.slug}`}
                    className="block bg-surface hover:bg-background p-6 rounded-2xl card-shadow hover:shadow-card-hover transition-all duration-300 group h-full"
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                      <IconComponent size={28} className="text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-heading mb-2">{service.title}</h3>
                    <p className="text-body-text text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                      Saiba mais <ArrowRight size={16} />
                    </span>
                  </Link>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
