import { useState, useEffect, useCallback } from "react";

import { toast } from "sonner";
import type { AllModule, AllQuestion } from "../types/Types";
import { moduleService } from "../api/services/ModuleService";
import { questionsService } from "../api/services/QuestionsService";

const CATEGORY_MAP: Record<string, number> = {
  seleccionar: 1,
  ordenar: 2,
  limpieza: 3,
  estandarizar: 4,
  sostener: 5,
};

export const useQuestions = (selectedModuleFilter: number) => {
  const [questions, setQuestions] = useState<AllQuestion[]>([]);
  const [modules, setModules] = useState<AllModule[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadModules = useCallback(async () => {
    try {
      const data = await moduleService.getAll();
      setModules(data);
    } catch (err) {
      console.error("Error al cargar módulos", err);
    }
  }, []);

  const fetchQuestions = useCallback(async () => {
    if (!selectedModuleFilter) return;
    setLoading(true);
    try {
      const groupedData =
        await questionsService.getByModuleGrouped(selectedModuleFilter);

      const flatQuestions: AllQuestion[] = groupedData.flatMap(
        (group: { key: string; questions: any[] }) => {
          const categoryId = CATEGORY_MAP[group.key.toLowerCase()] || 1;

          return group.questions.map((q) => ({
            id: q.id,
            text: q.text,
            categoryId: categoryId,
            moduleId: selectedModuleFilter,
            displayOrder: q.displayOrder ?? 1,
            isActive: q.isActive ?? true,
          }));
        },
      );

      setQuestions(flatQuestions);
    } catch (err) {
      toast.error("Error de conexión", {
        description: "No se pudieron cargar las preguntas del servidor.",
      });
    } finally {
      setLoading(false);
    }
  }, [selectedModuleFilter]);

  const createQuestion = async (
    moduleId: number,
    categoryId: number,
    questionText: string,
  ) => {
    const promise = questionsService.create(moduleId, categoryId, questionText);
    toast.promise(promise, {
      loading: "Guardando nueva pregunta...",
      success: () => {
        fetchQuestions();
        return "Pregunta agregada al banco con éxito.";
      },
      error: "Error al registrar la pregunta.",
    });
    return promise;
  };

  const updateQuestion = async (
    questionId: number,
    moduleId: number,
    categoryId: number,
    questionText: string,
    displayOrder: number,
    isActive: boolean,
  ) => {
    const promise = questionsService.update(
      questionId,
      moduleId,
      categoryId,
      questionText,
      displayOrder,
      isActive,
    );
    toast.promise(promise, {
      loading: "Actualizando pregunta...",
      success: () => {
        fetchQuestions();
        return "Pregunta modificada correctamente.";
      },
      error: "Error al actualizar.",
    });
    return promise;
  };

  const deleteQuestion = async (questionId: number) => {
    const promise = questionsService.delete(questionId);
    toast.promise(promise, {
      loading: "Desactivando pregunta...",
      success: () => {
        fetchQuestions();
        return "Pregunta dada de baja del cuestionario.";
      },
      error: "Error al desactivar.",
    });
    return promise;
  };

  useEffect(() => {
    loadModules();
  }, [loadModules]);
  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return {
    questions,
    modules,
    loading,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    refresh: fetchQuestions,
  };
};
