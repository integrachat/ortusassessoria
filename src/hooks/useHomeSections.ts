import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface HeroContent {
  badge: string;
  title: string;
  subtitle: string;
  button1_text: string;
  button2_text: string;
  image_url: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface FeaturesContent {
  title: string;
  subtitle: string;
  items: FeatureItem[];
}

export interface CtaContent {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  card1_title: string;
  card1_description: string;
  card2_title: string;
  card2_description: string;
}

export interface WorkflowStep {
  icon: string;
  number: string;
  title: string;
  description: string;
}

export interface WorkflowContent {
  badge: string;
  title: string;
  subtitle: string;
  steps: WorkflowStep[];
}

export interface WhatsappCtaContent {
  title: string;
  subtitle: string;
  button1_text: string;
  button2_text: string;
}

export interface NewsSectionContent {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
}

export interface HomeSections {
  hero: HeroContent;
  features: FeaturesContent;
  cta: CtaContent;
  workflow: WorkflowContent;
  whatsapp_cta: WhatsappCtaContent;
  news: NewsSectionContent;
}

const defaultSections: HomeSections = {
  hero: {
    badge: "Escolha nosso escritório",
    title: "Descomplicamos a vida da sua empresa.",
    subtitle: "Conquiste e fidelize seus clientes com estratégias inteligentes...",
    button1_text: "Abrir empresa",
    button2_text: "Trocar de contador",
    image_url: "",
  },
  features: {
    title: "Contabilidade digital completa e pensada para sua empresa.",
    subtitle: "Temos uma equipe totalmente dedicada...",
    items: [],
  },
  cta: {
    badge: "Venha para Escritório Contábil",
    title: "Venha para Escritório Contábil",
    subtitle: "Escolha nosso escritório e dê adeus às preocupações com contabilidade.",
    description: "Traga já a sua empresa para o nosso escritório e você aproveitará todos os benefícios de uma boa contabilidade.",
    image_url: "",
    card1_title: "Abrir Empresa",
    card1_description: "Como abrir uma empresa?",
    card2_title: "Trocar de Contador",
    card2_description: "Conosco você aproveitará...",
  },
  workflow: {
    badge: "Passo a passo",
    title: "Conheça o fluxo de trabalho...",
    subtitle: "Comece agora mesmo!",
    steps: [],
  },
  whatsapp_cta: {
    title: "Fale conosco agora mesmo!",
    subtitle: "Tire suas dúvidas pelo WhatsApp...",
    button1_text: "WhatsApp",
    button2_text: "Ligar agora",
  },
  news: {
    badge: "Fique sempre atualizado",
    title: "Notícias Empresariais",
    subtitle: "Atualize-se com os principais acontecimentos do mundo contábil!",
    description: "Acompanhe em nosso site as últimas e principais notícias sobre contabilidade e negócios.",
    image_url: "",
  },
};

export const useHomeSections = () => {
  return useQuery({
    queryKey: ["home-sections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("home_sections")
        .select("section_key, content");

      if (error) throw error;

      const sections: Record<string, unknown> = {};
      data?.forEach((item) => {
        sections[item.section_key] = item.content;
      });

      return {
        hero: (sections.hero as HeroContent) || defaultSections.hero,
        features: (sections.features as FeaturesContent) || defaultSections.features,
        cta: (sections.cta as CtaContent) || defaultSections.cta,
        workflow: (sections.workflow as WorkflowContent) || defaultSections.workflow,
        whatsapp_cta: (sections.whatsapp_cta as WhatsappCtaContent) || defaultSections.whatsapp_cta,
        news: (sections.news as NewsSectionContent) || defaultSections.news,
      };
    },
  });
};

export const useUpdateHomeSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      sectionKey,
      content,
    }: {
      sectionKey: string;
      content: Record<string, unknown>;
    }) => {
      const { error } = await supabase
        .from("home_sections")
        .upsert(
          { section_key: sectionKey, content: content as unknown as Record<string, never> },
          { onConflict: "section_key" }
        );

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["home-sections"] });
    },
  });
};
