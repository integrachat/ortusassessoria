import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Settings } from "lucide-react";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { data: config } = useSiteConfig();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/servicos", label: "SERVIÇOS", hasDropdown: true },
    { href: "/noticias", label: "CONTEÚDOS" },
    { href: "/institucional", label: "SOBRE" },
    { href: "/contato", label: "CONTATO" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-background"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            {config?.logo_url ? (
              <img
                src={config.logo_url}
                alt={config?.company_name || "Logo"}
                className="h-12 w-auto object-contain"
              />
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">O</span>
                </div>
                <div>
                  <h1 className="font-bold text-lg text-heading tracking-tight font-heading">
                    ORTUS
                  </h1>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                    ASSESSORIA
                  </p>
                </div>
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-1 ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.label}
                {link.hasDropdown && <ChevronDown size={14} />}
              </Link>
            ))}
          </nav>

          {/* CTA + Admin */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/admin"
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Settings size={18} className="text-muted-foreground" />
            </Link>
            <Link
              to="/contato"
              className="bg-accent text-accent-foreground px-6 py-2.5 rounded-full font-semibold text-sm hover:opacity-90 transition-all"
            >
              CONTRATE
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border"
          >
            <nav className="container-custom py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contato"
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 bg-accent text-accent-foreground py-3 px-4 rounded-full text-sm font-semibold text-center"
              >
                CONTRATE
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
