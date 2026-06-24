import { useState, useEffect } from "react";
import type { SCategory } from "../../data/auditQuestions";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";

interface Props {
  categories: SCategory[];
  initialAnswers?: Record<number, number>;
  onFinish: (answers: Record<number, number>) => void;
}

export const EvaluationWizard = ({
  categories,
  initialAnswers = {},
  onFinish,
}: Props) => {
  const [currentSIndex, setCurrentSIndex] = useState(0);
  const [answers, setAnswers] =
    useState<Record<number, number>>(initialAnswers);

  useEffect(() => {
    if (Object.keys(initialAnswers).length > 0) {
      setAnswers(initialAnswers);
    }
  }, [initialAnswers]);

  const currentCategory = categories[currentSIndex];

  const handleScoreSelect = (questionId: number, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const isCurrentSComplete = currentCategory.questions.every(
    (q) => answers[q.id] !== undefined,
  );

  const handleNext = () => {
    if (!isCurrentSComplete) return;

    if (currentSIndex < categories.length - 1) {
      setCurrentSIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onFinish(answers);
    }
  };

  const handleBack = () => {
    if (currentSIndex > 0) {
      setCurrentSIndex((prev) => prev - 1);
    }
  };

  return (
    <div
      className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border 
      border-gray-100 overflow-hidden font-sans transition-all duration-300 
      architecture-fade-in"
    >
      <header className="bg-slate-800 text-white p-6 md:p-8 text-left relative">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              {currentCategory.title}
            </h2>
            <p className="text-slate-300 text-xs md:text-sm mt-1">
              Califica cada aspecto del 1 al 5
            </p>
          </div>
          <span
            className="bg-slate-700 text-sky-400 font-mono text-xs md:text-sm 
            px-3 py-1.5 rounded-md font-bold"
          >
            S: {currentSIndex + 1} / {categories.length}
          </span>
        </div>
      </header>

      <div className="p-6 md:p-8 space-y-8">
        {currentCategory.questions.map((question, index) => {
          const selectedScore = answers[question.id];

          return (
            <div
              key={question.id}
              className="border-b border-gray-50 pb-6 last:border-none last:pb-0 
              architecture-fade-in"
            >
              <div className="flex items-start gap-4">
                <span
                  className="shrink-0 bg-slate-100 text-slate-700 font-bold 
                  rounded-full w-7 h-7 flex items-center justify-center text-sm mt-0.5"
                >
                  {index + 1}
                </span>

                <div className="space-y-4 w-full">
                  <p
                    className="text-slate-800 text-base md:text-[17px] font-normal 
                    leading-relaxed"
                  >
                    {question.text}
                  </p>

                  <div className="flex flex-wrap gap-3 pt-1">
                    {[1, 2, 3, 4, 5].map((score) => {
                      const isSelected = selectedScore === score;
                      return (
                        <button
                          key={score}
                          type="button"
                          onClick={() => handleScoreSelect(question.id, score)}
                          className={`
                            w-11 h-11 rounded-full border text-base font-medium flex items-center justify-center transition-all duration-200 active:scale-90 hover:cursor-pointer
                            ${isSelected ? "bg-slate-800 border-slate-800 text-white shadow-md font-bold" : "bg-white border-gray-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50"}
                          `}
                        >
                          {score}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <footer
        className="bg-slate-50 px-6 py-4 md:px-8 border-t border-gray-100 flex 
        justify-between items-center"
      >
        <button
          type="button"
          onClick={handleBack}
          disabled={currentSIndex === 0}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 
          hover:text-slate-800 disabled:opacity-0 disabled:pointer-events-none 
          transition-colors py-2 hover:cursor-pointer"
        >
          <ArrowLeft size={16} />
          Atrás
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!isCurrentSComplete}
          className={`flex items-center gap-2 text-sm font-semibold py-2.5 px-5 rounded-xl transition-all duration-200 shadow-sm ${
            isCurrentSComplete
              ? "bg-slate-800 hover:bg-slate-900 text-white active:scale-95 cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {currentSIndex === categories.length - 1 ? (
            <>
              Finalizar Auditoría
              <CheckCircle2 size={16} />
            </>
          ) : (
            <>
              Siguiente S
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </footer>
    </div>
  );
};
