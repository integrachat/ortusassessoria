import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useHomeSections } from "@/hooks/useHomeSections";
import { motion } from "framer-motion";
import { ArrowRight, Building2, RefreshCw } from "lucide-react";

const HeroSection = () => {
  const { data: sections } = useHomeSections();
  const hero = sections?.hero;

  return (
    <section className="bg-surface relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px] py-16 lg:py-24">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-primary mb-6">
              {hero?.badge || "Escolha nosso escritório"}
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading leading-tight mb-6">
              {hero?.title || "Descomplicamos a vida da sua empresa."}
            </h1>
            
            <p className="text-lg text-body-text mb-8 max-w-xl leading-relaxed">
              {hero?.subtitle || "Conquiste e fidelize seus clientes com estratégias inteligentes, em uma época em que a confiança está em primeiro lugar. Encontre tudo o que precisa em um escritório de Contabilidade!"}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button className="btn-primary gap-2 h-12 px-6" asChild>
                <Link to="/abrir-empresa">
                  <Building2 size={18} />
                  {hero?.button1_text || "Abrir empresa"}
                </Link>
              </Button>
              <Button variant="outline" className="gap-2 h-12 px-6" asChild>
                <Link to="/trocar-de-contador">
                  <RefreshCw size={18} />
                  {hero?.button2_text || "Trocar de contador"}
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:justify-self-end"
          >
            <div className="relative">
              {/* Main circle with image placeholder or actual image */}
              <div className="w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] rounded-full bg-primary/10 mx-auto relative overflow-hidden">
                {hero?.image_url ? (
                  <img
                    src={hero.image_url}
                    alt="Contabilidade Digital"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <div className="text-center">
                      <Building2 size={80} className="text-primary mx-auto mb-4 opacity-50" />
                      <p className="text-primary/70 font-medium">Contabilidade Digital</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Decorative circles */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary rounded-full opacity-20" />
              <div className="absolute -bottom-2 -right-2 w-24 h-24 border-4 border-primary/30 rounded-full" />
              <div className="absolute top-1/2 -right-8 w-8 h-8 bg-accent rounded-full animate-float" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
