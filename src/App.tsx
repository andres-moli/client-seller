import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import ProyectPage from "./pages/proyect";
import CotizacionPage from "./pages/cotizacion";
import TaskPage from "./pages/task";
import CreateProyecto from "./pages/proyect/CreateProyect";
import ViewProyecto from "./pages/proyect/viewProyect";
import IndexProyectView from "./pages/proyect/indexProyect";
import ClientePage from "./pages/client";
import ViewCotizacionPage from "./pages/cotizacion/ViewCotizacion";
import { CalendarMainPage } from "./pages/calendar/calendarMain";
import { LoagerPage } from "./pages/AuthPages/looager";
import IndexClientView from "./pages/client/indexClient";
import VentasPage from "./pages/ventas";
import ClassesPage from "./pages/class";
import BiTrabajadorIndex from "./pages/VITRABAJADOR/BiTrabajadorIndex";
import BiTrabajadorClientIndex from "./pages/VITRABAJADOR/BiTabajadorClientIndex";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route path="/looger/:token"  element={<LoagerPage />}/>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<CalendarMainPage />} />
            <Route path="/proyect" element={<ProyectPage />} />
            <Route path="/client" element={<ClientePage />} />
            <Route path="/view-client/:id" element={<IndexClientView />} />
            <Route path="/create-proyect" element={<CreateProyecto />} />
            <Route path="/view-proyect/:id" element={<IndexProyectView />} />
            <Route path="/cotizacion" element={<CotizacionPage />} />
            <Route path="/view-cotizacion/:id" element={<ViewCotizacionPage />} />
            <Route path="/task" element={<TaskPage />} />
            <Route path="/ventas" element={<VentasPage />} />
            <Route path="/class" element={<ClassesPage />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="vi-trabajador" element={<BiTrabajadorIndex />} />
            <Route path="vi-trabajador-client/:clienteId" element={<BiTrabajadorClientIndex />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
