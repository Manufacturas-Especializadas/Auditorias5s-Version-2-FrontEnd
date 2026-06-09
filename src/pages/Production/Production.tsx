import { useState } from "react";
import { ProductionFormAudit } from "../../components/Production/ProductionFormAudit";

export const Production = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [auditHeader, setAuditHeader] = useState<{
    auditorName: string;
    selectedArea: string;
  } | null>(null);

  const handleInitialDataSubmit = (data: {
    auditorName: string;
    selectedArea: string;
  }) => {
    setAuditHeader(data);
    console.log("Datos listos para el Paso 2:", data);

    setCurrentStep(2);
  };

  return (
    <div
      className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center 
      bg-slate-50 p-4"
    >
      {currentStep === 1 && (
        <ProductionFormAudit onNextStep={handleInitialDataSubmit} />
      )}

      {currentStep === 2 && (
        <div className="architecture-fade-in text-center p-8 bg-white rounded-2xl shadow">
          <h3 className="text-xl font-bold text-slate-800">
            Paso 2: Evaluación de las 5S
          </h3>
          <p className="text-slate-500 mt-2">
            Aquí renderizaremos el checklist para la línea:{" "}
            {auditHeader?.selectedArea}
          </p>
          <p className="text-sm text-slate-400 mt-1">
            Auditor: {auditHeader?.auditorName}
          </p>
        </div>
      )}
    </div>
  );
};
