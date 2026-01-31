import { useState } from "react";
import { useHomeSections, useUpdateHomeSection } from "@/hooks/useHomeSections";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Save,
  ChevronDown,
  ChevronUp,
  Layout,
  Sparkles,
  FileText,
  MessageCircle,
  Image,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";

const AdminHome = () => {
  const { toast } = useToast();
  const { data: sections, isLoading } = useHomeSections();
  const updateSection = useUpdateHomeSection();

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    hero: true,
  });
  const [editedSections, setEditedSections] = useState<Record<string, unknown>>(
    {}
  );
  const [uploading, setUploading] = useState(false);

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const updateField = (
    sectionKey: string,
    fieldPath: string,
    value: string
  ) => {
    setEditedSections((prev) => {
      const currentSection =
        prev[sectionKey] || sections?.[sectionKey as keyof typeof sections];
      const updated = JSON.parse(JSON.stringify(currentSection || {}));

      const keys = fieldPath.split(".");
      let obj = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        const nextKey = keys[i + 1];
        // Create intermediate object/array if it doesn't exist
        if (obj[key] === undefined || obj[key] === null) {
          // If next key is a number, create an array, otherwise create an object
          obj[key] = /^\d+$/.test(nextKey) ? [] : {};
        }
        obj = obj[key];
      }
      obj[keys[keys.length - 1]] = value;

      return { ...prev, [sectionKey]: updated };
    });
  };

  const handleSave = async (sectionKey: string) => {
    const content =
      editedSections[sectionKey] ||
      sections?.[sectionKey as keyof typeof sections];

    try {
      await updateSection.mutateAsync({ sectionKey, content: content as Record<string, unknown> });
      toast({ title: "Seção salva com sucesso!" });
      setEditedSections((prev) => {
        const updated = { ...prev };
        delete updated[sectionKey];
        return updated;
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: (error as Error).message,
      });
    }
  };

  const handleImageUpload = async (
    sectionKey: string,
    fieldPath: string,
    file: File
  ) => {
    setUploading(true);
    try {
      const fileName = `home/${sectionKey}-${Date.now()}.${file.name.split(".").pop()}`;
      const { error: uploadError } = await supabase.storage
        .from("site-assets")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("site-assets").getPublicUrl(fileName);

      updateField(sectionKey, fieldPath, publicUrl);
      toast({ title: "Imagem enviada com sucesso!" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao enviar imagem",
        description: (error as Error).message,
      });
    } finally {
      setUploading(false);
    }
  };

  const getValue = (sectionKey: string, fieldPath: string): string => {
    const section =
      editedSections[sectionKey] ||
      sections?.[sectionKey as keyof typeof sections];
    if (!section) return "";

    const keys = fieldPath.split(".");
    let value: unknown = section;
    for (const key of keys) {
      value = (value as Record<string, unknown>)?.[key];
    }
    return (value as string) || "";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const sectionConfigs = [
    {
      key: "hero",
      title: "Hero Principal",
      icon: Layout,
      fields: [
        { path: "badge", label: "Badge", type: "text" },
        { path: "title", label: "Título Principal", type: "text" },
        { path: "subtitle", label: "Subtítulo", type: "textarea" },
        { path: "button1_text", label: "Texto Botão 1", type: "text" },
        { path: "button2_text", label: "Texto Botão 2", type: "text" },
        { path: "image_url", label: "Imagem de Fundo", type: "image" },
      ],
    },
    {
      key: "features",
      title: "Seção Features",
      icon: Sparkles,
      fields: [
        { path: "title", label: "Título", type: "text" },
        { path: "subtitle", label: "Subtítulo", type: "textarea" },
        { path: "items.0.title", label: "Feature 1 - Título", type: "text" },
        {
          path: "items.0.description",
          label: "Feature 1 - Descrição",
          type: "textarea",
        },
        { path: "items.1.title", label: "Feature 2 - Título", type: "text" },
        {
          path: "items.1.description",
          label: "Feature 2 - Descrição",
          type: "textarea",
        },
        { path: "items.2.title", label: "Feature 3 - Título", type: "text" },
        {
          path: "items.2.description",
          label: "Feature 3 - Descrição",
          type: "textarea",
        },
      ],
    },
    {
      key: "cta",
      title: "Seção CTA",
      icon: FileText,
      fields: [
        { path: "badge", label: "Badge", type: "text" },
        { path: "title", label: "Título", type: "text" },
        { path: "subtitle", label: "Subtítulo", type: "text" },
        { path: "description", label: "Descrição", type: "textarea" },
        { path: "image_url", label: "Imagem Circular", type: "image" },
        { path: "card1_title", label: "Card 1 - Título", type: "text" },
        {
          path: "card1_description",
          label: "Card 1 - Descrição",
          type: "textarea",
        },
        { path: "card2_title", label: "Card 2 - Título", type: "text" },
        {
          path: "card2_description",
          label: "Card 2 - Descrição",
          type: "textarea",
        },
      ],
    },
    {
      key: "workflow",
      title: "Seção Workflow",
      icon: FileText,
      fields: [
        { path: "badge", label: "Badge", type: "text" },
        { path: "title", label: "Título", type: "text" },
        { path: "subtitle", label: "Subtítulo", type: "textarea" },
        { path: "steps.0.title", label: "Passo 1 - Título", type: "text" },
        {
          path: "steps.0.description",
          label: "Passo 1 - Descrição",
          type: "textarea",
        },
        { path: "steps.1.title", label: "Passo 2 - Título", type: "text" },
        {
          path: "steps.1.description",
          label: "Passo 2 - Descrição",
          type: "textarea",
        },
        { path: "steps.2.title", label: "Passo 3 - Título", type: "text" },
        {
          path: "steps.2.description",
          label: "Passo 3 - Descrição",
          type: "textarea",
        },
        { path: "steps.3.title", label: "Passo 4 - Título", type: "text" },
        {
          path: "steps.3.description",
          label: "Passo 4 - Descrição",
          type: "textarea",
        },
      ],
    },
    {
      key: "whatsapp_cta",
      title: "Seção WhatsApp CTA",
      icon: MessageCircle,
      fields: [
        { path: "title", label: "Título", type: "text" },
        { path: "subtitle", label: "Subtítulo", type: "text" },
        { path: "button1_text", label: "Texto Botão 1", type: "text" },
        { path: "button2_text", label: "Texto Botão 2", type: "text" },
      ],
    },
    {
      key: "news",
      title: "Seção Notícias",
      icon: FileText,
      fields: [
        { path: "badge", label: "Badge", type: "text" },
        { path: "title", label: "Título", type: "text" },
        { path: "subtitle", label: "Subtítulo", type: "text" },
        { path: "description", label: "Descrição", type: "textarea" },
        { path: "image_url", label: "Imagem de Destaque", type: "image" },
      ],
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-heading">Editor da Home</h1>
          <p className="text-muted-foreground">
            Edite os textos e imagens de cada seção da página inicial
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {sectionConfigs.map((config) => (
          <Card key={config.key}>
            <Collapsible
              open={openSections[config.key]}
              onOpenChange={() => toggleSection(config.key)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <config.icon className="h-5 w-5 text-primary" />
                      {config.title}
                      {editedSections[config.key] && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
                          Não salvo
                        </span>
                      )}
                    </div>
                    {openSections[config.key] ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-4 pt-0">
                  <div className="grid gap-4 md:grid-cols-2">
                    {config.fields.map((field) => (
                      <div
                        key={field.path}
                        className={
                          field.type === "textarea" || field.type === "image"
                            ? "md:col-span-2"
                            : ""
                        }
                      >
                        <Label htmlFor={`${config.key}-${field.path}`}>
                          {field.label}
                        </Label>
                        {field.type === "text" && (
                          <Input
                            id={`${config.key}-${field.path}`}
                            value={getValue(config.key, field.path)}
                            onChange={(e) =>
                              updateField(
                                config.key,
                                field.path,
                                e.target.value
                              )
                            }
                          />
                        )}
                        {field.type === "textarea" && (
                          <Textarea
                            id={`${config.key}-${field.path}`}
                            value={getValue(config.key, field.path)}
                            onChange={(e) =>
                              updateField(
                                config.key,
                                field.path,
                                e.target.value
                              )
                            }
                            rows={3}
                          />
                        )}
                        {field.type === "image" && (
                          <div className="space-y-2">
                            <div className="flex gap-2">
                              <Input
                                id={`${config.key}-${field.path}`}
                                value={getValue(config.key, field.path)}
                                onChange={(e) =>
                                  updateField(
                                    config.key,
                                    field.path,
                                    e.target.value
                                  )
                                }
                                placeholder="URL da imagem"
                              />
                              <Label
                                htmlFor={`upload-${config.key}-${field.path}`}
                                className="cursor-pointer"
                              >
                                <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                                  {uploading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Image className="h-4 w-4" />
                                  )}
                                  Upload
                                </div>
                                <input
                                  id={`upload-${config.key}-${field.path}`}
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      handleImageUpload(
                                        config.key,
                                        field.path,
                                        file
                                      );
                                    }
                                  }}
                                />
                              </Label>
                            </div>
                            {getValue(config.key, field.path) && (
                              <div className="relative w-48 h-32 rounded-lg overflow-hidden border">
                                <img
                                  src={getValue(config.key, field.path)}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end pt-4 border-t">
                    <Button
                      onClick={() => handleSave(config.key)}
                      disabled={
                        updateSection.isPending || !editedSections[config.key]
                      }
                      className="btn-primary"
                    >
                      {updateSection.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      Salvar Seção
                    </Button>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
