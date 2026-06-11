import { useState, useEffect, useCallback } from "react";

import { toast } from "sonner";
import type { AllAreas, AllModule } from "../types/Types";
import { moduleService } from "../api/services/ModuleService";
import { areasService } from "../api/services/AreasService";

export const useAreas = (selectedModuleFilter: number) => {
  const [areas, setAreas] = useState<AllAreas[]>([]);
  const [modules, setModules] = useState<AllModule[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadModules = useCallback(async () => {
    try {
      const data = await moduleService.getAll();
      setModules(data);
    } catch (err) {
      console.error("Error al cargar módulos en áreas", err);
    }
  }, []);

  const fetchAreas = useCallback(async () => {
    if (!selectedModuleFilter) return;
    setLoading(true);
    try {
      const data = await areasService.getBy(selectedModuleFilter);
      setAreas(data);
    } catch (err) {
      toast.error("Error de conexión", {
        description: "No se pudieron sincronizar las áreas.",
      });
    } finally {
      setLoading(false);
    }
  }, [selectedModuleFilter]);

  const createArea = async (moduleId: number, name: string) => {
    const promise = areasService.create(moduleId, name);
    toast.promise(promise, {
      loading: "Registrando nueva área...",
      success: () => {
        fetchAreas();
        return `Área "${name}" creada con éxito.`;
      },
      error: "Error al registrar el área.",
    });
    return promise;
  };

  const updateArea = async (
    areaId: number,
    moduleId: number,
    name: string,
    isActive: boolean,
  ) => {
    const promise = areasService.update(areaId, moduleId, name, isActive);
    toast.promise(promise, {
      loading: "Guardando cambios...",
      success: () => {
        fetchAreas();
        return "Área modificada correctamente.";
      },
      error: "Error al actualizar.",
    });
    return promise;
  };

  const deleteArea = async (areaId: number, areaName: string) => {
    const promise = areasService.delete(areaId);
    toast.promise(promise, {
      loading: "Desactivando área...",
      success: () => {
        fetchAreas();
        return `"${areaName}" dada de baja correctamente.`;
      },
      error: "Error al desactivar.",
    });
    return promise;
  };

  useEffect(() => {
    loadModules();
  }, [loadModules]);

  useEffect(() => {
    fetchAreas();
  }, [fetchAreas]);

  return {
    areas,
    modules,
    loading,
    createArea,
    updateArea,
    deleteArea,
    refresh: fetchAreas,
  };
};
