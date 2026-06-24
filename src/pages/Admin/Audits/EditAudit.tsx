import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { auditService } from "../../../api/services/AuditService";
import { questionsService } from "../../../api/services/QuestionsService";
import { GenericFormAudit } from "../../../components/GenericFormAudit/GenericFormAudit";
import { EvaluationWizard } from "../../../components/EvaluationWizard/EvaluationWizard";
import { AuditResult } from "../../../components/AuditResult/AuditResult";

export const EditAudit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  const [auditHeader, setAuditHeader] = useState<{
    auditorId: number;
    areaId: number;
    moduleId: number;
  } | null>(null);
  const [savedAnswers, setSavedAnswers] = useState<Record<number, number>>({});
  const [backendRawGroups, setBackendRawGroups] = useState<any[]>([]);

  useEffect(() => {
    const fetchAudit = async () => {
      try {
        const auditId = Number(id);
        const data = await auditService.getById(auditId);

        setAuditHeader({
          auditorId: data.auditorId,
          areaId: data.areaId,
          moduleId: data.moduleId,
        });

        const mappedAnswers: Record<number, number> = {};
        data.answers.forEach((ans) => {
          mappedAnswers[ans.questionId] = ans.score;
        });
        setSavedAnswers(mappedAnswers);

        const groups = await questionsService.getByModuleGrouped(data.moduleId);
        setBackendRawGroups(groups);
      } catch (error) {
        toast.error("Error al cargar", {
          description: "La auditoría no existe o hubo un error de red.",
        });
        navigate("/administrador/auditorias");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAudit();
  }, [id, navigate]);

  const handleHeaderSubmit = (data: { auditorId: number; areaId: number }) => {
    setAuditHeader((prev) => (prev ? { ...prev, ...data } : null));
    setCurrentStep(2);
  };

  const handleEvaluationFinish = (answers: Record<number, number>) => {
    setSavedAnswers(answers);
    setCurrentStep(3);
  };

  const handleUpdateDatabase = async () => {
    if (!auditHeader || !id) return;

    const answersPayload = Object.entries(savedAnswers).map(([qId, score]) => ({
      questionId: Number(qId),
      score: score,
    }));

    const updatePromise = auditService.update(
      Number(id),
      auditHeader.auditorId,
      auditHeader.areaId,
      answersPayload,
    );

    toast.promise(updatePromise, {
      loading: "Guardando cambios en la auditoría...",
      success: () => {
        navigate("/administrador/auditorias");
        return "Auditoría actualizada correctamente.";
      },
      error: "Error al intentar actualizar la auditoría.",
    });
  };

  if (loading) {
    return (
      <div className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center text-slate-500 gap-2">
        <Loader2 className="animate-spin text-slate-700" size={24} />
        Cargando datos de la auditoría...
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center 
      justify-center bg-slate-50 p-4 md:p-8"
    >
      {currentStep === 1 && auditHeader && (
        <GenericFormAudit
          moduleId={auditHeader.moduleId}
          title="Editar Auditoría 5S"
          subtitle="Modifica el auditor o el área evaluada. El área debe pertenecer al mismo módulo."
          isEditing={true}
          initialAuditorId={auditHeader.auditorId}
          initialAreaId={auditHeader.areaId}
          onNextStep={handleHeaderSubmit}
          onCancel={() => navigate("/administrador/auditorias")}
        />
      )}

      {currentStep === 2 && backendRawGroups.length > 0 && (
        <EvaluationWizard
          categories={backendRawGroups}
          initialAnswers={savedAnswers}
          onFinish={handleEvaluationFinish}
        />
      )}

      {currentStep === 3 && backendRawGroups.length > 0 && (
        <AuditResult
          categories={backendRawGroups}
          answers={savedAnswers}
          onReset={() => setCurrentStep(1)}
          onSave={handleUpdateDatabase}
        />
      )}
    </div>
  );
};
