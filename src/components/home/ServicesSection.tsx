import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useServices } from "@/hooks/useServices";
import { useHomeSections } from "@/hooks/useHomeSections";
import { 
  FileText, 
  Calculator, 
  Building2, 
  Users,
  Briefcase,
  ChevronRight,
  LucideIcon 
} from "lucide-react";

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
  const { data: sections } = useHomeSections();

  const displayServices = services?.slice(0, 4) || [];

  return (
    <section className="py-20 bg-gradient-coral relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute right-0 top-0 w-[400px] h-[400px] rounded-full bg-coral/50 blur-3xl" />
      
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
              Conheça nossas soluções
            </span>
            
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4 leading-tight">
              Uma solução sob medida para o seu negócio!
            </h2>
            
            <h3 className="text-xl font-semibold text-heading/80 mb-6">
              Descomplicamos a vida da sua empresa e a sua.
            </h3>
            
            <p className="text-body-text mb-8 leading-relaxed">
              Somos uma empresa de contabilidade que chegou para descomplicar sua vida e economizar seu tempo e dinheiro.
            </p>

            {/* Image */}
            <div className="relative max-w-[300px]">
              <div className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-full overflow-hidden border-4 border-white shadow-xl">
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <Briefcase size={64} className="text-foreground/20" />
                </div>
              </div>
              
              {/* CTA Button overlay */}
              <div className="mt-6">
                <Button className="btn-primary h-12 px-6 gap-2" asChild>
                  <a 
                    href="https://wa.me/5500900000000?text=Olá,%20Quero%20saber%20mais%20sobre%20suas%20soluções!"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Conheça nossas soluções
                    <ChevronRight size={18} />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Services grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {displayServices.map((service, index) => {
              const Icon = iconMap[service.icon || "FileText"] || FileText;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={`/servicos/${service.slug}`}
                    className="group block bg-white rounded-2xl p-6 card-shadow hover:shadow-lg transition-all h-full"
                  >
                    <h4 className="font-bold text-heading mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-body-text text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </Link>
                </motion.div>
              );
            })}

            {/* Fallback if no services */}
            {displayServices.length === 0 && (
              <>
                <div className="bg-white rounded-2xl p-6 card-shadow">
                  <h4 className="font-bold text-heading mb-3">Assessoria</h4>
                  <p className="text-body-text text-sm">Auxílio técnico dentro de nossa área de conhecimentos especializados.</p>
                </div>
                <div className="bg-white rounded-2xl p-6 card-shadow">
                  <h4 className="font-bold text-heading mb-3">Contabilidade</h4>
                  <p className="text-body-text text-sm">Executamos todos os serviços pertinentes referente a rotina contábil.</p>
                </div>
                <div className="bg-white rounded-2xl p-6 card-shadow">
                  <h4 className="font-bold text-heading mb-3">Migrar MEI para ME</h4>
                  <p className="text-body-text text-sm">Oferecemos suporte completo para migrar de MEI para ME.</p>
                </div>
                <div className="bg-white rounded-2xl p-6 card-shadow">
                  <h4 className="font-bold text-heading mb-3">Trabalhista</h4>
                  <p className="text-body-text text-sm">Executamos serviços envolvidos na rotina do departamento pessoal.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
