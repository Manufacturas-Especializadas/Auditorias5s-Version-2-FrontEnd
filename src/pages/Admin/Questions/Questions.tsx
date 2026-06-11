import { useState, type SyntheticEvent } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  HelpCircle,
  Loader2,
  Save,
  Filter,
  ArrowLeft,
} from "lucide-react";
import { useQuestions } from "../../../hooks/useQuestions";
import type { AllQuestion } from "../../../types/Types";
import { Table, type Column } from "../../../components/Table/Table";
import { Modal } from "../../../components/Modal/Modal";
import SelectField from "../../../components/Inputs/SelectField";
import { useNavigate } from "react-router-dom";

const CATEGORIAS_5S = [
  { value: 1, label: "1S - Seleccionar" },
  { value: 2, label: "2S - Ordenar" },
  { value: 3, label: "3S - Limpieza" },
  { value: 4, label: "4S - Estándarizar" },
  { value: 5, label: "5S - Sostener" },
];

export const Questions = () => {
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const {
    questions,
    modules,
    loading,
    createQuestion,
    updateQuestion,
    deleteQuestion,
  } = useQuestions(activeModuleId);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [targetModuleId, setTargetModuleId] = useState<number>(1);
  const [categoryId, setCategoryId] = useState<number>(1);
  const [questionText, setQuestionText] = useState("");
  const [displayOrder, setDisplayOrder] = useState<number>(1);

  const navigate = useNavigate();

  const [selectedQuestion, setSelectedQuestion] = useState<AllQuestion | null>(
    null,
  );

  const resetForm = () => {
    setQuestionText("");
    setDisplayOrder(1);
    setCategoryId(1);
  };

  const handleCreateSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!questionText.trim() || !targetModuleId || !categoryId) return;

    try {
      await createQuestion(
        targetModuleId,
        categoryId,
        questionText,
        displayOrder,
      );
      resetForm();
      setIsCreateOpen(false);
    } catch {}
  };

  const handleEditSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedQuestion || !questionText.trim()) return;

    try {
      await updateQuestion(
        selectedQuestion.id,
        targetModuleId,
        categoryId,
        questionText,
        displayOrder,
        selectedQuestion.isActive,
      );
      setIsEditOpen(false);
      setSelectedQuestion(null);
    } catch {}
  };

  const openEditModal = (question: AllQuestion) => {
    setSelectedQuestion(question);
    setTargetModuleId(question.moduleId);
    setCategoryId(question.categoryId);
    setQuestionText(question.text);
    setDisplayOrder(question.displayOrder);
    setIsEditOpen(true);
  };

  const moduleOptions = [
    { value: "", label: "Selecciona un módulo" },
    ...modules.map((m) => ({ value: m.moduleId, label: m.name })),
  ];

  const columns: Column<AllQuestion>[] = [
    {
      header: "ID",
      accessor: "id",
      className: "w-16 font-mono text-slate-400 text-center",
    },
    {
      header: "Categoría",
      className: "w-40 font-semibold text-sky-700",
      accessor: (row) =>
        CATEGORIAS_5S.find((c) => c.value === row.categoryId)
          ?.label?.split("-")[0]
          .trim() || "N/A",
    },
    {
      header: "Pregunta",
      accessor: "text",
      className: "text-slate-800 whitespace-normal min-w-[300px]",
    },
    {
      header: "Orden",
      accessor: "displayOrder",
      className: "w-20 text-center text-slate-500",
    },
    {
      header: "Estado",
      accessor: (row) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            row.isActive
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-slate-100 text-slate-600 border border-slate-200"
          }`}
        >
          {row.isActive ? "Activo" : "Inactivo"}
        </span>
      ),
    },
    {
      header: "Acciones",
      className: "text-right w-24",
      accessor: (row) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => openEditModal(row)}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md 
            transition-colors cursor-pointer"
          >
            <Edit2 size={16} />
          </button>
          {row.isActive && (
            <button
              onClick={() => {
                if (confirm(`¿Desactivar la pregunta #${row.id}?`))
                  deleteQuestion(row.id);
              }}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md 
              transition-colors cursor-pointer"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 px-6 py-12 antialiased">
      <div className="w-full max-w-6xl mx-auto space-y-8 architecture-fade-in">
        <header
          className="flex flex-col sm:flex-row sm:items-center justify-between border-b 
        border-gray-200 pb-6 gap-4"
        >
          <div className="space-y-1 text-left">
            <h1
              className="text-3xl font-extrabold text-slate-900 tracking-tight flex 
              items-center gap-2.5"
            >
              <HelpCircle className="text-slate-700" size={28} />
              Banco de Preguntas 5S
            </h1>
            <p className="text-slate-500 text-sm font-normal">
              Administra los criterios de evaluación estructurados por cada
              categoría
            </p>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-slate-500 hover:text-blue-600 flex items-center 
          gap-2 mb-4 transition-colors font-medium text-sm cursor-pointer"
            >
              <ArrowLeft size={20} />
              Volver
            </button>
          </div>

          <button
            onClick={() => {
              setTargetModuleId(activeModuleId);
              resetForm();
              setIsCreateOpen(true);
            }}
            className="bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2.5 
            px-5 rounded-xl text-sm transition-all duration-150 flex items-center justify-center 
            gap-2 shadow-sm cursor-pointer self-start sm:self-center"
          >
            <Plus size={16} />
            Nueva Pregunta
          </button>
        </header>

        <div
          className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 
          shadow-sm w-full md:max-w-md text-left"
        >
          <div className="p-2 bg-slate-50 rounded-lg text-slate-500">
            <Filter size={18} />
          </div>
          <div className="grow">
            <label
              className="text-[10px] font-bold text-slate-400 uppercase tracking-wider 
              block mb-1"
            >
              Filtrar cuestionario por Módulo
            </label>
            <select
              value={activeModuleId}
              onChange={(e) => setActiveModuleId(Number(e.target.value))}
              className="w-full bg-transparent text-sm font-semibold text-slate-800 
              focus:outline-none cursor-pointer"
            >
              {modules.map((m) => (
                <option key={m.moduleId} value={m.moduleId}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <main className="relative">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-slate-500 gap-2 font-medium">
              <Loader2 className="animate-spin text-slate-700" size={20} />
              Cargando banco de preguntas...
            </div>
          ) : (
            <Table<AllQuestion>
              data={questions}
              columns={columns}
              keyExtractor={(item) => item.id}
              emptyMessage="No hay preguntas registradas para este módulo."
              defaultRowsPerPage={10}
            />
          )}
        </main>
      </div>

      <Modal
        isOpen={isCreateOpen || isEditOpen}
        onClose={() => {
          setIsCreateOpen(false);
          setIsEditOpen(false);
          setSelectedQuestion(null);
        }}
        title={isCreateOpen ? "Registrar Nueva Pregunta" : "Modificar Pregunta"}
        maxWidth="lg"
      >
        <form
          onSubmit={isCreateOpen ? handleCreateSubmit : handleEditSubmit}
          className="space-y-6 text-left"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField
              label="Módulo Objetivo"
              options={moduleOptions}
              value={targetModuleId}
              onChange={(e) => setTargetModuleId(Number(e.target.value))}
              required
            />
            <SelectField
              label="Categoría 5S"
              options={CATEGORIAS_5S}
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              required
            />
          </div>

          <div className="relative mb-4">
            <label
              className="absolute -top-2.5 left-3 bg-white px-1 text-[10px] font-bold 
              text-sky-600 uppercase tracking-wide z-10"
            >
              Criterio a evaluar *
            </label>
            <textarea
              required
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              rows={3}
              className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm 
              text-gray-700 focus:outline-none focus:ring-1 focus:ring-sky-600 
              focus:border-sky-600 
              transition-colors resize-none"
              placeholder="Ej. ¿Los pasillos están libres de obstáculos?"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsCreateOpen(false);
                setIsEditOpen(false);
              }}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm 
              font-medium hover:bg-slate-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!questionText.trim()}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 
              text-white font-semibold px-5 py-2 rounded-xl text-sm cursor-pointer"
            >
              {isCreateOpen ? <Plus size={16} /> : <Save size={16} />}
              {isCreateOpen ? "Guardar Pregunta" : "Actualizar Cambios"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
