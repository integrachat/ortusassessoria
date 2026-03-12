import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useHomeSections } from "@/hooks/useHomeSections";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  const { data: sections } = useHomeSections();
  const { data: config } = useSiteConfig();
  const cta = sections?.cta;
  const whatsappNumber = config?.whatsapp || "5500900000000";

  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-primary/90" />
      <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute -left-32 -bottom-32 w-96 h-96 rounded-full bg-primary-foreground/5 blur-3xl" />
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary-foreground/70 text-sm font-medium mb-4 uppercase tracking-wider">
              Garantia de satisfação
            </p>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 font-heading leading-tight">
              {cta?.title || "Se em 30 dias você não ficar satisfeito, nós devolvemos sua mensalidade"}
            </h2>
            
            <p className="text-primary-foreground/80 text-lg mb-10 leading-relaxed">
              {cta?.description || "Conte conosco para superar suas expectativas e impulsionar o sucesso do seu negócio."}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-accent text-accent-foreground hover:opacity-90 h-14 px-8 rounded-full font-semibold text-base shadow-lg gap-2" asChild>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Gostaria de mais informações.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={20} />
                  Fale com um especialista
                </a>
              </Button>
              <Button className="bg-primary-foreground/10 text-primary-foreground border-2 border-primary-foreground/30 hover:bg-primary-foreground/20 h-14 px-8 rounded-full font-semibold text-base" asChild>
                <Link to="/servicos">
                  Conheça nossos serviços
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
