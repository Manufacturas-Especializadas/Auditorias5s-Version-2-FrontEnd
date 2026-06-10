import { useCallback, useEffect, useState } from "react";
import type { AllModule } from "../types/Types";
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

  const createModule = async (name: string) => {
    const promise = moduleService.create(name);

    toast.promise(promise, {
      loading: "Registrando nuevo módulo...",
      success: () => {
        fetchModules();
        return `Módulo "${name}" creado exitosamente.`;
      },
      error: "Error al crear el módulo. Intenta de nuevo.",
    });

    try {
      await promise;
      return { success: true };
    } catch (err) {
      return { success: false };
    }
  };

  const updateModule = async (id: number, name: string, isActive: boolean) => {
    const promise = moduleService.update(id, name, isActive);

    toast.promise(promise, {
      loading: "Actualizando información en el servidor...",
      success: () => {
        fetchModules();
        return `Módulo actualizado correctamente.`;
      },
      error: "No se pudieron guardar los cambios.",
    });

    try {
      await promise;
      return { success: true };
    } catch (err) {
      return { success: false };
    }
  };

  const deleteModule = async (id: number, moduleName: string) => {
    const promise = moduleService.delete(id);

    toast.promise(promise, {
      loading: "Desactivando módulo...",
      success: () => {
        fetchModules();
        return `El módulo "${moduleName}" ha sido dado de baja de forma segura.`;
      },
      error: "Error al intentar desactivar el módulo.",
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
    updateModule,
    deleteModule,
  };
};
