import {
  LayoutGrid,
  Layers,
  HelpCircle,
  Users,
  ShieldCheck,
} from "lucide-react";
import { AdminCard } from "../../components/AdminCard/AdminCard";

export const Admin = () => {
  const managementModules = [
    {
      id: "modules",
      title: "Gestión de Módulos",
      description:
        "Configura y edita los módulos globales (Producción, Periféricas, Oficinas).",
      icon: LayoutGrid,
    },
    {
      id: "areas",
      title: "Gestión de Áreas y Líneas",
      description:
        "Da de alta, edita y liga las líneas de manufactura o departamentos a sus respectivos módulos.",
      icon: Layers,
    },
    {
      id: "questions",
      title: "Banco de Preguntas 5S",
      description:
        "Administra el catálogo de preguntas dinámicas asignándolas por módulo y tipo de S.",
      icon: HelpCircle,
    },
    {
      id: "auditors",
      title: "Control de Auditores",
      description:
        "Gestiona el personal autorizado para realizar los levantamientos de auditorías en planta.",
      icon: Users,
    },
  ];

  const handleNavigation = (targetId: string) => {
    console.log(`Navegando al panel de control de: ${targetId}`);
    // navigate(`/admin/${targetId}`);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 px-6 py-12 antialiased">
      <div className="w-full max-w-5xl mx-auto space-y-10 architecture-fade-in">
        <header
          className="flex flex-col sm:flex-row sm:items-center justify-between border-b 
          border-gray-200 pb-6 gap-4"
        >
          <div className="space-y-1 text-left">
            <h1
              className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center 
              gap-2.5"
            >
              Panel de Administración
            </h1>
            <p className="text-slate-500 text-sm font-normal">
              Configuración dinámica y catálogos globales para el sistema de
              auditorías 5S
            </p>
          </div>

          <div
            className="sm:self-center flex items-center gap-1.5 bg-slate-800 text-slate-100 
            px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase self-start shadow-sm"
          >
            <ShieldCheck size={14} className="text-sky-400" />
            Acceso Admin
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {managementModules.map((module) => (
            <AdminCard
              key={module.id}
              title={module.title}
              description={module.description}
              icon={module.icon}
              onClick={() => handleNavigation(module.id)}
            />
          ))}
        </main>
      </div>
    </div>
  );
};
