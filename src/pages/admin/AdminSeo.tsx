import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Search, Tag, Globe, BarChart3 } from "lucide-react";

const AdminSeo = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: config, isLoading } = useQuery({
    queryKey: ["site-config"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_config")
        .select("key, value");
      
      if (error) throw error;
      
      const configMap: Record<string, string> = {};
      data?.forEach((item) => {
        configMap[item.key] = item.value || "";
      });
      
      return configMap;
    },
  });

  const [formData, setFormData] = useState({
    site_name: "",
    site_description: "",
    site_keywords: "",
    meta_title: "",
    meta_description: "",
    og_image_url: "",
    gtm_container_id: "",
    google_analytics_id: "",
    canonical_url: "",
  });

  // Sync formData with config when it changes
  const getFieldValue = (field: string) => {
    return formData[field as keyof typeof formData] || config?.[field] || "";
  };

  const updateMutation = useMutation({
    mutationFn: async (data: Record<string, string>) => {
      const updates = Object.entries(data).map(([key, value]) => ({
        key,
        value,
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from("site_config")
          .upsert(update, { onConflict: "key" });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-config"] });
      toast({ title: "Configurações de SEO salvas com sucesso!" });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erro ao salvar configurações",
        description: error.message,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData];
      if (value) {
        dataToSave[key] = value;
      }
    });
    updateMutation.mutate(dataToSave);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-heading">Configurações de SEO</h1>
        <p className="text-muted-foreground mt-1">
          Otimize seu site para os mecanismos de busca
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Informações do Site
            </CardTitle>
            <CardDescription>
              Informações básicas que aparecem nos resultados de busca
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="site_name">Nome do Site</Label>
              <Input
                id="site_name"
                value={getFieldValue("site_name")}
                onChange={(e) =>
                  setFormData({ ...formData, site_name: e.target.value })
                }
                placeholder="Nome da sua empresa ou site"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Aparece na aba do navegador e nos resultados de busca
              </p>
            </div>

            <div>
              <Label htmlFor="site_description">Descrição do Site</Label>
              <Textarea
                id="site_description"
                value={getFieldValue("site_description")}
                onChange={(e) =>
                  setFormData({ ...formData, site_description: e.target.value })
                }
                placeholder="Descreva seu site em uma frase"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="canonical_url">URL Canônica</Label>
              <Input
                id="canonical_url"
                value={getFieldValue("canonical_url")}
                onChange={(e) =>
                  setFormData({ ...formData, canonical_url: e.target.value })
                }
                placeholder="https://www.seusite.com.br"
              />
              <p className="text-sm text-muted-foreground mt-1">
                URL principal do seu site (evita conteúdo duplicado)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Meta Tags */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Meta Tags
            </CardTitle>
            <CardDescription>
              Tags que aparecem nos resultados do Google
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="meta_title">Meta Title (Título)</Label>
              <Input
                id="meta_title"
                value={getFieldValue("meta_title")}
                onChange={(e) =>
                  setFormData({ ...formData, meta_title: e.target.value })
                }
                placeholder="Título que aparece no Google"
                maxLength={60}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Recomendado: até 60 caracteres ({getFieldValue("meta_title").length}/60)
              </p>
            </div>

            <div>
              <Label htmlFor="meta_description">Meta Description (Descrição)</Label>
              <Textarea
                id="meta_description"
                value={getFieldValue("meta_description")}
                onChange={(e) =>
                  setFormData({ ...formData, meta_description: e.target.value })
                }
                placeholder="Descrição que aparece nos resultados de busca"
                rows={3}
                maxLength={160}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Recomendado: até 160 caracteres ({getFieldValue("meta_description").length}/160)
              </p>
            </div>

            <div>
              <Label htmlFor="og_image_url">Imagem de Compartilhamento (OG Image)</Label>
              <Input
                id="og_image_url"
                value={getFieldValue("og_image_url")}
                onChange={(e) =>
                  setFormData({ ...formData, og_image_url: e.target.value })
                }
                placeholder="https://www.seusite.com.br/imagem-compartilhamento.jpg"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Imagem que aparece ao compartilhar nas redes sociais (1200x630px recomendado)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Palavras-chave */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Palavras-chave
            </CardTitle>
            <CardDescription>
              Termos que descrevem seu negócio e ajudam no ranqueamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="site_keywords">Keywords (Palavras-chave)</Label>
              <Textarea
                id="site_keywords"
                value={getFieldValue("site_keywords")}
                onChange={(e) =>
                  setFormData({ ...formData, site_keywords: e.target.value })
                }
                placeholder="contabilidade, escritório contábil, abertura de empresa, imposto de renda, contador"
                rows={3}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Separe as palavras-chave por vírgula
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Integrações Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Integrações e Analytics
            </CardTitle>
            <CardDescription>
              Configure o rastreamento de visitantes e conversões
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Google Tag Manager</h4>
              <p className="text-sm text-blue-700 mb-4">
                O GTM permite gerenciar todas as tags de marketing (Analytics, Facebook Pixel, etc.) em um só lugar.
              </p>
              <div>
                <Label htmlFor="gtm_container_id">ID do Container GTM</Label>
                <Input
                  id="gtm_container_id"
                  value={getFieldValue("gtm_container_id")}
                  onChange={(e) =>
                    setFormData({ ...formData, gtm_container_id: e.target.value })
                  }
                  placeholder="GTM-XXXXXXX"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Encontre em: Google Tag Manager → Administrador → ID do container
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="google_analytics_id">Google Analytics 4 (ID alternativo)</Label>
              <Input
                id="google_analytics_id"
                value={getFieldValue("google_analytics_id")}
                onChange={(e) =>
                  setFormData({ ...formData, google_analytics_id: e.target.value })
                }
                placeholder="G-XXXXXXXXXX"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Use apenas se não estiver usando o GTM para configurar o Analytics
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Dicas de SEO */}
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-900">💡 Dicas para Melhorar seu SEO</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-amber-800">
              <li>• Use palavras-chave relevantes no título e descrição</li>
              <li>• Mantenha o meta title entre 50-60 caracteres</li>
              <li>• A meta description deve ter entre 120-160 caracteres</li>
              <li>• Inclua sua localização se for um negócio local</li>
              <li>• Use uma imagem OG de alta qualidade (1200x630px)</li>
              <li>• Cadastre seu site no Google Search Console</li>
              <li>• Configure o Google Meu Negócio para aparecer no Maps</li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="btn-primary"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending && (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            )}
            <Save className="h-4 w-4 mr-2" />
            Salvar Configurações de SEO
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminSeo;
