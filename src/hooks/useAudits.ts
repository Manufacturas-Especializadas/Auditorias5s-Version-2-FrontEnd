import { useCallback, useEffect, useState } from "react";
import type { AuditHistory, UpdateAuditAnswer } from "../types/Types";
import { auditService } from "../api/services/AuditService";
import { toast } from "sonner";

export const useAudits = () => {
  const [audits, setAudits] = useState<AuditHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAudits = useCallback(async () => {
    setLoading(true);

    try {
      const data = await auditService.getHistory();
      setAudits(data);
    } catch (error) {
      toast.error("Error de conexión", {
        description: "No se pudo sincronizar la bitácora",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAudits();
  }, [fetchAudits]);

  const removeAudit = async (auditId: number) => {
    const promise = auditService.delete(auditId);
    toast.promise(promise, {
      loading: "Eliminando registro...",
      success: () => {
        setAudits((prevAudits) =>
          prevAudits.filter((a) => a.auditId !== auditId),
        );
      },
      error: "Error al intentar la auditoria.",
    });

    return promise;
  };

  const editAudit = async (
    auditId: number,
    auditorId: number,
    areaId: number,
    answers: UpdateAuditAnswer[],
  ) => {
    const promise = auditService.update(auditId, auditorId, areaId, answers);

    toast.promise(promise, {
      loading: "Recalculando promedio y actualizando reporte...",
      success: () => {
        fetchAudits();

        return "Auditoria actualizada con éxitos";
      },
      error: "Error al actualizar",
    });

    return promise;
  };

  return {
    audits,
    loading,
    refresh: fetchAudits,
    removeAudit,
    editAudit,
  };
};
