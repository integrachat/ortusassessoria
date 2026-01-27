import Layout from "@/components/layout/Layout";
import { useServices } from "@/hooks/useServices";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ClipboardCheck, Calculator, TrendingUp, Users, ArrowRight, Loader2, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "clipboard-check": ClipboardCheck,
  calculator: Calculator,
  "trending-up": TrendingUp,
  users: Users,
};

const ServicesPage = () => {
  const { data: services, isLoading } = useServices();

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
            <span className="badge-primary mb-4">Nossos Serviços</span>
            <h1 className="text-4xl md:text-5xl font-bold text-heading mb-4">
              Soluções Contábeis Completas
            </h1>
            <p className="text-lg text-body-text max-w-2xl mx-auto">
              Oferecemos uma gama completa de serviços contábeis para atender todas as necessidades da sua empresa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {services?.map((service, index) => {
                const IconComponent = iconMap[service.icon || "clipboard-check"] || ClipboardCheck;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link
                      to={`/servicos/${service.slug}`}
                      className="block bg-background p-8 rounded-2xl card-shadow hover:shadow-card-hover transition-all duration-300 group h-full"
                    >
                      <div className="flex gap-6">
                        <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                          <IconComponent size={32} className="text-primary group-hover:text-primary-foreground transition-colors" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold text-heading mb-3 group-hover:text-primary transition-colors">
                            {service.title}
                          </h2>
                          <p className="text-body-text mb-4">
                            {service.description}
                          </p>
                          <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                            Saiba mais <ArrowRight size={16} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
