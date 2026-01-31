import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Server, Database, Settings, Upload, Rocket, Shield } from "lucide-react";

import InstallRequirements from "@/components/install/InstallRequirements";
import InstallDatabase from "@/components/install/InstallDatabase";
import InstallConfig from "@/components/install/InstallConfig";
import InstallMigration from "@/components/install/InstallMigration";
import InstallComplete from "@/components/install/InstallComplete";

const steps = [
  { id: 1, title: "Requisitos", icon: Server, description: "Verificar servidor" },
  { id: 2, title: "Banco de Dados", icon: Database, description: "Configurar MySQL" },
  { id: 3, title: "Configurações", icon: Settings, description: "URL e Admin" },
  { id: 4, title: "Migração", icon: Upload, description: "Exportar dados" },
  { id: 5, title: "Validação", icon: Shield, description: "Testar instalação" },
  { id: 6, title: "Conclusão", icon: Rocket, description: "Finalizar" },
];

export interface InstallData {
  // Database
  dbHost: string;
  dbPort: string;
  dbName: string;
  dbUser: string;
  dbPassword: string;
  dbConnected: boolean;
  // Site config
  siteUrl: string;
  adminEmail: string;
  adminPassword: string;
  // Migration
  migrationComplete: boolean;
  // Validation
  validationComplete: boolean;
  validationResults: {
    frontend: boolean;
    database: boolean;
    api: boolean;
    files: boolean;
  };
}

const Install = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [installData, setInstallData] = useState<InstallData>({
    dbHost: "localhost",
    dbPort: "3306",
    dbName: "ortus_site",
    dbUser: "",
    dbPassword: "",
    dbConnected: false,
    siteUrl: "",
    adminEmail: "",
    adminPassword: "",
    migrationComplete: false,
    validationComplete: false,
    validationResults: {
      frontend: false,
      database: false,
      api: false,
      files: false,
    },
  });

  const progress = (currentStep / steps.length) * 100;

  const updateData = (data: Partial<InstallData>) => {
    setInstallData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <InstallRequirements onNext={nextStep} />;
      case 2:
        return (
          <InstallDatabase
            data={installData}
            updateData={updateData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <InstallConfig
            data={installData}
            updateData={updateData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <InstallMigration
            data={installData}
            updateData={updateData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 5:
        return (
          <InstallValidation
            data={installData}
            updateData={updateData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 6:
        return <InstallComplete data={installData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Rocket className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-heading mb-2">
            Instalador Hostinger
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Assistente completo para instalação e migração do site para sua hospedagem Hostinger
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-2 mb-6" />
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {steps.map((step) => {
              const StepIcon = step.icon;
              const isCompleted = step.id < currentStep;
              const isCurrent = step.id === currentStep;

              return (
                <button
                  key={step.id}
                  onClick={() => goToStep(step.id)}
                  disabled={step.id > currentStep}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
                    isCurrent
                      ? "bg-primary/10 text-primary"
                      : isCompleted
                      ? "bg-green-50 text-green-600 hover:bg-green-100 cursor-pointer"
                      : "text-muted-foreground opacity-50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      isCurrent
                        ? "border-primary bg-primary/10"
                        : isCompleted
                        ? "border-green-600 bg-green-600/10"
                        : "border-muted"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <StepIcon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-medium block">{step.title}</span>
                    <span className="text-[10px] text-muted-foreground hidden md:block">
                      {step.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card className="shadow-lg border-2">
          <CardContent className="p-6 md:p-8">{renderStep()}</CardContent>
        </Card>

        {/* Footer info */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Passo {currentStep} de {steps.length} • Instalador v1.0
        </p>
      </div>
    </div>
  );
};

// Import do componente de validação
import InstallValidation from "@/components/install/InstallValidation";

export default Install;
