
import { type ClassValue, clsx } from "clsx"
import { GraphQLError } from "graphql";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"
export const formatCurrency = (value: number) =>
  value.toLocaleString("es-CO", { style: "currency", currency: "COP" });
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Raises an error alert for graph fetchs
 * @param request
 * @returns
 */
type IToastyErrorGraph = { [key: string]: any }; // GraphQLError | { "response": { "errors": GraphQLError } }
export const ToastyErrorGraph = (request: IToastyErrorGraph) => {
  if (request.response && request.response.errors) {
    const error: GraphQLError[] = request.response.errors;
    const message = error.map(({ message }) => `${message}`)[0];
    // ToastyAlert.fire(message.replace('👮‍♂', ''), undefined, "error")
    toast.error(message);
    return true;
  }
  if (request.message as GraphQLError) {
    // ToastyAlert.fire(request.message.replace('👮‍♂', ''), undefined, "error")
    toast.error(request.message);
    return true;
  }
  return false;
};

export const findCommission = async (saleAmount: number, profitPercentage: number, type: string, month: string) => {
  if (!saleAmount || !profitPercentage) {
    return "Por favor ingresa valores para buscar.";
  }

  // Llamar al servicio para obtener las columnas y los datos con el tipo y mes
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_GRAPH}commissions/getConfigurationByTypeMonth/${type}/${month}`);
    if (!response.ok) {
      throw new Error('No se pudo obtener la configuración de comisiones.');
    }

    const jsonResponse = await response.json(); // Desestructuramos los datos de la respuesta
    const { columns, data } = JSON.parse(jsonResponse.jsonData)

    const sale = saleAmount;
    const profit = profitPercentage;

    // Buscar la fila correcta según el monto de venta
    const row = data.find((row: any) => {
      const min = parseFloat(row.min);
      const max = row.max === "adelante" ? Infinity : parseFloat(row.max);
      return sale >= min && sale <= max;
    });

    if (!row) {
      return "No se encontró un rango válido para el monto de venta.";
    }

    // Buscar la columna que tiene el porcentaje dentro del rango permitido
    const column = columns.find((col: any) => {
      const minProfit = parseFloat(col.minProfit);
      const maxProfit = col.maxProfit === "adelante" ? Infinity : parseFloat(col.maxProfit);
      return profit >= minProfit && profit <= maxProfit;
    });

    if (!column) {
      return "El porcentaje de utilidad está fuera del rango permitido.";
    }

    const commissionValue = row[column.id] || "0";
    return `Porcentaje de ganancia: ${commissionValue} total a pagar ${formatCurrency(Number(saleAmount) * Number(commissionValue) / 100)}`;
  } catch (error) {
    console.error("Error al obtener datos de comisiones:", error);
    return "Hubo un error al obtener los datos de comisiones.";
  }
};
