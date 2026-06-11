import React, { useState, type SyntheticEvent } from "react";
import { useAreas } from "../../hooks/useAreas";
import { useAuditors } from "../../hooks/useAuditors";
import { Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductionFormProps {
  onNextStep: (data: { auditorId: number; areaId: number }) => void;
}

export const ProductionFormAudit: React.FC<ProductionFormProps> = ({
  onNextStep,
}) => {
  const { areas, loading: loadingAreas } = useAreas(1);
  const { auditors, loading: loadingAuditors } = useAuditors();

  const [selectedAuditorId, setSelectedAuditorId] = useState<number | "">("");
  const [selectedAreaId, setSelectedAreaId] = useState<number | "">("");

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedAuditorId || !selectedAreaId) return;

    onNextStep({
      auditorId: Number(selectedAuditorId),
      areaId: Number(selectedAreaId),
    });
  };

  if (loadingAreas || loadingAuditors) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-500 gap-2 font-medium">
        <Loader2 className="animate-spin text-slate-700" size={20} />
        Cargando catálogos de producción...
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-gray-100 p-6 
      md:p-8 text-left architecture-fade-in"
    >
      <header className="mb-6 space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Nueva auditoría para producción
        </h2>
        <p className="text-slate-500 text-sm">
          Por favor ingresa los datos correspondientes a la línea de manufactura
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">
            Nombre auditor *
          </label>
          <select
            required
            value={selectedAuditorId}
            onChange={(e) =>
              setSelectedAuditorId(e.target.value ? Number(e.target.value) : "")
            }
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl 
            text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-slate-700 
            cursor-pointer"
          >
            <option value="">Selecciona un auditor</option>
            {auditors.map((aud) => (
              <option key={aud.auditorId} value={aud.auditorId}>
                {aud.fullName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">
            Área a auditar *
          </label>
          <select
            required
            value={selectedAreaId}
            onChange={(e) =>
              setSelectedAreaId(e.target.value ? Number(e.target.value) : "")
            }
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl 
            text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-slate-700 
            cursor-pointer"
          >
            <option value="">Selecciona una línea</option>
            {areas.map((area) => (
              <option key={area.areaId} value={area.areaId}>
                {area.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={!selectedAuditorId || !selectedAreaId}
          className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 
          px-5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-sm 
          disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Comenzar Evaluación
          <ArrowRight size={16} />
        </button>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 px-5 
          rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-sm 
          disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Salir
          <ArrowLeft size={16} />
        </button>
      </form>
    </div>
  );
};
