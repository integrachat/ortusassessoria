import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, User, Lock, AlertTriangle } from "lucide-react";

interface Props {
  data: {
    siteUrl: string;
    adminEmail: string;
    adminPassword: string;
  };
  updateData: (data: Partial<Props["data"]>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const InstallConfig = ({ data, updateData, onNext, onPrev }: Props) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!data.siteUrl) {
      newErrors.siteUrl = "URL do site é obrigatória";
    } else if (!data.siteUrl.startsWith("http")) {
      newErrors.siteUrl = "URL deve começar com http:// ou https://";
    }

    if (!data.adminEmail) {
      newErrors.adminEmail = "E-mail do administrador é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.adminEmail)) {
      newErrors.adminEmail = "E-mail inválido";
    }

    if (!data.adminPassword) {
      newErrors.adminPassword = "Senha é obrigatória";
    } else if (data.adminPassword.length < 8) {
      newErrors.adminPassword = "Senha deve ter no mínimo 8 caracteres";
    }

    if (data.adminPassword !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não conferem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-heading mb-2">
          Configurações do Site
        </h2>
        <p className="text-muted-foreground">
          Configure a URL do site e crie o usuário administrador
        </p>
      </div>

      {/* URL do Site */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <Globe className="h-5 w-5" />
            <h3 className="font-semibold">URL do Site</h3>
          </div>

          <div>
            <Label htmlFor="siteUrl">Endereço completo do site</Label>
            <Input
              id="siteUrl"
              value={data.siteUrl}
              onChange={(e) => updateData({ siteUrl: e.target.value })}
              placeholder="https://www.seudominio.com.br"
              className={errors.siteUrl ? "border-destructive" : ""}
            />
            {errors.siteUrl && (
              <p className="text-sm text-destructive mt-1">{errors.siteUrl}</p>
            )}
            <p className="text-sm text-muted-foreground mt-1">
              Informe a URL completa onde o site será acessado
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Usuário Admin */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <User className="h-5 w-5" />
            <h3 className="font-semibold">Usuário Administrador</h3>
          </div>

          <div>
            <Label htmlFor="adminEmail">E-mail do Administrador</Label>
            <Input
              id="adminEmail"
              type="email"
              value={data.adminEmail}
              onChange={(e) => updateData({ adminEmail: e.target.value })}
              placeholder="admin@seudominio.com.br"
              className={errors.adminEmail ? "border-destructive" : ""}
            />
            {errors.adminEmail && (
              <p className="text-sm text-destructive mt-1">{errors.adminEmail}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="adminPassword">Senha</Label>
              <Input
                id="adminPassword"
                type="password"
                value={data.adminPassword}
                onChange={(e) => updateData({ adminPassword: e.target.value })}
                placeholder="••••••••"
                className={errors.adminPassword ? "border-destructive" : ""}
              />
              {errors.adminPassword && (
                <p className="text-sm text-destructive mt-1">
                  {errors.adminPassword}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={errors.confirmPassword ? "border-destructive" : ""}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Aviso de segurança */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-4 flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-800">Dica de Segurança</p>
            <p className="text-sm text-amber-700">
              Use uma senha forte com letras maiúsculas, minúsculas, números e
              caracteres especiais. Após a instalação, considere alterar a URL
              de acesso ao admin.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={onPrev}>
          Voltar
        </Button>
        <Button onClick={handleNext}>Próximo Passo</Button>
      </div>
    </div>
  );
};

export default InstallConfig;
