
import React from "react";
import { FindStatisticStatusProyectQuery, ProyectosStatusEnum } from "../../../domain/graphql";
import { formatCurrency } from "../../../lib/utils";

interface Props {
  data: FindStatisticStatusProyectQuery | undefined;
  loading: boolean;
}

//@ts-ignore
const colors: Record<ProyectosStatusEnum, string> = {
  [ProyectosStatusEnum.Presentacion]:
    "bg-blue-100 text-blue-800 border-blue-300",
  [ProyectosStatusEnum.Propuesta]:
    "bg-indigo-100 text-indigo-800 border-indigo-300",
  [ProyectosStatusEnum.Exploracion]:
    "bg-yellow-100 text-yellow-800 border-yellow-300",
  [ProyectosStatusEnum.Negociacion]:
    "bg-orange-100 text-orange-800 border-orange-300",
  [ProyectosStatusEnum.GanadoCerrado]:
    "bg-green-100 text-green-800 border-green-300",
  [ ProyectosStatusEnum.Cancelado ]:
    "bg-red-100 text-red-800 border-red-300",
};

// Quitar _ y poner formato más legible
const normalizeLabel = (estado: string) =>
  estado
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/^\w/, c => c.toUpperCase());

export const ProjectStatusCards: React.FC<Props> = ({ data, loading }) => {
  if (loading)
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );

  const procesarDatos = () => {
    if (!data?.findStatisticStatusProyect) return [];

    const ordenEmbudo: ProyectosStatusEnum[] = [
      ProyectosStatusEnum.Presentacion,
      ProyectosStatusEnum.Propuesta,
      ProyectosStatusEnum.Exploracion,
      ProyectosStatusEnum.Negociacion,
      ProyectosStatusEnum.GanadoCerrado
    ];

    return ordenEmbudo
      .map(estado => {
        const estadoData = data.findStatisticStatusProyect.find(
          d => d.estado === estado
        );

        return estadoData
          ? {
              estado,
              cantidad: estadoData.cantidad,
              valor: estadoData.valorTotal
            }
          : null;
      })
      .filter(Boolean) as {
      estado: ProyectosStatusEnum;
      cantidad: number;
      valor: number;
    }[];
  };

  const cards = procesarDatos();

  return (
    <div className="space-y-4">
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Estado de proyectos
        </h4>

        {cards.length === 0 && (
          <p className="text-gray-500 text-sm">No hay datos disponibles.</p>
        )}

        <div className="grid grid-cols-1 gap-3">
          {cards.map(card => (
            <div
              key={card.estado}
              className={`border rounded-lg p-3 flex flex-col gap-1 ${
                colors[card.estado]
              }`}
            >
              <div className="font-medium">
                {normalizeLabel(card.estado)}
              </div>

              <div className="text-xs opacity-80">
                {card.cantidad} proyecto(s)
              </div>

              <div className="text-sm font-semibold">
                {formatCurrency(card.valor)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
