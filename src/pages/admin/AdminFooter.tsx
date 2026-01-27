import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Upload, Image as ImageIcon, Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";

const AdminFooter = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

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
    company_name: "",
    footer_logo_url: "",
    footer_description: "",
    facebook_url: "",
    instagram_url: "",
    linkedin_url: "",
    youtube_url: "",
    twitter_url: "",
  });

  // Update form when config loads
  useState(() => {
    if (config) {
      setFormData({
        company_name: config.company_name || "",
        footer_logo_url: config.footer_logo_url || "",
        footer_description: config.footer_description || "",
        facebook_url: config.facebook_url || "",
        instagram_url: config.instagram_url || "",
        linkedin_url: config.linkedin_url || "",
        youtube_url: config.youtube_url || "",
        twitter_url: config.twitter_url || "",
      });
    }
  });

  // Sync formData with config when it changes
  const syncedFormData = {
    company_name: formData.company_name || config?.company_name || "",
    footer_logo_url: formData.footer_logo_url || config?.footer_logo_url || "",
    footer_description: formData.footer_description || config?.footer_description || "",
    facebook_url: formData.facebook_url || config?.facebook_url || "",
    instagram_url: formData.instagram_url || config?.instagram_url || "",
    linkedin_url: formData.linkedin_url || config?.linkedin_url || "",
    youtube_url: formData.youtube_url || config?.youtube_url || "",
    twitter_url: formData.twitter_url || config?.twitter_url || "",
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
      toast({ title: "Configurações do rodapé salvas com sucesso!" });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erro ao salvar configurações",
        description: error.message,
      });
    },
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Por favor, selecione um arquivo de imagem.",
      });
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `footer-logo-${Date.now()}.${fileExt}`;
      const filePath = `logos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("site-assets")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("site-assets")
        .getPublicUrl(filePath);

      setFormData({ ...formData, footer_logo_url: urlData.publicUrl });
      toast({ title: "Logo enviada com sucesso!" });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao enviar logo",
        description: error.message,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
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
      <h1 className="text-2xl font-bold text-heading">Configurações do Rodapé</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Logo e Nome */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Logo e Identificação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="company_name">Nome da Empresa</Label>
              <Input
                id="company_name"
                value={formData.company_name || config?.company_name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, company_name: e.target.value })
                }
                placeholder="Nome da sua empresa"
              />
            </div>

            <div>
              <Label>Logo do Rodapé</Label>
              <div className="flex items-center gap-4 mt-2">
                {(formData.footer_logo_url || config?.footer_logo_url) && (
                  <img
                    src={formData.footer_logo_url || config?.footer_logo_url}
                    alt="Logo do rodapé"
                    className="h-16 w-auto object-contain bg-muted rounded p-2"
                  />
                )}
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Upload className="h-4 w-4 mr-2" />
                    )}
                    Enviar Logo
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Recomendado: imagem PNG ou SVG com fundo transparente
              </p>
            </div>

            <div>
              <Label htmlFor="footer_description">Texto do Rodapé</Label>
              <Textarea
                id="footer_description"
                value={formData.footer_description || config?.footer_description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, footer_description: e.target.value })
                }
                placeholder="Descrição da empresa que aparece no rodapé"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Redes Sociais */}
        <Card>
          <CardHeader>
            <CardTitle>Redes Sociais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="facebook_url" className="flex items-center gap-2">
                  <Facebook className="h-4 w-4 text-blue-600" />
                  Facebook
                </Label>
                <Input
                  id="facebook_url"
                  value={formData.facebook_url || config?.facebook_url || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, facebook_url: e.target.value })
                  }
                  placeholder="https://facebook.com/suapagina"
                />
              </div>

              <div>
                <Label htmlFor="instagram_url" className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-pink-600" />
                  Instagram
                </Label>
                <Input
                  id="instagram_url"
                  value={formData.instagram_url || config?.instagram_url || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, instagram_url: e.target.value })
                  }
                  placeholder="https://instagram.com/seuperfil"
                />
              </div>

              <div>
                <Label htmlFor="linkedin_url" className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-blue-700" />
                  LinkedIn
                </Label>
                <Input
                  id="linkedin_url"
                  value={formData.linkedin_url || config?.linkedin_url || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, linkedin_url: e.target.value })
                  }
                  placeholder="https://linkedin.com/company/suaempresa"
                />
              </div>

              <div>
                <Label htmlFor="youtube_url" className="flex items-center gap-2">
                  <Youtube className="h-4 w-4 text-red-600" />
                  YouTube
                </Label>
                <Input
                  id="youtube_url"
                  value={formData.youtube_url || config?.youtube_url || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, youtube_url: e.target.value })
                  }
                  placeholder="https://youtube.com/@seucanal"
                />
              </div>

              <div>
                <Label htmlFor="twitter_url" className="flex items-center gap-2">
                  <Twitter className="h-4 w-4 text-sky-500" />
                  Twitter / X
                </Label>
                <Input
                  id="twitter_url"
                  value={formData.twitter_url || config?.twitter_url || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, twitter_url: e.target.value })
                  }
                  placeholder="https://twitter.com/seuperfil"
                />
              </div>
            </div>
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
            Salvar Alterações
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminFooter;
