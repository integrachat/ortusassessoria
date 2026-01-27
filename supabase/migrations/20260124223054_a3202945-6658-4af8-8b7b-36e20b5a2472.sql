-- Site Configuration Table
CREATE TABLE public.site_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Services Table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'briefcase',
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- News Table
CREATE TABLE public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- FAQ Table
CREATE TABLE public.faq (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Pages Table (for internal pages)
CREATE TABLE public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Anyone can read site_config" ON public.site_config FOR SELECT USING (true);
CREATE POLICY "Anyone can read active services" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can read published news" ON public.news FOR SELECT USING (is_published = true);
CREATE POLICY "Anyone can read active faq" ON public.faq FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can read published pages" ON public.pages FOR SELECT USING (is_published = true);

-- Admin role enum and user_roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Admin policies for all tables
CREATE POLICY "Admins can manage site_config" ON public.site_config FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage services" ON public.services FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage news" ON public.news FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage faq" ON public.faq FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage pages" ON public.pages FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage user_roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Profiles table for admin users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_site_config_updated_at BEFORE UPDATE ON public.site_config FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON public.news FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_faq_updated_at BEFORE UPDATE ON public.faq FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON public.pages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default data
INSERT INTO public.site_config (key, value) VALUES
  ('company_name', 'Escritório Contábil'),
  ('company_slogan', 'Descomplicamos a vida da sua empresa.'),
  ('company_description', 'Conquiste e fidelize seus clientes com estratégias inteligentes, em uma época em que a confiança está em primeiro lugar. Encontre tudo o que precisa em um escritório de Contabilidade!'),
  ('phone', '(00) 0000-0000'),
  ('whatsapp', '5500900000000'),
  ('email', 'contato@escritoriocontabil.com.br'),
  ('address', 'Rua Exemplo, 123 - Centro'),
  ('hero_title', 'Descomplicamos a vida da sua empresa.'),
  ('hero_subtitle', 'Conquiste e fidelize seus clientes com estratégias inteligentes, em uma época em que a confiança está em primeiro lugar.');

INSERT INTO public.services (title, description, icon, slug, order_index) VALUES
  ('Assessoria', 'Auxílio técnico dentro de nossa área de conhecimentos especializados.', 'clipboard-check', 'assessoria', 1),
  ('Contabilidade', 'Executamos todos os serviços pertinentes referente a rotina contábil.', 'calculator', 'contabilidade', 2),
  ('Migrar MEI para ME', 'Oferecemos suporte completo para migrar de MEI para ME, ideal para quem está expandindo seus negócios.', 'trending-up', 'migrar-mei-me', 3),
  ('Trabalhista', 'Executamos serviços envolvidos na rotina do departamento pessoal.', 'users', 'trabalhista', 4);

INSERT INTO public.faq (question, answer, order_index) VALUES
  ('Como funciona a contabilidade digital?', 'Nossa contabilidade digital funciona de forma 100% online. Você envia seus documentos pela plataforma e nossa equipe cuida de todo o resto, mantendo você informado em tempo real.', 1),
  ('Qual o prazo para abertura de empresa?', 'O prazo médio para abertura de empresa é de 7 a 15 dias úteis, dependendo do tipo de empresa e da cidade onde será registrada.', 2),
  ('Como faço para trocar de contador?', 'A troca de contador é simples! Basta entrar em contato conosco e cuidamos de todo o processo de migração, solicitando os documentos necessários ao contador anterior.', 3),
  ('Vocês atendem MEI?', 'Sim! Atendemos MEI e oferecemos pacotes especiais para microempreendedores individuais, incluindo suporte para migração para ME quando necessário.', 4);

INSERT INTO public.news (title, slug, excerpt, content, is_published, published_at) VALUES
  ('Qual o impacto da Reforma Tributária no setor de materiais de construção?', 'impacto-reforma-tributaria-materiais-construcao', 'O ano de 2026 marca o início oficial da transição para o novo sistema tributário brasileiro, e o setor de materiais de construção surge como um...', 'O ano de 2026 marca o início oficial da transição para o novo sistema tributário brasileiro, e o setor de materiais de construção surge como um dos mais impactados pelas mudanças. Com a unificação de tributos e novas alíquotas, empresas do ramo precisam se preparar para adequar seus processos fiscais.', true, now()),
  ('Tributação no destino: como isso impacta o preço, o frete e a operação da microempresa', 'tributacao-destino-impacto-microempresa', 'A tributação no destino, introduzida pela Reforma Tributária aprovada em dezembro de 2023, representa uma das mudanças mais profundas na...', 'A tributação no destino, introduzida pela Reforma Tributária aprovada em dezembro de 2023, representa uma das mudanças mais profundas na forma como as empresas brasileiras calculam e recolhem seus impostos.', true, now()),
  ('Planejamento Tributário 2026: eficiência e estratégia em um novo cenário fiscal', 'planejamento-tributario-2026', 'Com a chegada de um novo ano, é usual que as empresas, independentemente de seu setor ou porte, redefinam seu planejamento tributário em linha com...', 'Com a chegada de um novo ano, é usual que as empresas, independentemente de seu setor ou porte, redefinam seu planejamento tributário em linha com as novas regras fiscais.', true, now()),
  ('Trabalho e indenização: quatro situações comuns que geram direitos ao funcionário', 'trabalho-indenizacao-situacoes-comuns', 'Situações rotineiras no ambiente de trabalho, muitas vezes encaradas como parte da dinâmica profissional, podem esconder riscos jurídicos...', 'Situações rotineiras no ambiente de trabalho, muitas vezes encaradas como parte da dinâmica profissional, podem esconder riscos jurídicos significativos para as empresas.', true, now());

INSERT INTO public.pages (title, slug, content, is_published) VALUES
  ('Abrir Empresa', 'abrir-empresa', '<h2>Como abrir uma empresa?</h2><p>Passo a passo para tirar as ideias do papel. Entre em contato conosco para saber mais.</p>', true),
  ('Trocar de Contador', 'trocar-de-contador', '<h2>Trocar de Contador</h2><p>Conosco você aproveitará todos os benefícios do melhor escritório de contabilidade.</p>', true),
  ('Institucional', 'institucional', '<h2>Sobre Nós</h2><p>Somos um escritório de contabilidade com anos de experiência no mercado.</p>', true),
  ('Contato', 'contato', '<h2>Entre em Contato</h2><p>Estamos prontos para atender você.</p>', true);