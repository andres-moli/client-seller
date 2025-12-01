// BiTrabajadorIndex.tsx
import React, { useMemo, useState } from "react";
import { DollarSign, Users, ClipboardList, MapPin, Eye, Download, RefreshCw } from "lucide-react";

import SalesByMonthChart from "./components/SalesByMonthChart";
import axios from "axios";
import VisitsYearChart from "./components/VisitsYearChart";
import { ProjectStatusCards } from "./components/ProjectStatusCards";
import { ClientesTable } from "./components/ClientesTable";
import MonthlyTarget from "./components/PresupuestoTarget";
import { useUser } from "../../context/UserContext";
import { useFindStatisticStatusProyectQuery, usePresupuestoVentaPorUsuarioQuery, useVentasPorVendedorQuery, useVisitasPorVendedorQuery } from "../../domain/graphql";

/**
 * TIPOS
 */
export type Cliente = {
  id: string;
  nombre: string;
  cotizaciones: number;
  proyectos: number;
  visitasHistoricas: { fecha: string; conVisita: boolean }[]; // registros de visitas
};

export type Trabajador = {
  id: string;
  nombre: string;
  fotoUrl?: string;
  totalVendido: number;
  clientes: Cliente[];
};

/**
 * UTIL - formateador de moneda
 */
const formatCurrency = (value: number, locale = "es-CO", currency = "COP") => {
  return value.toLocaleString(locale, { style: "currency", currency, maximumFractionDigits: 0 });
};

/**
 * DATOS MOCK (REEMPLAZAR CON TU API)
 */
export const sampleTrabajador: Trabajador = {
  id: "t1",
  nombre: "Yesid Mercado",
  totalVendido: 1543200,
  clientes: [
    {
      id: "c1",
      nombre: "Constructora Norte",
      cotizaciones: 5,
      proyectos: 2,
      visitasHistoricas: [
        { fecha: "2025-01-15", conVisita: true },
        { fecha: "2025-03-20", conVisita: true },
        { fecha: "2025-05-10", conVisita: false },
      ],
    },
    {
      id: "c2",
      nombre: "Inmobiliaria Sol",
      cotizaciones: 2,
      proyectos: 1,
      visitasHistoricas: [
        { fecha: "2025-02-11", conVisita: false },
        { fecha: "2025-06-02", conVisita: false },
      ],
    },
    {
      id: "c3",
      nombre: "Muebles & Co",
      cotizaciones: 8,
      proyectos: 4,
      visitasHistoricas: [
        { fecha: "2025-01-05", conVisita: true },
        { fecha: "2025-04-14", conVisita: true },
        { fecha: "2025-07-21", conVisita: true },
      ],
    },
  ],
};

/**
 * REUSABLES
 */
const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; emphasis?: boolean }> = ({ icon, label, value, emphasis }) => (
  <div className={`flex items-start gap-4 p-4 rounded-lg shadow-sm bg-white ${emphasis ? "ring-1 ring-indigo-50" : ""}`}>
    <div className="w-11 h-11 flex items-center justify-center rounded-md bg-gray-50">
      {icon}
    </div>
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-1 text-lg font-semibold text-gray-900">{value}</div>
    </div>
  </div>
);



/**
 * Componente: Visitas por mes (año)
 * - genera array de 12 meses con conteo de visitas (filtro por conVisita === true)
 * - muestra total en la cabecera
 */


/**
 * Componente: Ventas por mes (usa totalVendido como semilla si no hay series)
 * - Si tienes series reales, cámbialo por datos del backend
 * - Muestra total anual en la cabecera
 */



/**
 * Componente: ProfileCard pequeño (para la columna derecha)
 */
const ProfileMini: React.FC<{ trabajador: Trabajador; totalVendidoFormatted: string; totalCotizaciones: number }> = ({ trabajador, totalVendidoFormatted, totalCotizaciones }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm text-sm">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">
            {trabajador.nombre.charAt(0)}
        </div>
        <div>
          <div className="font-medium text-gray-900">{trabajador.nombre}</div>
          <div className="text-xs text-gray-500">ID <span className="font-mono">{trabajador.id}</span></div>
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-700">
        <div><strong>Total vendido:</strong> {totalVendidoFormatted}</div>
        <div className="mt-1"><strong>Cotizaciones:</strong> {totalCotizaciones}</div>
      </div>
    </div>
  );
};

/**
 * MAIN PAGE
 */
