import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { useHomeSections } from "@/hooks/useHomeSections";

const WhatsappCta = () => {
  const { data: config } = useSiteConfig();
  const { data: sections } = useHomeSections();
  const whatsappCta = sections?.whatsapp_cta;
  const whatsappNumber = config?.whatsapp || "5500900000000";

  return (
    <section className="py-16 bg-primary">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
              {whatsappCta?.title || "Fale conosco agora mesmo!"}
            </h2>
            <p className="text-primary-foreground/80">
              {whatsappCta?.subtitle || "Tire suas dúvidas pelo WhatsApp ou ligue para nós."}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              className="bg-white text-primary hover:bg-white/90 gap-2 h-12 px-6"
            >
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Gostaria de mais informações.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={20} />
                {whatsappCta?.button1_text || "WhatsApp"}
              </a>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white/10 gap-2 h-12 px-6"
            >
              <a href={`tel:${config?.phone || ""}`}>
                <Phone size={20} />
                {whatsappCta?.button2_text || "Ligar agora"}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsappCta;
