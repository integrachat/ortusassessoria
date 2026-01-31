import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, User, Lock, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { InstallData } from "@/pages/Install";

interface Props {
  data: InstallData;
  updateData: (data: Partial<InstallData>) => void;
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

  const passwordStrength = () => {
    const pwd = data.adminPassword;
    if (!pwd) return { level: 0, text: "", color: "" };
    
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2) return { level: 1, text: "Fraca", color: "bg-red-500" };
    if (score <= 4) return { level: 2, text: "Média", color: "bg-amber-500" };
    return { level: 3, text: "Forte", color: "bg-green-500" };
  };

  const strength = passwordStrength();

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
              Informe o domínio que você configurou na Hostinger
            </p>
          </div>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-3 flex gap-2">
              <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700">
                Na Hostinger, seu domínio pode ser acessado em <strong>Domínios → Gerenciar</strong>.
                Certifique-se de que o SSL está ativo para usar HTTPS.
              </p>
            </CardContent>
          </Card>
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
              {data.adminPassword && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded ${
                          i <= strength.level ? strength.color : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Força: {strength.text}
                  </p>
                </div>
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
              {confirmPassword && confirmPassword === data.adminPassword && (
                <div className="flex items-center gap-1 mt-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-xs">Senhas conferem</span>
                </div>
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
              caracteres especiais. Guarde essas credenciais em local seguro.
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
