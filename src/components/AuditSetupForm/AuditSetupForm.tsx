import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import SelectField, { type Option } from "../Inputs/SelectField";
import InputField from "../Inputs/InputField";

interface AuditSetupFormProps {
  title: string;
  subtitle?: string;
  auditorLabel?: string;
  areaLabel?: string;
  areaOptions: Option[];
  onSubmit: (data: { auditorName: string; selectedArea: string }) => void;
}

export const AuditSetupForm: React.FC<AuditSetupFormProps> = ({
  title,
  subtitle = "Por favor ingresa los datos correspondientes a la línea de manufactura",
  auditorLabel = "Nombre auditor",
  areaLabel = "Área a auditar",
  areaOptions,
  onSubmit,
}) => {
  const [auditorName, setAuditorName] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [errors, setErrors] = useState<{
    auditorName?: string;
    selectedArea?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!auditorName.trim())
      newErrors.auditorName = "El nombre del auditor es requerido";
    if (!selectedArea) newErrors.selectedArea = "Debes seleccionar un área";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({ auditorName, selectedArea });
  };

  return (
    <div
      className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border 
      border-gray-100 overflow-hidden font-sans transition-all duration-300"
    >
      <header className="bg-slate-800 text-white p-7 md:p-9 text-left">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          {title}
        </h2>
        <p className="text-slate-300 text-sm md:text-base mt-1.5 font-normal opacity-90">
          {subtitle}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="p-7 md:p-9 space-y-5">
        <InputField
          label={auditorLabel}
          required
          value={auditorName}
          onChange={(e) => {
            setAuditorName(e.target.value);
            if (errors.auditorName)
              setErrors((prev) => ({ ...prev, auditorName: undefined }));
          }}
          error={errors.auditorName}
        />

        <SelectField
          label={areaLabel}
          required
          options={areaOptions}
          value={selectedArea}
          onChange={(e) => {
            setSelectedArea(e.target.value);
            if (errors.selectedArea)
              setErrors((prev) => ({ ...prev, selectedArea: undefined }));
          }}
          error={errors.selectedArea}
        />

        <div className="pt-2">
          <button
            type="submit"
            className="group w-full bg-slate-800 hover:bg-slate-900 active:scale-[0.99] 
            text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex 
            items-center justify-center gap-2 text-base shadow-sm hover:cursor-pointer"
          >
            Continuar Auditoría
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </div>
      </form>
    </div>
  );
};
