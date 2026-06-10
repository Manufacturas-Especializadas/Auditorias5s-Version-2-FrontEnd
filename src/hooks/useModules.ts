import { useCallback, useEffect, useState } from "react";
import type { AllModule, CreateModule } from "../types/Types";
import { moduleService } from "../api/services/ModuleService";
import { toast } from "sonner";

export const useModules = () => {
  const [modules, setModules] = useState<AllModule[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchModules = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await moduleService.getAll();
      setModules(data);
    } catch (err) {
      setError("Error al cargar los módulos de auditoría.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createModule = async (data: CreateModule) => {
    const promise = moduleService.create(data);

    toast.promise(promise, {
      loading: "Registrando nuevo modulo...",
      success: () => {
        fetchModules();
        return `Modulo "${data}" creado exitosamente`;
      },
      error: "Error al crear el módulo. Intenta de nuevo",
    });

    try {
      await promise;

      return { success: true };
    } catch (err) {
      return { success: false };
    }
  };

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  return {
    modules,
    loading,
    error,
    createModule,
  };
};
