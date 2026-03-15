import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Upload, Image as ImageIcon } from "lucide-react";

interface ConfigItem {
  id: string;
  key: string;
  value: string | null;
}

const configFields = [
  { key: "company_name", label: "Nome da Empresa", type: "text" },
  { key: "company_slogan", label: "Slogan", type: "text" },
  { key: "company_description", label: "Descrição", type: "textarea" },
  { key: "phone", label: "Telefone", type: "text" },
  { key: "whatsapp", label: "WhatsApp (apenas números)", type: "text" },
  { key: "email", label: "Email", type: "email" },
  { key: "address", label: "Endereço", type: "text" },
  { key: "hero_title", label: "Título do Hero", type: "text" },
  { key: "hero_subtitle", label: "Subtítulo do Hero", type: "textarea" },
];

const AdminConfig = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: configs, isLoading } = useQuery({
    queryKey: ["admin-site-config"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_config")
        .select("*");
      
      if (error) throw error;
      return data as ConfigItem[];
    },
  });

  useEffect(() => {
    if (configs) {
      const initialData: Record<string, string> = {};
      configs.forEach((config) => {
        initialData[config.key] = config.value || "";
      });
      setFormData(initialData);
    }
  }, [configs]);

  const updateMutation = useMutation({
    mutationFn: async (data: Record<string, string>) => {
      // Use upsert to create records if they don't exist
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
      queryClient.invalidateQueries({ queryKey: ["admin-site-config"] });
      toast({
        title: "Configurações salvas!",
        description: "As alterações foram aplicadas com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: error.message,
      });
    },
  });

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        variant: "destructive",
        title: "Arquivo inválido",
        description: "Por favor, selecione uma imagem.",
      });
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "Arquivo muito grande",
        description: "A imagem deve ter no máximo 2MB.",
      });
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `logo.${fileExt}`;
      const filePath = `branding/${fileName}`;

      // Delete old logo if exists
      await supabase.storage.from("site-assets").remove([filePath]);

      // Upload new logo
      const { error: uploadError } = await supabase.storage
        .from("site-assets")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL with cache buster
      const { data: urlData } = supabase.storage
        .from("site-assets")
        .getPublicUrl(filePath);
      const publicUrlWithCacheBuster = `${urlData.publicUrl}?t=${Date.now()}`;

      // Update site_config
      const { error: updateError } = await supabase
        .from("site_config")
        .update({ value: urlData.publicUrl })
        .eq("key", "logo_url");

      if (updateError) throw updateError;

      setFormData((prev) => ({ ...prev, logo_url: urlData.publicUrl }));
      queryClient.invalidateQueries({ queryKey: ["site-config"] });
      queryClient.invalidateQueries({ queryKey: ["admin-site-config"] });

      toast({
        title: "Logo atualizada!",
        description: "A nova logo foi salva com sucesso.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao fazer upload",
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
      <h1 className="text-2xl font-bold text-heading">Configurações do Site</h1>

      {/* Identidade Visual Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Identidade Visual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Logo Upload */}
            <div className="space-y-4">
              <Label>Logo do Site</Label>
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center overflow-hidden bg-muted">
                  {formData.logo_url ? (
                    <img
                      src={formData.logo_url}
                      alt="Logo"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full"
                  >
                    {uploading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Upload className="h-4 w-4 mr-2" />
                    )}
                    {uploading ? "Enviando..." : "Fazer Upload"}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG ou SVG. Máximo 2MB.
                  </p>
                </div>
              </div>
            </div>

            {/* Site Name and Meta Description */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="company_name_visual">Nome do Site</Label>
                <Input
                  id="company_name_visual"
                  value={formData.company_name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, company_name: e.target.value })
                  }
                  className="mt-1"
                  placeholder="Nome da sua empresa"
                />
              </div>
              <div>
                <Label htmlFor="meta_description">Meta Descrição (SEO)</Label>
                <Textarea
                  id="meta_description"
                  value={formData.meta_description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, meta_description: e.target.value })
                  }
                  className="mt-1"
                  rows={3}
                  placeholder="Descrição que aparece nos resultados de busca do Google"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Recomendado: até 160 caracteres
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={() => updateMutation.mutate(formData)}
            className="btn-primary mt-6"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Salvar Identidade Visual
          </Button>
        </CardContent>
      </Card>

      {/* Informações Gerais Card */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Gerais</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {configFields.map((field) => (
                <div
                  key={field.key}
                  className={field.type === "textarea" ? "md:col-span-2" : ""}
                >
                  <Label htmlFor={field.key}>{field.label}</Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      id={field.key}
                      value={formData[field.key] || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.key]: e.target.value })
                      }
                      className="mt-1"
                      rows={3}
                    />
                  ) : (
                    <Input
                      id={field.key}
                      type={field.type}
                      value={formData[field.key] || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.key]: e.target.value })
                      }
                      className="mt-1"
                    />
                  )}
                </div>
              ))}
            </div>

            <Button
              type="submit"
              className="btn-primary"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Salvar Alterações
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminConfig;
