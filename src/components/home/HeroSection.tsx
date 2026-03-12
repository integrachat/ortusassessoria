import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useHomeSections } from "@/hooks/useHomeSections";
import { motion } from "framer-motion";
import { Building2, RefreshCw, Shield, Zap, Lock, Handshake, ChevronDown } from "lucide-react";

const HeroSection = () => {
  const { data: sections } = useHomeSections();
  const hero = sections?.hero;

  const highlights = [
    { icon: Lock, text: "Solução contábil econômica e segura" },
    { icon: Zap, text: "Atendimento rápido e especializado" },
    { icon: Shield, text: "Seu negócio totalmente resguardado" },
    { icon: Handshake, text: "Parceria e confiança" },
  ];

  return (
    <section className="relative overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      
      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px] py-16 lg:py-20">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <span className="badge-primary mb-4 text-accent font-semibold">
              {hero?.badge || "Seja nosso cliente!"}
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] mb-6 font-heading">
              <span className="text-primary">
                {hero?.title?.split(' ').slice(0, 3).join(' ') || "Descomplicamos a vida"}
              </span>{' '}
              <span className="text-accent">
                {hero?.title?.split(' ').slice(3).join(' ') || "da sua empresa."}
              </span>
            </h1>
            
            <p className="text-base text-body-text mb-8 leading-relaxed max-w-lg">
              {hero?.subtitle || "Conquiste e fidelize seus clientes com estratégias inteligentes. Encontre tudo o que precisa em um escritório de Contabilidade!"}
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Button className="btn-primary gap-2 h-13 px-8 text-base shadow-lg" asChild>
                <Link to="/abrir-empresa">
                  {hero?.button1_text || "Abra sua empresa"}
                </Link>
              </Button>
              <Button className="btn-outline gap-2 h-13 px-6 text-base" asChild>
                <Link to="/trocar-de-contador">
                  <RefreshCw size={18} />
                  {hero?.button2_text || "Troque de contador"}
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {hero?.image_url ? (
                <img
                  src={hero.image_url}
                  alt="Contabilidade Digital"
                  className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
                />
              ) : (
                <div className="w-full h-[500px] bg-gradient-hero rounded-3xl flex items-center justify-center shadow-2xl">
                  <Building2 size={100} className="text-primary-foreground/30" />
                </div>
              )}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-3xl" />
            </div>
          </motion.div>
        </div>

        {/* Feature cards overlapping */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 -mt-8 relative z-10 pb-8"
        >
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 card-shadow text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon size={24} className="text-primary" />
                </div>
                <p className="text-sm font-semibold text-heading">{item.text}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Scroll indicator */}
        <div className="flex justify-center pb-8">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown size={32} className="text-primary/40" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
