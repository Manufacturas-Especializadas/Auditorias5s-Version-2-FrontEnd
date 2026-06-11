import { useState, type SyntheticEvent } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Layers,
  Loader2,
  Save,
  Filter,
  ArrowLeft,
} from "lucide-react";
import { useAreas } from "../../../hooks/useAreas";
import type { AllAreas } from "../../../types/Types";
import { Table, type Column } from "../../../components/Table/Table";
import { Modal } from "../../../components/Modal/Modal";
import SelectField from "../../../components/Inputs/SelectField";
import InputField from "../../../components/Inputs/InputField";
import { useNavigate } from "react-router-dom";

export const Areas = () => {
  const [activeModuleId, setActiveModuleId] = useState<number>(1);

  const { areas, modules, loading, createArea, updateArea, deleteArea } =
    useAreas(activeModuleId);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [newAreaName, setNewAreaName] = useState("");
  const [targetModuleId, setTargetModuleId] = useState<number>(1);

  const [selectedArea, setSelectedArea] = useState<AllAreas | null>(null);
  const [editAreaName, setEditAreaName] = useState("");
  const [editModuleId, setEditModuleId] = useState<number>(1);

  const navigate = useNavigate();

  const handleCreateSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newAreaName.trim() || !targetModuleId) return;

    try {
      await createArea(targetModuleId, newAreaName);
      setNewAreaName("");
      setIsCreateOpen(false);
    } catch {}
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedArea || !editAreaName.trim()) return;

    try {
      await updateArea(
        selectedArea.areaId,
        editModuleId,
        editAreaName,
        selectedArea.isActive,
      );
      setIsEditOpen(false);
      setSelectedArea(null);
    } catch {}
  };

  const openEditModal = (area: AllAreas) => {
    setSelectedArea(area);
    setEditAreaName(area.name);
    setEditModuleId(area.moduleId);
    setIsEditOpen(true);
  };

  const moduleOptions = [
    { value: "", label: "Selecciona un módulo" },
    ...modules.map((m) => ({ value: m.moduleId, label: m.name })),
  ];

  const columns: Column<AllAreas>[] = [
    {
      header: "ID",
      accessor: "areaId",
      className: "w-20 font-mono text-slate-400 text-center",
    },
    {
      header: "Área / Línea",
      accessor: "name",
      className: "font-semibold text-slate-800",
    },
    {
      header: "Estado",
      accessor: (row) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold 
            uppercase tracking-wider ${
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
      className: "text-right w-28",
      accessor: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => openEditModal(row)}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 
            rounded-md transition-colors cursor-pointer"
          >
            <Edit2 size={16} />
          </button>
          {row.isActive && (
            <button
              onClick={() => {
                if (
                  confirm(
                    `¿Seguro que deseas dar de baja el área "${row.name}"?`,
                  )
                ) {
                  deleteArea(row.areaId, row.name);
                }
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
      <div className="w-full max-w-5xl mx-auto space-y-8 architecture-fade-in">
        <header
          className="flex flex-col sm:flex-row sm:items-center justify-between border-b 
          border-gray-200 pb-6 gap-4"
        >
          <div className="space-y-1 text-left">
            <h1
              className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center
              gap-2.5"
            >
              <Layers className="text-slate-700" size={28} />
              Gestión de Áreas y Líneas
            </h1>
            <p className="text-slate-500 text-sm font-normal">
              Vincula las estaciones de trabajo a los módulos correspondientes
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
              setIsCreateOpen(true);
            }}
            className="bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2.5 px-5 
            rounded-xl text-sm transition-all duration-150 flex items-center justify-center gap-2 
            shadow-sm cursor-pointer self-start sm:self-center"
          >
            <Plus size={16} />
            Nueva Área
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
              className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block 
              mb-1"
            >
              Filtrar por Departamento / Módulo
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
              Cargando catálogo filtrado...
            </div>
          ) : (
            <Table<AllAreas>
              data={areas}
              columns={columns}
              keyExtractor={(item) => item.areaId}
              emptyMessage="No hay áreas o líneas asignadas a este módulo."
              defaultRowsPerPage={5}
            />
          )}
        </main>
      </div>

      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Registrar Nueva Área"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-6 text-left">
          <SelectField
            label="Asignar al Módulo"
            options={moduleOptions}
            value={targetModuleId}
            onChange={(e) => setTargetModuleId(Number(e.target.value))}
            required
          />
          <InputField
            label="Nombre del área o línea"
            value={newAreaName}
            onChange={(e) => setNewAreaName(e.target.value)}
            required
          />
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm 
              font-medium hover:bg-slate-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!newAreaName.trim()}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white 
              font-semibold px-5 py-2 rounded-xl text-sm disabled:opacity-50 cursor-pointer"
            >
              <Plus size={16} />
              Guardar Área
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Modificar Configuración de Área"
      >
        <form onSubmit={handleEditSubmit} className="space-y-6 text-left">
          <SelectField
            label="Cambiar de Módulo"
            options={moduleOptions}
            value={editModuleId}
            onChange={(e) => setEditModuleId(Number(e.target.value))}
            required
          />
          <InputField
            label="Nombre de la línea"
            value={editAreaName}
            onChange={(e) => setEditAreaName(e.target.value)}
            required
          />
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm 
              font-medium hover:bg-slate-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!editAreaName.trim()}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white 
              font-semibold px-5 py-2 rounded-xl text-sm cursor-pointer"
            >
              <Save size={16} />
              Actualizar Cambios
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
