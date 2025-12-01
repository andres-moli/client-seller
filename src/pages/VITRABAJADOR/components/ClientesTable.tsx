import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { formatCurrency } from "../../../lib/utils";

interface ClienteAPI {
  nit: string;
  nombre: string;
  cantidad_cotizaciones: number;
  valor_cotizado: number;
  cantidad_facturas: number;
  valor_facturado: number;
  visitado: boolean;
  numeroVisitas: number;
}

const Tag: React.FC<{ children: React.ReactNode; tone?: "muted" | "success" | "danger" }> = ({ children, tone = "muted" }) => {
  const classes = {
    muted: "bg-gray-100 text-gray-700",
    success: "bg-green-100 text-green-800",
    danger: "bg-red-100 text-red-800",
  }[tone];
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${classes}`}>{children}</span>;
};

export const ClientesTable: React.FC<{ 
  vendedor: string;
  setClientesVisitados?: (count: number) => void;
  setClientesNoVisitados?: (count: number) => void;
  setTotalClientes?: (count: number) => void;
  setTotalCotizacion?: (count: number) => void;
  setClientesConCotizacion?: (count: number) => void;
}> = ({ vendedor, setClientesNoVisitados, setClientesVisitados, setTotalClientes, setTotalCotizacion, setClientesConCotizacion }) => {
  const [clientes, setClientes] = useState<ClienteAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  // Estados para filtros por columna
  const [filters, setFilters] = useState({
    nombre: "",
    nit: "",
    cotizaciones: "",
    facturas: "",
    visitado: "todos",
  });

  const [sort, setSort] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const URL = `${import.meta.env.VITE_APP_GRAPH}visit/clientes/${vendedor}/${dayjs().startOf('year').format('YYYY-MM-DD')}/${dayjs().endOf('year').format('YYYY-MM-DD')}`;

  // Fetch
  const fetchClientes = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<ClienteAPI[]>(URL);
      setClientes(data);
      setClientesVisitados && setClientesVisitados(data.filter(c => c.visitado).length);
      setClientesNoVisitados && setClientesNoVisitados(data.filter(c => !c.visitado).length);
      setClientesConCotizacion && setClientesConCotizacion(data.filter(c => c.cantidad_cotizaciones).length);
      setTotalClientes && setTotalClientes(data.length);
      if(setTotalCotizacion){
        const totalCotizaciones = data.reduce((s, v) => s + v.cantidad_cotizaciones, 0) || 0
        setTotalCotizacion(totalCotizaciones)
      }
    } catch (err) {
      setError("Error al cargar los clientes.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  // Ordenamiento
  const handleSort = (key: string) => {
    setSort((current) =>
      current?.key === key
        ? { key, direction: current.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  // Filtrado, búsqueda y ordenamiento
  const filtered = useMemo(() => {
    let data = [...clientes];

    // Buscar por columnas
    data = data.filter((c) => {
      const visitado = c.visitado;

      return (
        c.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) &&
        c.nit.includes(filters.nit) &&
        (filters.cotizaciones === "" ||
          c.cantidad_cotizaciones === Number(filters.cotizaciones)) &&
        (filters.facturas === "" ||
          c.cantidad_facturas === Number(filters.facturas)) &&
        (filters.visitado === "todos" ||
          (filters.visitado === "si" && visitado) ||
          (filters.visitado === "no" && !visitado))
      );
    });

    // Ordenamiento
    if (sort) {
      data.sort((a: any, b: any) => {
        if (a[sort.key] < b[sort.key]) return sort.direction === "asc" ? -1 : 1;
        if (a[sort.key] > b[sort.key]) return sort.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [clientes, filters, sort]);

  const totalPages = Math.ceil(filtered.length / pageSize);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);
  const onNavigate = (to: string) => {
    navigate(to);
  };
  if (loading) return <div className="p-4">Cargando clientes...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">Clientes</h3>
        <p className="text-sm text-gray-500">Tabla profesional con filtros avanzados.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            {/* Encabezados con sort */}
            <tr>
              {[
                {key: "item", label: "#"},
                { key: "nombre", label: "Nombre" },
                { key: "nit", label: "NIT" },
                { key: "cantidad_cotizaciones", label: "Cotizaciones" },
                { key: "valor_cotizado", label: "Valor Cotizado" },
                { key: "cantidad_facturas", label: "Facturas" },
                { key: "valor_facturado", label: "Valor Facturado" },
                { key: "visitado", label: "Visitado" },
                { key: "numeroVisitas", label: "N° Visitas" },
                { label: "Acciones" },
              ].map((col) => (
                <th
                  key={col.key ?? col.label}
                  className="px-3 py-2 cursor-pointer select-none"
                  onClick={() => col.key && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1 uppercase text-xs text-gray-500">
                    {col.label}
                    {sort?.key === col.key && (
                      <span>{sort?.direction === "asc" ? "▲" : "▼"}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>

            {/* Filtros debajo de los encabezados */}
            <tr className="bg-gray-50">
              <th className="px-2 py-1">
                <input
                  className="w-full border px-2 py-1 rounded text-xs"
                  placeholder="Filtrar..."
                  value={filters.nombre}
                  onChange={(e) => setFilters((s) => ({ ...s, nombre: e.target.value }))}
                />
              </th>

              <th className="px-2 py-1">
                <input
                  className="w-full border px-2 py-1 rounded text-xs"
                  placeholder="Filtrar..."
                  value={filters.nit}
                  onChange={(e) => setFilters((s) => ({ ...s, nit: e.target.value }))}
                />
              </th>

              <th className="px-2 py-1">
                <input
                  className="w-full border px-2 py-1 rounded text-xs"
                  placeholder="="
                  value={filters.cotizaciones}
                  onChange={(e) => setFilters((s) => ({ ...s, cotizaciones: e.target.value }))}
                />
              </th>

              <th></th>

              <th className="px-2 py-1">
                <input
                  className="w-full border px-2 py-1 rounded text-xs"
                  placeholder="="
                  value={filters.facturas}
                  onChange={(e) => setFilters((s) => ({ ...s, facturas: e.target.value }))}
                />
              </th>

              <th></th>

              <th className="px-2 py-1">
                <select
                  className="text-xs border px-2 py-1 rounded"
                  value={filters.visitado}
                  onChange={(e) => setFilters((s) => ({ ...s, visitado: e.target.value }))}
                >
                  <option value="todos">Todos</option>
                  <option value="si">Visitado</option>
                  <option value="no">No visitado</option>
                </select>
              </th>

              <th></th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {paginated.map((c, index) => {
              return (
                <tr key={c.nit} className="hover:bg-gray-50">
                  <td className="px-3 py-1" width={20}>{index + 1}</td>
                  <td className="px-3 py-2">{c.nombre}</td>
                  <td className="px-3 py-2">{c.nit}</td>
                  <td className="px-3 py-2">{c.cantidad_cotizaciones}</td>
                  <td className="px-3 py-2">{formatCurrency(c.valor_cotizado)}</td>
                  <td className="px-3 py-2">{c.cantidad_facturas}</td>
                  <td className="px-3 py-2">{formatCurrency(c.valor_facturado)}</td>

                  <td className="px-3 py-2">
                    {c.visitado ? <Tag tone="success">Visitado</Tag> : <Tag tone="danger">No visitado</Tag>}
                  </td>
                  <td className="px-3 py-2">{c.numeroVisitas}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      {/* <button className="border px-3 py-1 rounded">Ver</button> */}
                      <button className="bg-indigo-600 text-white px-3 py-1 rounded" 
                        onClick={() => onNavigate(`/vi-trabajador-client/${c.nit}?value=${c.valor_facturado}`)}>
                        Ver
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-between items-center p-3 border-t bg-gray-50">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Anterior
        </button>

        <span className="text-sm">
          Página <strong>{page}</strong> de <strong>{totalPages}</strong>
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
