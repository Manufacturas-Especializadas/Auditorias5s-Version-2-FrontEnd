import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { questionsService } from "../../api/services/QuestionsService";
import { auditService } from "../../api/services/AuditService";
import { EvaluationWizard } from "../../components/EvaluationWizard/EvaluationWizard";
import { AuditResult } from "../../components/AuditResult/AuditResult";
import { GenericFormAudit } from "../../components/GenericFormAudit/GenericFormAudit";

export const Peripherals = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [auditHeader, setAuditHeader] = useState<{
    auditorId: number;
    areaId: number;
  } | null>(null);
  const [savedAnswers, setSavedAnswers] = useState<Record<number, number>>({});
  const [backendRawGroups, setBackendRawGroups] = useState<any[]>([]);

  const handleInitialDataSubmit = async (data: {
    auditorId: number;
    areaId: number;
  }) => {
    setAuditHeader(data);

    try {
      const dataGrouped = await questionsService.getByModuleGrouped(2);
      setBackendRawGroups(dataGrouped);
      setCurrentStep(2);
    } catch {
      toast.error("Error crítico", {
        description: "No se pudieron precargar las preguntas de periféricas.",
      });
    }
  };

  const handleEvaluationFinish = (answers: Record<number, number>) => {
    setSavedAnswers(answers);
    setCurrentStep(3);
  };

  const handleSaveToDatabase = async () => {
    if (!auditHeader) return;

    const answersPayload = Object.entries(savedAnswers).map(([qId, score]) => ({
      questionId: Number(qId),
      score: score,
    }));

    const completePayload = {
      areaId: auditHeader.areaId,
      auditorId: auditHeader.auditorId,
      answers: answersPayload,
    };

    const savePromise = auditService.saveAudit(completePayload);

    toast.promise(savePromise, {
      loading: "Consolidando auditoría de periféricas en base de datos...",
      success: () => {
        setCurrentStep(1);
        setSavedAnswers({});
        setAuditHeader(null);
        return "Auditoría de Periféricas archivada con éxito.";
      },
      error: "Error al intentar guardar el reporte.",
    });
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-slate-50 p-4 md:p-8">
      {currentStep === 1 && (
        <GenericFormAudit
          moduleId={2}
          title="Nueva auditoría para Periféricas"
          subtitle="Por favor ingresa los datos correspondientes al departamento periférico"
          onNextStep={handleInitialDataSubmit}
        />
      )}

      {currentStep === 2 &&
        (backendRawGroups.length > 0 ? (
          <EvaluationWizard
            categories={backendRawGroups}
            onFinish={handleEvaluationFinish}
          />
        ) : (
          <div className="flex items-center justify-center text-slate-500 gap-2">
            <Loader2 className="animate-spin" size={20} /> Estructurando
            categorías...
          </div>
        ))}

      {currentStep === 3 && backendRawGroups.length > 0 && (
        <AuditResult
          categories={backendRawGroups}
          answers={savedAnswers}
          onReset={() => setCurrentStep(1)}
          onSave={handleSaveToDatabase}
        />
      )}
    </div>
  );
};
