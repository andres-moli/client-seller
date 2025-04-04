import { User } from "../../../domain/graphql";


interface FacturaValida {
    clienteNombre: string;
    numeroFactura: string;
    fecha: string;  // ISO 8601 date string
    valorCosto: number;
    valorCostoReal: number;
    valorVenta: number;
    utilidadReal: number;
    utilidadRealPorcentaje: number;
    valorFlete: number;
    valorOip: number;
    valorBack: number;
    comision: number;
}

interface Totalizado {
    totalVendido: number;
    totalCosto: number;
    totalFlete: number;
    totalOip: number;
    totalBack: number;
    utilidad: number;
    utilidadPorcentaje: number;
    totalComision: number;
    totalCostoReal: number;
    totalRodamiento: number;
    comisionTable: number;
}
interface Interno {
    totalVentasGrupo: number;
    totalCostoGrupo: number;
    comisionTable: number;
    comision: number;
    totalFleteGrupo: number;
    totalOipGrupo: number;
    totalBackComisionGrupo: number;
    totalCostoRealGrupo: number;
    utilidadReal: number;
    utilidadRealPorcentaje: number
}
export interface UsuarioFacturas {
    user?: User;
    facturasValide: FacturaValida[];
    totalizado: Totalizado;
    externo?: Interno,
    presupuesto?: any
}
  