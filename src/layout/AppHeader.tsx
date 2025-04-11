import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useSidebar } from "../context/SidebarContext";
import { ThemeToggleButton } from "../components/common/ThemeToggleButton";
import NotificationDropdown from "../components/header/NotificationDropdown";
import UserDropdown from "../components/header/UserDropdown";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { formatCurrency } from "../lib/utils";

const API_BASE_URL = `${import.meta.env.VITE_APP_GRAPH}fletes/ventasAgrupadasXmes`;

const AppHeader: React.FC = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const inputRef = useRef<HTMLInputElement>(null);
  const [precioDolar, setPrecioDolar] = useState<number | null>(0);
  const [totalVentas, setTotalVentas] = useState<number | null>();
  const [utilidad, setUtilidad] = useState<number>(0);

  const handleToggle = () => {
    if (window.innerWidth >= 991) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resDolar = await fetch(
          `https://www.datos.gov.co/resource/mcec-87by.json?vigenciahasta=${dayjs().format("YYYY-MM-DD")}`
        );
        const dataDolar = await resDolar.json();
        setPrecioDolar(dataDolar?.[0]?.valor || 0);

        const resVentas = await fetch(`${API_BASE_URL}`);
        const dataVentas = await resVentas.json();
        const mesActual = new Date().getMonth() + 1;
        const mesData = dataVentas.find(
          (mes: any) => parseInt(mes.numero_mes) === mesActual
        );

        setTotalVentas(mesData?.venta || 0);
        setUtilidad(mesData?.utilidad_porcentaje || 0);
      } catch (error) {
        console.error("Error obteniendo los datos", error);
      }
    };
    fetchData();
  }, []);

  return (
    <header className="sticky top-0 z-99999 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      
      {/* 🧩 Fila principal (hamburguesa, logo, y botonera derecha TODO en una sola línea) */}
      <div className="flex items-center justify-between w-full px-3 py-3 lg:px-6 lg:py-4 border-b border-gray-200 dark:border-gray-800">
        {/* Izquierda: Hamburguesa + logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleToggle}
            className="w-10 h-10 lg:w-11 lg:h-11 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 lg:border"
            aria-label="Toggle Sidebar"
          >
            {/* icono hamburguesa */}
            {isMobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.22 7.28a.75.75 0 011.06 0L12 11.94l4.72-4.72a.75.75 0 111.06 1.06L13.06 12l4.72 4.72a.75.75 0 11-1.06 1.06L12 13.06l-4.72 4.72a.75.75 0 01-1.06-1.06L10.94 12 6.22 7.28a.75.75 0 010-1.06z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M.58 1A.75.75 0 011.33.25h13.33a.75.75 0 010 1.5H1.33A.75.75 0 01.58 1zm0 10a.75.75 0 01.75-.75h13.33a.75.75 0 010 1.5H1.33a.75.75 0 01-.75-.75zm.75-5.75a.75.75 0 100 1.5H8a.75.75 0 000-1.5H1.33z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
  
          <Link to="/" className="lg:hidden">
            <img src="./images/logo/cytech.png" alt="Logo" className="dark:hidden" />
            <img src="./images/logo/cytech.png" alt="Logo" className="hidden dark:block" />
          </Link>
        </div>
  
        {/* Derecha: Botonera completa */}
        <div className="flex items-center gap-3">
          <ThemeToggleButton />
          <NotificationDropdown />
          <UserDropdown />
        </div>
      </div>
  
      {/* 📊 Info de dólar, fecha, ventas, utilidad */}
      <div className="w-full px-3 lg:px-6 pb-2 mt-2">
        <div className="w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-md px-4 py-2 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4 text-sm overflow-x-auto whitespace-nowrap">
          <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            <span className="text-gray-600 dark:text-gray-300">Dólar hoy:</span>
            <span className="font-bold text-green-600 dark:text-green-400">{precioDolar}</span>
          </div>
  
          <div className="flex items-center gap-2">
            <span className="text-gray-600 dark:text-gray-300">Fecha:</span>
            <span className="font-bold text-gray-600 dark:text-gray-300">
              {dayjs().locale("es").format("dddd, D [de] MMMM YYYY")}
            </span>
          </div>
  
          <div className="flex items-center gap-2">
            <span className="text-gray-600 dark:text-gray-300">Ventas Cytech:</span>
            <span className="font-bold text-gray-600 dark:text-gray-400">
              {totalVentas ? formatCurrency(+totalVentas) : 0}
            </span>
          </div>
  
          <div className="flex items-center gap-2">
            <span className="text-gray-600 dark:text-gray-300">Utilidad Cytech:</span>
            <span className="font-bold text-gray-600 dark:text-gray-300">{utilidad}%</span>
          </div>
  
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Actualizado: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </header>
  );
  
};

export default AppHeader;
