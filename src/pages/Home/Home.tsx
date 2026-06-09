import { Factory, Wrench, Building2 } from "lucide-react";
import { ModuelCard } from "../../components/ModuleCard/ModuelCard";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const modules = [
    {
      id: "produccion",
      title: "Producción",
      icon: Factory,
      path: "/formulario-produccion",
    },
    {
      id: "perifericas",
      title: "Periféricas",
      icon: Wrench,
      path: "/formulario-perifericas",
    },
    {
      id: "oficinas",
      title: "Oficinas",
      icon: Building2,
      path: "/formulario-oficinas",
    },
  ];

  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-slate-50 flex flex-col justify-between items-center px-6 py-12
      antialiased selection:bg-sky-500 selection:text-white"
    >
      <div
        className="w-full max-w-5xl flex flex-col items-center justify-center grow gap-14
        architecture-fade-in"
      >
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Sistema de <span>Auditorías</span>
          </h1>
          <p
            className="text-slate-500 text-base md:text-lg font-normal max-w-md mx-auto 
            text-balance"
          >
            Selecciona el modulo que necesitas para comenzar
          </p>
        </header>
        <main className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {modules.map((module) => (
            <ModuelCard
              key={module.id}
              title={module.title}
              icon={module.icon}
              onClick={() => navigate(module.path)}
            />
          ))}
        </main>
      </div>

      <footer className="w-full text-center text-slate-400 text-sm mt-8 font-normal tracking-wide">
        Sistema de auditorías
      </footer>
    </div>
  );
};
