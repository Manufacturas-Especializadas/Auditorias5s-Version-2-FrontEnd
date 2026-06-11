import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Production } from "../pages/Production/Production";
import { Peripherals } from "../pages/Peripherals/Peripherals";
import { Offices } from "../pages/Offices/Offices";
import { Admin } from "../pages/Admin/Admin";
import { Modules } from "../pages/Admin/Modules/Modules";
import { Areas } from "../pages/Admin/Areas/Areas";
import { Questions } from "../pages/Admin/Questions/Questions";
import { Auditors } from "../pages/Admin/Auditors/Auditors";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Produccion */}
      <Route path="/formulario-produccion" element={<Production />} />

      {/* Perifericas */}
      <Route path="/formulario-perifericas" element={<Peripherals />} />

      {/* Oficinas */}
      <Route path="/formulario-oficinas" element={<Offices />} />

      {/* Administrador */}
      <Route path="/administrador" element={<Admin />} />
      <Route path="/administrador/modulos" element={<Modules />} />
      <Route path="/administrador/areas" element={<Areas />} />
      <Route path="/administrador/preguntas" element={<Questions />} />
      <Route path="/administrador/auditores" element={<Auditors />} />
    </Routes>
  );
};
