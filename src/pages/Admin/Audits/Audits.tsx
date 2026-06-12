import { useState } from "react";
import { useAuditHistory } from "../../../hooks/useAuditHistory";
import { Table, type Column } from "../../../components/Table/Table";
import type { AuditHistory } from "../../../types/Types";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { auditService } from "../../../api/services/AuditService";
import { useNavigate } from "react-router-dom";

export const Audits = () => {
  const { history, loading } = useAuditHistory();

  const [filterAuditor, setFilterAuditor] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const navigate = useNavigate();

  const filteredData = history.filter((audit) => {
    const matchesAuditor = audit.auditorName
      .toLowerCase()
      .includes(filterAuditor.toLowerCase());
    const matchesDate = filterDate
      ? audit.auditDate.startsWith(filterDate)
      : true;
    return matchesAuditor && matchesDate;
  });

  const handleDownloadExcel = async (auditId: number) => {
    const downloadPromise = async () => {
      const blobData = await auditService.downloadExcelReport(auditId);

      const url = window.URL.createObjectURL(blobData);
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute(
        "download",
        `Reporte_Auditoria_5S_MESA_${auditId}.xlsx`,
      );
      document.body.appendChild(link);
      link.click();

      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    };

    toast.promise(downloadPromise(), {
      loading: "Generando reporte...",
      success: "Reporte Excel generado y descargado con éxito.",
      error: "Error al procesar el archivo en el servidor.",
    });
  };

  const columns: Column<AuditHistory>[] = [
    {
      header: "Nombre del Auditor",
      accessor: "auditorName",
      className: "font-semibold text-slate-800",
    },
    {
      header: "Área / Módulo",
      accessor: (row) => (
        <div className="text-left">
          <p className="font-medium text-slate-700">{row.areaName}</p>
          <p className="text-xs text-slate-400 font-normal">{row.moduleName}</p>
        </div>
      ),
    },
    {
      header: "Fecha de la Auditoría",
      className: "w-52 text-slate-600 font-mono",
      accessor: (row) =>
        new Date(row.auditDate).toLocaleString("es-MX", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
    },
    {
      header: "Resultado",
      className: "w-28 text-center",
      accessor: (row) => (
        <span
          className={`inline-flex items-center font-bold px-2.5 py-0.5 rounded-md text-sm ${
            row.finalScore >= 85
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {row.finalScore}%
        </span>
      ),
    },
    {
      header: "Acciones",
      className: "text-center w-24",
      accessor: (row) => (
        <button
          onClick={() => handleDownloadExcel(row.auditId)}
          className="p-2 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-xl 
          transition-colors cursor-pointer"
          title="Descargar reporte Excel"
        >
          <Download size={18} />
        </button>
      ),
    },
  ];
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 p-4">
      <div
        className="flex justify-end gap-4 bg-white p-4 rounded-xl border border-slate-100 
        shadow-sm"
      >
        <div className="flex flex-col text-left gap-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
            Filtrar por auditor
          </label>
          <input
            type="text"
            placeholder="Nombre del auditor"
            value={filterAuditor}
            onChange={(e) => setFilterAuditor(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-700 
            focus:outline-none focus:ring-1 focus:ring-slate-700"
          />
        </div>
        <div className="flex flex-col text-left gap-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
            Filtrar por fecha
          </label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-700 
            focus:outline-none focus:ring-1 focus:ring-slate-700"
          />
        </div>
      </div>

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
        <div className="flex items-center justify-center py-20 text-slate-500 gap-2">
          <Loader2 className="animate-spin text-slate-700" size={20} />
          Sincronizando bitácora de planta...
        </div>
      ) : (
        <Table<AuditHistory>
          data={filteredData}
          columns={columns}
          keyExtractor={(item) => item.auditId}
          emptyMessage="No se encontraron registros de auditorías con los filtros especificados."
          defaultRowsPerPage={10}
        />
      )}
    </div>
  );
};
