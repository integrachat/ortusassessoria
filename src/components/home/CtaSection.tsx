import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, RefreshCw } from "lucide-react";
import { useHomeSections } from "@/hooks/useHomeSections";

const CtaSection = () => {
  const { data: sections } = useHomeSections();
  const cta = sections?.cta;

  return (
    <section className="py-20 bg-gradient-mint relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-primary/5 blur-2xl" />
      
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative max-w-[350px] mx-auto lg:mx-0">
              {/* Circle decoration top */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-coral rounded-full" />
              
              {/* Main circular image */}
              <div className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full overflow-hidden border-4 border-white shadow-xl mx-auto">
                {cta?.image_url ? (
                  <img
                    src={cta.image_url}
                    alt="Escritório Contábil"
                    className="w-full h-full object-cover grayscale"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <Building2 size={64} className="text-foreground/20" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
              {cta?.title || "Venha para Escritório Contábil"}
            </h2>
            
            <h3 className="text-xl font-semibold text-heading/80 mb-6">
              {cta?.subtitle || "Escolha nosso escritório e dê adeus às preocupações com contabilidade."}
            </h3>
            
            <p className="text-body-text mb-10 leading-relaxed">
              {cta?.description || "Traga já a sua empresa para o nosso escritório e você aproveitará todos os benefícios de uma boa contabilidade. Atenderemos todas as suas necessidades contábeis com muita agilidade, presteza e de forma econômica para sua empresa."}
            </p>

            {/* Action cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Link 
                to="/abrir-empresa"
                className="group flex items-start gap-4 p-5 bg-white rounded-2xl card-shadow hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-heading group-hover:text-primary transition-colors">Abrir Empresa</h4>
                  <p className="text-body-text text-sm mt-1">Como abrir uma empresa? Passo a passo para tirar as ideias do papel</p>
                </div>
              </Link>

              <Link 
                to="/trocar-de-contador"
                className="group flex items-start gap-4 p-5 bg-white rounded-2xl card-shadow hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center flex-shrink-0">
                  <RefreshCw size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-heading group-hover:text-primary transition-colors">Trocar de Contador</h4>
                  <p className="text-body-text text-sm mt-1">Conosco você aproveitará todos os benefícios do melhor escritório de contabilidade.</p>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
