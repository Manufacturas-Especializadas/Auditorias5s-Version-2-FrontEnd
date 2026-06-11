import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { auditService } from "../api/services/AuditService";
import type { AuditHistory } from "../types/Types";

export const useAuditHistory = () => {
  const [history, setHistory] = useState<AuditHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchHistory = useCallback(async () => {
    setLoading(false);
    setLoading(true);
    try {
      const data = await auditService.getHistory();
      setHistory(data);
    } catch (err) {
      toast.error("Error de carga", {
        description: "No se pudo sincronizar el histórico de auditorías.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { history, loading, refresh: fetchHistory };
};
