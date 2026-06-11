import {
  LayoutGrid,
  Layers,
  HelpCircle,
  Users,
  ShieldCheck,
  FileSpreadsheet,
} from "lucide-react";
import { AdminCard } from "../../components/AdminCard/AdminCard";
import { useNavigate } from "react-router-dom";

export const Admin = () => {
  const navigate = useNavigate();

  const mainModule = {
    id: "audits-history",
    title: "Historial de Auditorías 5S",
    description:
      "Consulta la bitácora completa de levantamientos en planta, aplica filtros por auditor o fecha y descarga los reportes consolidados en Excel.",
    icon: FileSpreadsheet,
    path: "/administrador/auditorias",
  };

  const catalogModules = [
    {
      id: "modules",
      title: "Gestión de Módulos",
      description:
        "Configura y edita los módulos globales (Producción, Periféricas, Oficinas).",
      icon: LayoutGrid,
      path: "/administrador/modulos",
    },
    {
      id: "areas",
      title: "Gestión de Áreas y Líneas",
      description:
        "Da de alta, edita y liga las líneas de manufactura o departamentos a sus respectivos módulos.",
      icon: Layers,
      path: "/administrador/areas",
    },
    {
      id: "questions",
      title: "Banco de Preguntas 5S",
      description:
        "Administra el catálogo de preguntas dinámicas asignándolas por módulo y tipo de S.",
      icon: HelpCircle,
      path: "/administrador/preguntas",
    },
    {
      id: "auditors",
      title: "Control de Auditores",
      description:
        "Gestiona el personal autorizado para realizar los levantamientos de auditorías en planta.",
      icon: Users,
      path: "/administrador/auditores",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 px-6 py-12 antialiased">
      <div className="w-full max-w-5xl mx-auto space-y-8 architecture-fade-in">
        <header
          className="flex flex-col sm:flex-row sm:items-center justify-between 
          border-b border-gray-200 pb-6 gap-4"
        >
          <div className="space-y-1 text-left">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Panel de Administración
            </h1>
            <p className="text-slate-500 text-sm font-normal">
              Configuración dinámica, catálogos globales y revisión de
              resultados para MesaCore
            </p>
          </div>

          <div
            className="sm:self-center flex items-center gap-1.5 bg-slate-800 
            text-slate-100 px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase 
            self-start shadow-sm"
          >
            <ShieldCheck size={14} className="text-sky-400" />
            Acceso Admin
          </div>
        </header>

        <main className="space-y-8">
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-1 text-left">
              Operación Principal
            </h2>
            <div className="w-full">
              <AdminCard
                title={mainModule.title}
                description={mainModule.description}
                icon={mainModule.icon}
                onClick={() => navigate(mainModule.path)}
              />
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-1 text-left">
              Catálogos de Configuración Básica
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {catalogModules.map((module) => (
                <AdminCard
                  key={module.id}
                  title={module.title}
                  description={module.description}
                  icon={module.icon}
                  onClick={() => navigate(module.path)}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
