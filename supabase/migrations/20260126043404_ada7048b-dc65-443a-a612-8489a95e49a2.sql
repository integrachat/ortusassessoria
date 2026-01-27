-- Create table for home page sections content
CREATE TABLE public.home_sections (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key text NOT NULL UNIQUE,
  content jsonb NOT NULL DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.home_sections ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read
CREATE POLICY "Anyone can read home_sections"
ON public.home_sections
FOR SELECT
USING (true);

-- Policy: Admins can manage
CREATE POLICY "Admins can manage home_sections"
ON public.home_sections
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_home_sections_updated_at
BEFORE UPDATE ON public.home_sections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default content for each section
INSERT INTO public.home_sections (section_key, content) VALUES
('hero', '{
  "badge": "Escolha nosso escritório",
  "title": "Descomplicamos a vida da sua empresa.",
  "subtitle": "Conquiste e fidelize seus clientes com estratégias inteligentes, em uma época em que a confiança está em primeiro lugar. Encontre tudo o que precisa em um escritório de Contabilidade!",
  "button1_text": "Abrir empresa",
  "button2_text": "Trocar de contador",
  "image_url": ""
}'::jsonb),
('features', '{
  "title": "Contabilidade digital completa e pensada para sua empresa.",
  "subtitle": "Temos uma equipe totalmente dedicada a contabilidade da sua empresa que trabalha com rapidez e agilidade.",
  "items": [
    {"icon": "Sparkles", "title": "Com Simplicidade", "description": "Com dinamismo e praticidade, fazemos todo o trabalho duro por você de forma simples, rápida e interativa."},
    {"icon": "Zap", "title": "Mais Praticidade", "description": "Somos um Escritório de Contabilidade com profissionais capacitados para facilitar sua vida e de sua empresa."},
    {"icon": "Shield", "title": "Segurança Total", "description": "Seus dados e informações são tratados com a máxima segurança e confidencialidade."}
  ]
}'::jsonb),
('cta', '{
  "badge": "Venha para Escritório Contábil",
  "title": "Escolha nosso escritório e dê adeus às preocupações com contabilidade.",
  "description": "Traga já a sua empresa para o nosso escritório e você aproveitará todos os benefícios de uma boa contabilidade. Atenderemos todas as suas necessidades contábeis com muita agilidade, presteza e de forma econômica para sua empresa.",
  "card1_title": "Abrir Empresa",
  "card1_description": "Como abrir uma empresa? Passo a passo para tirar as ideias do papel",
  "card2_title": "Trocar de Contador",
  "card2_description": "Conosco você aproveitará todos os benefícios do melhor escritório de contabilidade."
}'::jsonb),
('workflow', '{
  "badge": "Passo a passo",
  "title": "Conheça o fluxo de trabalho e da otimização",
  "subtitle": "Comece agora mesmo! Veja como é simples trabalhar com nossa equipe.",
  "steps": [
    {"icon": "FileText", "number": "01", "title": "Análise", "description": "Analisamos sua situação atual e identificamos as melhores soluções para seu negócio."},
    {"icon": "Send", "number": "02", "title": "Proposta", "description": "Enviamos uma proposta personalizada com todos os serviços necessários."},
    {"icon": "CheckCircle2", "number": "03", "title": "Execução", "description": "Executamos todos os processos de forma ágil e eficiente."},
    {"icon": "Headphones", "number": "04", "title": "Suporte", "description": "Oferecemos suporte contínuo para todas as suas necessidades."}
  ]
}'::jsonb),
('whatsapp_cta', '{
  "title": "Fale conosco agora mesmo!",
  "subtitle": "Tire suas dúvidas pelo WhatsApp ou ligue para nós.",
  "button1_text": "WhatsApp",
  "button2_text": "Ligar agora"
}'::jsonb);