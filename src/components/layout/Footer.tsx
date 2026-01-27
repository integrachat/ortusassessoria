import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { useSiteConfig } from "@/hooks/useSiteConfig";

const Footer = () => {
  const { data: config } = useSiteConfig();

  return (
    <footer className="bg-heading text-white">
      {/* Main footer */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">EC</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">{config?.company_name || "Escritório Contábil"}</h3>
                <p className="text-sm text-white/70">Contabilidade Digital</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Somos um escritório de contabilidade moderno e digital, preparado para atender todas as suas necessidades contábeis.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/institucional" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Institucional
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/noticias" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Informativo
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6">Serviços</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/servicos/assessoria" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Assessoria
                </Link>
              </li>
              <li>
                <Link to="/servicos/contabilidade" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Contabilidade
                </Link>
              </li>
              <li>
                <Link to="/servicos/migrar-mei-me" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Migrar MEI para ME
                </Link>
              </li>
              <li>
                <Link to="/servicos/trabalhista" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Trabalhista
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm">{config?.phone || "(00) 0000-0000"}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm">{config?.email || "contato@empresa.com"}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm">{config?.address || "Rua Exemplo, 123 - Centro"}</span>
              </li>
            </ul>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
            <p>© {new Date().getFullYear()} {config?.company_name || "Escritório Contábil"}. Todos os direitos reservados.</p>
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
    </footer>
  );
};

export default Footer;
