// src/components/EmbudoVentas/EmbudoVentas.tsx
import React from 'react';
import { ResponsiveFunnel } from '@nivo/funnel';
import { ProyectoEmbudoDto, ProyectosStatusEnum, useFindStatisticStatusProyectQuery } from '../../domain/graphql';
import { useUser } from '../../context/UserContext';
import { formatCurrency } from '../../lib/utils';

const ordenEmbudo: ProyectosStatusEnum[] = [
    ProyectosStatusEnum.Presentacion,
    ProyectosStatusEnum.Propuesta,
    ProyectosStatusEnum.Exploracion,
    ProyectosStatusEnum.Negociacion,
    ProyectosStatusEnum.GanadoCerrado,
];

const EmbudoVentas: React.FC = () => {
    const { user } = useUser();
    const { loading, error, data } = useFindStatisticStatusProyectQuery({
        variables: {
            findStatisticStatusProyectId: user?.id || ''
        }
    });

    if (loading) return (
        <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03] mt-6 p-6 dark:text-gray-300">
            <div className="h-64 flex items-center justify-center">
                Cargando datos del embudo...
            </div>
        </div>
    );

    if (error) return (
        <div className="dark:text-gray-300 rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03] mt-6 p-6">
            <div className="h-64 flex items-center justify-center text-red-500">
                Error: {error.message}
            </div>
        </div>
    );

    const procesarDatosEmbudo = (): { id: string; value: number; label: string }[] => {
        if (!data?.findStatisticStatusProyect) return [];

        // Ordenar según el orden del embudo
        return ordenEmbudo
            .map(estado => {
                const dato = data.findStatisticStatusProyect.find(d => d.estado === estado);
                return dato ? {
                    id: estado,
                    value: dato.valorTotal,
                    label: `${estado} (${dato.cantidad}) - ${formatCurrency(dato.valorTotal)}`
                } : null;
            })
            .filter(Boolean) as { id: string; value: number; label: string }[];
    };

    const datosEmbudo = procesarDatosEmbudo();

    return (
        <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03] mt-6 overflow-hidden">
            <div className="bg-white shadow-default rounded-2xl dark:bg-gray-900 p-6">
                <h2 className="text-lg font-semibold mb-4 dark:text-gray-300">Embudo de Ventas</h2>
                
                {datosEmbudo.length > 0 ? (
                    <div className="h-[400px] w-full"> {/* Contenedor con altura fija */}
                        <ResponsiveFunnel
                            data={datosEmbudo}
                            margin={{ top: 40, right: 60, bottom: 80, left: 60 }}
                            valueFormat=">-.0f"
                            colors={{ scheme: 'nivo' }}
                            borderWidth={20}
                            borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
                            labelColor={{ from: 'color', modifiers: [['darker', 1.5]] }}
                            motionConfig="gentle"
                            theme={{
                                labels: {
                                    text: {
                                        fontSize: 12,
                                        fontWeight: 600,
                                    }
                                }
                            }}
                        />
                    </div>
                ) : (
                    <div className="h-64 flex items-center justify-center text-gray-500">
                        No hay datos para mostrar el embudo
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmbudoVentas;