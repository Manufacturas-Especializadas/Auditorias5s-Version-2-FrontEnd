import { useState } from "react";
import { ProductionFormAudit } from "../../components/Production/ProductionFormAudit";
import { AuditResult } from "../../components/AuditResult/AuditResult";
import { EvaluationWizard } from "../../components/EvaluationWizard/EvaluationWizard";
import { PRODUCTION_5S_QUESTIONS } from "../../data/auditQuestions";

export const Production = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [auditHeader, setAuditHeader] = useState<{
    auditorName: string;
    selectedArea: string;
  } | null>(null);
  const [savedAnswers, setSavedAnswers] = useState<Record<number, number>>({});

  const handleInitialDataSubmit = (data: {
    auditorName: string;
    selectedArea: string;
  }) => {
    setAuditHeader(data);
    setCurrentStep(2);
  };

  const handleEvaluationFinish = (answers: Record<number, number>) => {
    setSavedAnswers(answers);
    setCurrentStep(3);
  };

  const handleSaveToDatabase = () => {
    console.log("Guardando datos en SQL Server...", {
      auditHeader,
      savedAnswers,
    });
    alert("Auditoría guardada exitosamente en el servidor.");
  };

  return (
    <div
      className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center 
      justify-center bg-slate-50 p-4 md:p-8"
    >
      {currentStep === 1 && (
        <ProductionFormAudit onNextStep={handleInitialDataSubmit} />
      )}

      {currentStep === 2 && (
        <EvaluationWizard
          categories={PRODUCTION_5S_QUESTIONS}
          onFinish={handleEvaluationFinish}
        />
      )}

      {currentStep === 3 && (
        <AuditResult
          categories={PRODUCTION_5S_QUESTIONS}
          answers={savedAnswers}
          onReset={() => setCurrentStep(1)}
          onSave={handleSaveToDatabase}
        />
      )}
    </div>
  );
};
