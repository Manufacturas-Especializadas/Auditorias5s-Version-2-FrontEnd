import { useState, type SyntheticEvent } from "react";
import { Plus, Trash2, Users, Loader2, ArrowLeft } from "lucide-react";
import { useAuditors } from "../../../hooks/useAuditors";
import { Table, type Column } from "../../../components/Table/Table";
import type { AllAuditor } from "../../../types/Types";
import { Modal } from "../../../components/Modal/Modal";
import InputField from "../../../components/Inputs/InputField";
import { useNavigate } from "react-router-dom";

export const Auditors = () => {
  const { auditors, loading, createAuditor, deleteAuditor } = useAuditors();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    try {
      await createAuditor(fullName);
      setFullName("");
      setIsCreateOpen(false);
    } catch {}
  };

  const columns: Column<AllAuditor>[] = [
    {
      header: "ID",
      accessor: "auditorId",
      className: "w-24 font-mono text-slate-400 text-center",
    },
    {
      header: "Nombre Completo del Auditor",
      accessor: "fullName",
      className: "font-semibold text-slate-800",
    },
    {
      header: "Estado de Autorización",
      accessor: (row) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            row.isActive
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-slate-100 text-slate-600 border border-slate-200"
          }`}
        >
          {row.isActive ? "Autorizado" : "Inactivo"}
        </span>
      ),
    },
    {
      header: "Acciones",
      className: "text-right w-24",
      accessor: (row) => (
        <div className="flex items-center justify-end pr-2">
          {row.isActive && (
            <button
              onClick={() => {
                if (
                  confirm(
                    `¿Retirar los permisos de auditoría para "${row.fullName}"?`,
                  )
                ) {
                  deleteAuditor(row.auditorId, row.fullName);
                }
              }}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md 
              transition-colors cursor-pointer"
              title="Dar de baja"
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
      <div className="w-full max-w-4xl mx-auto space-y-8 architecture-fade-in">
        <header
          className="flex flex-col sm:flex-row sm:items-center justify-between border-b 
          border-gray-200 pb-6 gap-4"
        >
          <div className="space-y-1 text-left">
            <h1
              className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center 
              gap-2.5"
            >
              <Users className="text-slate-700" size={28} />
              Control de Auditores
            </h1>
            <p className="text-slate-500 text-sm font-normal">
              Gestiona al personal de ingeniería y calidad acreditado para
              levantar evaluaciones
            </p>
          </div>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2.5 px-5 
            rounded-xl text-sm transition-all duration-150 flex items-center justify-center gap-2 
            shadow-sm cursor-pointer self-start sm:self-center"
          >
            <Plus size={16} />
            Alta de Auditor
          </button>
        </header>

        <main className="relative">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-slate-500 hover:text-blue-600 flex items-center 
            gap-2 mb-4 transition-colors font-medium text-sm cursor-pointer"
          >
            <ArrowLeft size={20} />
            Volver
          </button>
          {loading ? (
            <div className="flex items-center justify-center py-20 text-slate-500 gap-2 font-medium">
              <Loader2 className="animate-spin text-slate-700" size={20} />
              Leyendo firmas digitales autorizadas...
            </div>
          ) : (
            <Table<AllAuditor>
              data={auditors}
              columns={columns}
              keyExtractor={(item) => item.auditorId}
              emptyMessage="No se han registrado ingenieros o inspectores en el sistema."
              defaultRowsPerPage={5}
            />
          )}
        </main>
      </div>

      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Dar de Alta Nuevo Auditor"
        maxWidth="md"
      >
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <InputField
            label="Nombre del empleado"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
              disabled={!fullName.trim()}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white 
              font-semibold px-5 py-2 rounded-xl text-sm disabled:opacity-50 cursor-pointer"
            >
              <Plus size={16} />
              Dar de Alta
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
