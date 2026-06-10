import { Edit2, LayoutGrid, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { useState, type SyntheticEvent } from "react";
import { Table, type Column } from "../../../components/Table/Table";
import { useModules } from "../../../hooks/useModules";
import type { AllModule } from "../../../types/Types";
import { Modal } from "../../../components/Modal/Modal";
import InputField from "../../../components/Inputs/InputField";

export const Modules = () => {
  const { modules, loading, createModule, updateModule, deleteModule } =
    useModules();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [newModuleName, setNewModuleName] = useState("");
  const [selectedModule, setSelectedModule] = useState<AllModule | null>(null);
  const [editModuleName, setEditModuleName] = useState("");

  const handleCreateSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newModuleName.trim()) return;

    const result = await createModule(newModuleName);
    if (result.success) {
      setNewModuleName("");
      setIsCreateOpen(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModule || !editModuleName.trim()) return;

    const result = await updateModule(
      selectedModule.moduleId,
      editModuleName,
      selectedModule.isActive,
    );
    if (result.success) {
      setIsEditOpen(false);
      setSelectedModule(null);
    }
  };

  const openEditModal = (module: AllModule) => {
    setSelectedModule(module);
    setEditModuleName(module.name);
    setIsEditOpen(true);
  };

  const columns: Column<AllModule>[] = [
    {
      header: "ID",
      accessor: "moduleId",
      className: "w-20 font-mono text-slate-400 text-center",
    },
    {
      header: "Nombre del Módulo",
      accessor: "name",
      className: "font-semibold text-slate-800",
    },
    {
      header: "Estado",
      accessor: (row) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase 
            tracking-wider ${
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
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md 
            transition-colors hover:cursor-pointer"
            title="Editar módulo"
          >
            <Edit2 size={16} />
          </button>
          {row.isActive && (
            <button
              onClick={() => {
                if (
                  confirm(
                    `¿Seguro que deseas dar de baja el módulo "${row.name}"?`,
                  )
                ) {
                  deleteModule(row.moduleId, row.name);
                }
              }}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md 
              transition-colors hover:cursor-pointer"
              title="Desactivar módulo"
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
              <LayoutGrid className="text-slate-700" size={28} />
              Gestión de Módulos
            </h1>
            <p className="text-slate-500 text-sm font-normal">
              Administra los departamentos globales para el despliegue dinámico
              de las 5S
            </p>
          </div>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2.5 px-5 
            rounded-xl text-sm transition-all duration-150 flex items-center justify-center gap-2 
            shadow-sm cursor-pointer self-start sm:self-center hover:cursor-pointer"
          >
            <Plus size={16} />
            Nuevo Módulo
          </button>
        </header>

        <main className="relative">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-slate-500 gap-2 font-medium">
              <Loader2 className="animate-spin text-slate-700" size={20} />
              Sincronizando con base de datos unificada...
            </div>
          ) : (
            <Table<AllModule>
              data={modules}
              columns={columns}
              keyExtractor={(item) => item.moduleId}
              emptyMessage="No se encontraron módulos registrados en el sistema."
              defaultRowsPerPage={5}
            />
          )}
        </main>
      </div>

      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Registrar Módulo de Auditoría"
        maxWidth="md"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-6 text-left">
          <InputField
            label="Nombre del módulo"
            required
            value={newModuleName}
            onChange={(e) => setNewModuleName(e.target.value)}
          />
          <div className="flex justify-end gap-3 pt-2 border-t border-slate-50">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm 
              font-medium hover:bg-slate-50 cursor-pointer hover:cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!newModuleName.trim()}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white 
              font-semibold px-5 py-2 rounded-xl text-sm disabled:opacity-50 
              disabled:cursor-not-allowed cursor-pointer hover:cursor-pointer"
            >
              <Plus size={16} />
              Guardar Módulo
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedModule(null);
        }}
        title="Modificar Nombre del Módulo"
        maxWidth="md"
      >
        <form onSubmit={handleEditSubmit} className="space-y-6 text-left">
          <InputField
            label="Nombre del módulo"
            required
            value={editModuleName}
            onChange={(e) => setEditModuleName(e.target.value)}
          />
          <div className="flex justify-end gap-3 pt-2 border-t border-slate-50">
            <button
              type="button"
              onClick={() => {
                setIsEditOpen(false);
                setSelectedModule(null);
              }}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm 
              font-medium hover:bg-slate-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={
                !editModuleName.trim() ||
                editModuleName.trim() === selectedModule?.name
              }
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white 
              font-semibold px-5 py-2 rounded-xl text-sm disabled:opacity-50 
              disabled:cursor-not-allowed cursor-pointer"
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
