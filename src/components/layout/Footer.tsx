import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { useServices } from "@/hooks/useServices";

const Footer = () => {
  const { data: config } = useSiteConfig();
  const { data: services } = useServices();

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Quem Somos", href: "/institucional" },
    { label: "Contato", href: "/contato" },
    { label: "Notícias", href: "/noticias" },
  ];

  // Get first 5 services for column 2
  const servicesColumn1 = services?.slice(0, 5) || [];
  // Get next 5 services for column 3
  const servicesColumn2 = services?.slice(5, 10) || [];

  return (
    <footer className="bg-primary text-white">
      {/* Main footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column 1 */}
          <div>
            <h4 className="font-bold text-lg mb-6">Serviços</h4>
            <ul className="space-y-3">
              {servicesColumn1.map((service) => (
                <li key={service.id}>
                  <Link 
                    to={`/servicos/${service.slug}`}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column 2 */}
          {servicesColumn2.length > 0 && (
            <div>
              <h4 className="font-bold text-lg mb-6 invisible">Mais Serviços</h4>
              <ul className="space-y-3">
                {servicesColumn2.map((service) => (
                  <li key={service.id}>
                    <Link 
                      to={`/servicos/${service.slug}`}
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-white/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm">{config?.phone || "(00) 0000-0000"}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-white/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm">{config?.email || "contato@empresa.com"}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-white/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm">{config?.address || "Seu endereço aqui"}</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Redes Sociais</h4>
            <div className="flex gap-3">
              <a
                href={config?.facebook_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href={config?.instagram_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href={config?.youtube_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
            <p>
              Desenvolvido por{" "}
              <a 
                href="https://hubcarioca.com.br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:underline transition-colors"
              >
                HUB CARIOCA
              </a>
            </p>
            <div className="flex gap-6">
              <Link to="/politica-privacidade" className="hover:text-white transition-colors">
                Política de Privacidade
              </Link>
              <Link to="/termos-uso" className="hover:text-white transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* WhatsApp floating button */}
      <a
        href={`https://wa.me/${config?.whatsapp || "5500900000000"}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors z-50"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-white fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </footer>
  );
};

export default Footer;