export const BiTrabajadorIndex: React.FC = () => {
  const {user} = useUser()
  const {data: dataUser, loading: loadingPuser} = usePresupuestoVentaPorUsuarioQuery({
    variables: {
      userId: user?.id || ''
    }
  })
  const name = user?.fullName || ''

  // Por ahora uso mockData; aquí podrías fetch(`/api/trabajadores/${params.trabajadorId}`)
  const trabajador: Trabajador = sampleTrabajador;
  const { data, loading } = useVentasPorVendedorQuery({
    variables: {
      input: {
        vendedor: user?.identificationNumber || '',
      },
    },
  });
  const {data: visitasData, loading: visitasLoading} = useVisitasPorVendedorQuery({
    variables: {
        workerNumber: user?.identificationNumber || '',
        year: new Date().getFullYear(),
    }
  });
 const { loading: loadingProyect, error, data: dataProyect } = useFindStatisticStatusProyectQuery({
    variables: { findStatisticStatusProyectId: user?.identificationNumber || '', }
  });
  // Datos derivados
  const totalVendidoFormatted = formatCurrency(data?.ventasPorVendedor.reduce((s, v) => s + v.venta, 0) || 0    );

  const [clientesVisitados, setClientesVisitados] = useState<number>(0);
  const [clientesNoVisitados, setClientesNoVisitados] = useState<number>(0);
  const [clienteConCotizacion, setClienteConCotizacion] = useState<number>(0);
  const [totalClientes, setTotalClientes] = useState<number>(0);
  const totalProyectos = dataProyect?.findStatisticStatusProyect?.reduce((s, p) => s + p.cantidad, 0) || 0;
  const [totalCotizaciones, setTotalCotizacion] = useState<number>(0)

  // Ventas por mes: si tu API trae series, reemplaza SalesByMonthChart para usar datos reales
  // Total visitas anual (sumado sobre clientes)
  const totalVisitasAno = visitasData?.visitasPorVendedor.reduce((s, v) => s + v.visitas, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Notion frame container */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">
                {name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{name}</h1>
              <p className="text-sm text-gray-500">
                Todos los datos corresponde al año 
                <span className="font-mono text-xs ml-2">{new Date().getFullYear()}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md border bg-white hover:shadow-sm text-sm">
              <RefreshCw size={16} /> Actualizar
            </button>
            <div className="text-sm text-gray-500">Últ actualización • hoy</div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left column: principales métricas (span 1-3 cols responsivamente) */}
          <div className="lg:col-span-3 space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={<DollarSign size={20} />} label="Total vendido" value={totalVendidoFormatted} emphasis />
              <StatCard icon={<ClipboardList size={20} />} label="Cotizaciones" value={totalCotizaciones} />
              <StatCard icon={<Users size={20} />} label="Clientes" value={totalClientes} />
              <StatCard icon={<ClipboardList size={20} />} label="Proyectos totales" value={totalProyectos} />
            </div>

            {/* Charts: Visitas + Ventas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-4">
                {/* Visitas */}
                <VisitsYearChart data={visitasData} />
                {
                    loading ? (
                        <p className="text-gray-500 italic">Cargando datos de ventas...</p>
                    ) : (
                        <SalesByMonthChart data={data} />
                    )
                }
                {/* Ventas por mes */}
              </div>

              {/* Right mini panel showing totals and actions */}
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Datos generales</h4>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">Clientes visitados</div>
                    <div className="text-sm font-semibold">{clientesVisitados}</div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-xs text-gray-500">Clientes no visitados</div>
                    <div className="text-sm font-semibold">{clientesNoVisitados}</div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-xs text-gray-500">Clientes con cotización</div>
                    <div className="text-sm font-semibold">{clienteConCotizacion}</div>
                  </div>
                  <div className="mt-3 border-t pt-3">
                    <div className="text-xs text-gray-500">Visitas totales (año)</div>
                    <div className="text-lg font-semibold text-gray-900">{totalVisitasAno}</div>
                  </div>

                  <div className="mt-4">
                    <a href="#" className="text-sm text-indigo-600 hover:underline">Ver historial detallado →</a>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Acciones</h4>
                  <div className="flex flex-col gap-2">
                    <button className="w-full inline-flex items-center gap-2 justify-center px-3 py-2 rounded-md border">Programar visita</button>
                    <button className="w-full inline-flex items-center gap-2 justify-center px-3 py-2 rounded-md bg-indigo-600 text-white">Crear cotización</button>
                  </div>
                </div>
              </div>
            </div>



          </div>

          {/* Right column: perfil rápido / filtros */}
        <aside className="hidden lg:block w-80">
        <div className="p-4 space-y-4">
            
            <ProfileMini
            trabajador={trabajador}
            totalVendidoFormatted={totalVendidoFormatted}
            totalCotizaciones={totalCotizaciones}
            />

            <ProjectStatusCards
                data={dataProyect}
                loading={loadingProyect}
            />

        </div>
        </aside>

        </div>
        <div>
          <MonthlyTarget 
            data={dataUser}
            loading={loadingPuser}
          />
        </div>
      </div>
      {/* Tabla / lista de clientes */}
      <div className="w-full overflow-x-auto">
        <ClientesTable 
        vendedor={user?.identificationNumber || ''} 
        setClientesNoVisitados={setClientesNoVisitados}  setClientesVisitados={setClientesVisitados}
        setTotalClientes={setTotalClientes}
        setTotalCotizacion={setTotalCotizacion}
        setClientesConCotizacion={setClienteConCotizacion}
        />
      </div>
    </div>
  );
};

export default BiTrabajadorIndex;
