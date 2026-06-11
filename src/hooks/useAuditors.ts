import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import type { AllAuditor } from "../types/Types";
import { auditorService } from "../api/services/AuditorService";

export const useAuditors = () => {
  const [auditors, setAuditors] = useState<AllAuditor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAuditors = useCallback(async () => {
    setLoading(true);
    try {
      const data = await auditorService.getAll();
      setAuditors(data);
    } catch (err) {
      toast.error("Error de sincronización", {
        description: "No se pudo descargar la lista de auditores.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const createAuditor = async (fullName: string) => {
    const promise = auditorService.create(fullName);
    toast.promise(promise, {
      loading: "Registrando auditor en MesaCore...",
      success: () => {
        fetchAuditors();
        return `Auditor "${fullName}" dado de alta.`;
      },
      error: "Error al registrar el auditor.",
    });
    return promise;
  };

  const deleteAuditor = async (id: number, fullName: string) => {
    const promise = auditorService.delete(id);
    toast.promise(promise, {
      loading: "Dando de baja...",
      success: () => {
        fetchAuditors();
        return `"${fullName}" ha sido removido del personal activo.`;
      },
      error: "Error al desactivar el auditor.",
    });
    return promise;
  };

  useEffect(() => {
    fetchAuditors();
  }, [fetchAuditors]);

  return {
    auditors,
    loading,
    createAuditor,
    deleteAuditor,
    refresh: fetchAuditors,
  };
};
