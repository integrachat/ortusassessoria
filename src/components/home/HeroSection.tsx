import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useHomeSections } from "@/hooks/useHomeSections";
import { motion } from "framer-motion";
import { Building2, RefreshCw } from "lucide-react";

const HeroSection = () => {
  const { data: sections } = useHomeSections();
  const hero = sections?.hero;

  return (
    <section className="relative overflow-hidden min-h-[700px]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Decorative blob shapes */}
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-[40%_60%_60%_40%/60%_40%_60%_40%] bg-gradient-to-br from-primary/10 to-primary/5 blur-sm" />
      <div className="absolute -right-20 -bottom-20 w-[300px] h-[300px] rounded-full bg-coral/30 blur-2xl" />

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[700px] py-16 lg:py-24">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <span className="badge-primary mb-8">
              {hero?.badge || "Escolha nosso escritório"}
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-heading leading-[1.1] mb-6">
              {hero?.title || "Descomplicamos a vida da sua empresa."}
            </h1>
            
            <p className="text-base text-body-text mb-10 leading-relaxed">
              {hero?.subtitle || "Conquiste e fidelize seus clientes com estratégias inteligentes, em uma época em que a confiança está em primeiro lugar. Encontre tudo o que precisa em um escritório de Contabilidade!"}
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Button className="btn-primary gap-2 h-14 px-8 text-base" asChild>
                <Link to="/abrir-empresa">
                  {hero?.button1_text || "Abrir empresa"}
                </Link>
              </Button>
              <Button variant="ghost" className="btn-outline gap-2 h-14 px-6 text-base" asChild>
                <Link to="/trocar-de-contador">
                  <RefreshCw size={18} />
                  {hero?.button2_text || "Trocar de contador"}
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:justify-self-end hidden lg:block"
          >
            <div className="relative">
              {/* Decorative circle accent */}
              <div className="absolute -top-4 right-1/3 w-12 h-12 bg-primary rounded-full z-10" />
              
              {/* Main rounded rectangle container */}
              <div className="w-[400px] h-[500px] rounded-[100px] border-[3px] border-foreground/10 overflow-hidden relative">
                {hero?.image_url ? (
                  <img
                    src={hero.image_url}
                    alt="Contabilidade Digital"
                    className="w-full h-full object-cover grayscale"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    <div className="text-center">
                      <Building2 size={80} className="text-foreground/20 mx-auto mb-4" />
                      <p className="text-foreground/40 font-medium">Sua imagem aqui</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Decorative circle bottom right */}
              <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-foreground rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
