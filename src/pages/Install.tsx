import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Server, Database, Settings, Upload, Rocket, AlertTriangle, Copy, Check } from "lucide-react";

import InstallRequirements from "@/components/install/InstallRequirements";
import InstallDatabase from "@/components/install/InstallDatabase";
import InstallConfig from "@/components/install/InstallConfig";
import InstallMigration from "@/components/install/InstallMigration";
import InstallComplete from "@/components/install/InstallComplete";

const steps = [
  { id: 1, title: "Requisitos", icon: Server },
  { id: 2, title: "Banco de Dados", icon: Database },
  { id: 3, title: "Configurações", icon: Settings },
  { id: 4, title: "Migração", icon: Upload },
  { id: 5, title: "Conclusão", icon: Rocket },
];

const Install = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [installData, setInstallData] = useState({
    dbHost: "localhost",
    dbPort: "5432",
    dbName: "ortus_contabilidade",
    dbUser: "",
    dbPassword: "",
    siteUrl: "",
    adminEmail: "",
    adminPassword: "",
    dbConnected: false,
    migrationComplete: false,
  });

  const progress = (currentStep / steps.length) * 100;

  const updateData = (data: Partial<typeof installData>) => {
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
        return <InstallComplete data={installData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-heading mb-2">
            Instalação do Sistema
          </h1>
          <p className="text-muted-foreground">
            Siga os passos abaixo para configurar o site em seu servidor
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-2 mb-4" />
          <div className="flex justify-between">
            {steps.map((step) => {
              const StepIcon = step.icon;
              const isCompleted = step.id < currentStep;
              const isCurrent = step.id === currentStep;

              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center gap-2 ${
                    isCurrent
                      ? "text-primary"
                      : isCompleted
                      ? "text-green-600"
                      : "text-muted-foreground"
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
                  <span className="text-xs font-medium hidden sm:block">
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card className="shadow-lg">
          <CardContent className="p-6">{renderStep()}</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Install;
