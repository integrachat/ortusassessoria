import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useServices } from "@/hooks/useServices";
import { ArrowRight, LucideIcon, FileText, Calculator, Building2, Users, Briefcase } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  FileText,
  Calculator,
  Building2,
  Users,
  Briefcase,
  "clipboard-check": FileText,
  "calculator": Calculator,
  "trending-up": Briefcase,
  "users": Users,
};

const ServicesSection = () => {
  const { data: services } = useServices();
  const displayServices = services?.slice(0, 6) || [];

  return (
    <section className="py-20 bg-surface">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="section-title">Nossos Serviços</h2>
          <p className="section-subtitle mx-auto mt-4">
            Uma solução sob medida para cada necessidade do seu negócio.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.map((service, index) => {
            const Icon = iconMap[service.icon || "FileText"] || FileText;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Link
                  to={`/servicos/${service.slug}`}
                  className="group block bg-card rounded-2xl p-8 card-shadow h-full border border-border/50 hover:border-primary/30 transition-all"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h4 className="font-bold text-heading text-lg mb-3 font-heading group-hover:text-primary transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-body-text text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
                    Saiba mais <ArrowRight size={16} />
                  </span>
                </Link>
              </motion.div>
            );
          })}

          {displayServices.length === 0 && (
            <>
              {["Assessoria", "Contabilidade", "Migrar MEI para ME", "Trabalhista", "Fiscal", "Societário"].map((title, i) => (
                <div key={i} className="bg-card rounded-2xl p-8 card-shadow border border-border/50">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5">
                    <FileText size={24} className="text-primary" />
                  </div>
                  <h4 className="font-bold text-heading text-lg mb-3 font-heading">{title}</h4>
                  <p className="text-body-text text-sm">Serviço especializado para sua empresa.</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
