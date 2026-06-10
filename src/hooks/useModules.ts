import { useCallback, useEffect, useState } from "react";
import type { AllModule } from "../types/Types";
import { moduleService } from "../api/services/ModuleService";

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

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  return {
    modules,
    loading,
    error,
  };
};
