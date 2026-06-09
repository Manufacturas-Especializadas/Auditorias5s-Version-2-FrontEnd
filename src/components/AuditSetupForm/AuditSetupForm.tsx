import { useState, type SyntheticEvent } from "react";
import type { Option } from "../Inputs/SelectField";
import { ArrowRight } from "lucide-react";
import SelectField from "../Inputs/SelectField";
import InputField from "../Inputs/InputField";

interface Props {
  title: string;
  subtitle?: string;
  auditorLabel?: string;
  areaLabel?: string;
  areaOptions: Option[];
  onSubmit: (data: { auditorName: string; selectedArea: string }) => void;
}

export const AuditSetupForm = ({
  title,
  subtitle = "Completa los detalles requeridos",
  auditorLabel = "Nombre auditor",
  areaLabel = "Área a auditar",
  areaOptions,
  onSubmit,
}: Props) => {
  const [auditorName, setAuditorName] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [errors, setErrors] = useState<{
    auditorName?: string;
    selectedArea?: string;
  }>({});

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
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
      className="w-full max-w-2xl bg-white rounded-2xl shadow-md border border-gray-100 
      overflow-hidden font-sans transition-all duration-300"
    >
      <header className="bg-[#009ee2] text-white p-6 md:p-8 text-left">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          {title}
        </h2>
        <p className="text-sky-100 text-sm md:text-base mt-1 opacity-90">
          {subtitle}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
        <div>
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
            autoComplete="name"
          />
        </div>

        <div>
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
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="group w-full bg-[#009ee2] hover:bg-[#0089c4] active:scale-[0.99] 
            text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex 
            items-center justify-center gap-2 text-base shadow-sm hover:shadow hover:cursor-pointer"
          >
            Continuar
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
