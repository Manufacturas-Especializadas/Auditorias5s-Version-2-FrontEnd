import React from "react";
import { AuditSetupForm } from "../AuditSetupForm/AuditSetupForm";
import type { Option } from "../Inputs/SelectField";

const LINEAS_PRODUCCION: Option[] = [
  { value: "", label: "Selecciona una línea" },
  { value: "linea-1", label: "Línea 1" },
  { value: "linea-2", label: "Línea 2" },
  { value: "linea-3", label: "Línea 3" },
  { value: "linea-4", label: "Línea 4" },
  { value: "linea-5", label: "Línea 5" },
  { value: "linea-10", label: "Línea 10" },
  { value: "linea-11", label: "Línea 11" },
];

interface ProductionFormProps {
  onNextStep: (data: { auditorName: string; selectedArea: string }) => void;
}

export const ProductionFormAudit: React.FC<ProductionFormProps> = ({
  onNextStep,
}) => {
  const handleFormSubmit = (formData: {
    auditorName: string;
    selectedArea: string;
  }) => {
    console.log("Datos de Producción validados:", formData);
    onNextStep(formData);
  };

  return (
    <div className="w-full flex justify-center items-center px-4 py-8 architecture-fade-in">
      <AuditSetupForm
        title="Nueva auditoría para producción"
        subtitle="Por favor ingresa los datos correspondientes a la línea de manufactura"
        auditorLabel="Nombre auditor"
        areaLabel="Área a auditar"
        areaOptions={LINEAS_PRODUCCION}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};
