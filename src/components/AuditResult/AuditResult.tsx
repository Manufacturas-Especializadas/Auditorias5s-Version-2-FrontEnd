import React from "react";
import { ThumbsUp, RotateCcw, Save } from "lucide-react";
import type { SCategory } from "../../data/auditQuestions";

interface AuditResultProps {
  categories: SCategory[];
  answers: Record<number, number>;
  onReset: () => void;
  onSave: () => void;
}

export const AuditResult: React.FC<AuditResultProps> = ({
  categories,
  answers,
  onReset,
  onSave,
}) => {
  const categoryResults = categories.map((category) => {
    const qIds = category.questions.map((q) => q.id);
    const categoryAnswers = qIds.map((id) => answers[id] || 0);

    const totalScoreObtained = categoryAnswers.reduce(
      (acc, curr) => acc + curr,
      0,
    );
    const maxPossibleScore = category.questions.length * 5;

    const percentage =
      maxPossibleScore > 0 ? (totalScoreObtained / maxPossibleScore) * 100 : 0;

    const cleanName =
      category.title.split("-")[1]?.split("(")[0]?.trim() || category.title;

    return {
      name: cleanName,
      percentage: parseFloat(percentage.toFixed(1)),
    };
  });

  const totalPercentageSum = categoryResults.reduce(
    (acc, curr) => acc + curr.percentage,
    0,
  );
  const finalScore = parseFloat(
    (totalPercentageSum / categories.length).toFixed(1),
  );

  const getDictum = (score: number) => {
    if (score >= 95)
      return {
        text: "Excelente - Cumple con todos los estándares",
        color: "text-emerald-600",
        bg: "bg-emerald-500",
      };
    if (score >= 85)
      return {
        text: "Bueno - Cumple satisfactoriamente",
        color: "text-green-600",
        bg: "bg-green-500",
      };
    if (score >= 70)
      return {
        text: "Regular - Requiere acciones de mejora",
        color: "text-amber-600",
        bg: "bg-amber-500",
      };
    return {
      text: "Crítico - No cumple con los estándares mínimos",
      color: "text-red-600",
      bg: "bg-red-500",
    };
  };

  const dictum = getDictum(finalScore);

  return (
    <div
      className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border 
      border-gray-100 overflow-hidden font-sans transition-all duration-300 
      architecture-fade-in"
    >
      <header className="bg-slate-800 text-white p-6 md:p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Resultado final de auditoría
        </h2>
        <p className="text-slate-300 text-xs md:text-sm mt-1.5 font-normal tracking-wide">
          Resumen de calificaciones por categoría (Ponderación 100% equitativa)
        </p>
      </header>

      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {categoryResults.map((cat, index) => (
          <div
            key={index}
            className="border-2 border-emerald-500/20 bg-emerald-50/30 rounded-xl p-5 
            flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500" />

            <div className="flex justify-between items-start pl-2">
              <span className="text-emerald-900 font-bold text-base md:text-lg">
                {cat.name}
              </span>
              <ThumbsUp
                size={18}
                className="text-amber-500 fill-amber-400 mt-0.5"
              />
            </div>

            <div className="mt-4 pl-2 space-y-2">
              <span
                className="text-3xl md:text-4xl font-extrabold text-emerald-950 block 
                tracking-tight"
              >
                {cat.percentage}%
              </span>

              <div className="w-full bg-emerald-200/50 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-1000 
                  ease-out"
                  style={{ width: `${cat.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="bg-slate-50 border-t border-b border-gray-100 p-8 flex flex-col 
        items-center justify-center text-center"
      >
        <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
          Calificación final
        </span>

        <div
          className={`w-36 h-36 rounded-full ${dictum.bg} text-white flex items-center 
          justify-center text-4xl font-black  shadow-inner transition-transform 
          duration-500 hover:scale-105 mb-4`}
        >
          {finalScore}%
        </div>

        <p
          className={`text-base md:text-lg font-bold ${dictum.color} tracking-tight`}
        >
          {dictum.text}
        </p>
      </div>

      <footer
        className="px-6 py-4 md:px-8 bg-white flex flex-col sm:flex-row 
        justify-between items-center gap-3"
      >
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 
          border-slate-700 text-slate-700 hover:bg-slate-50 font-bold px-5 py-2.5 
          rounded-xl transition-all active:scale-98 text-sm hover:cursor-pointer"
        >
          <RotateCcw size={16} />
          Volver a Auditar
        </button>

        <button
          type="button"
          onClick={onSave}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 
          hover:bg-slate-900 text-white font-bold px-6 py-3 rounded-xl transition-all 
          active:scale-98 shadow-md text-sm hover:cursor-pointer"
        >
          <Save size={16} />
          Guardar los resultados
        </button>
      </footer>
    </div>
  );
};
