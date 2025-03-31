import { Option } from "../../components/form/selectSeach";

export enum TipoProyectoEnum {
    CABLEADO_ESTRUCTURADO = "CABLEADO ESTRUCTURADO",
    CCTV = "CCTV",
    DETECCION_INCENDIO = "DETECCION DE INCENDIO",
    CABLEADO_ELECTRICO = "CABLEADO ELECTRICO",
    ILUMINACION = "ILUMINACION",
    EQUIPOS_ACTIVOS = "EQUIPOS ACTIVOS",
    FIBRA_OPTICA = "FIBRA OPTICA",
    BANDEJAS_PORTACABLE = "BANDEJAS PORTACABLE",
    CONTROL_ACCESO = "CONTROL DE ACCESO",
    CANALIZACION = "CANALIZACION",
    UPS = "UPS"
}
export const tipoProyectoOptions: Option[] = Object.values(TipoProyectoEnum).map((value) => ({
    label: value,
    value: value
}));
export enum FabricanteEnum {
    COMMSCOPE = "COMMSCOPE",
    REJIBAND = "REJIBAND",
    HONEYWELL = "HONEYWELL",
    NETLINK = "NETLINK",
    CISCO = "CISCO",
    DEXSON = "DEXSON",
    SCHNEIDER = "SCHNEIDER",
    TRENDNET = "TRENDNET",
    NEXANS = "NEXANS",
    TITAN = "TITAN",
    HEWLETT_PACKARD = "HEWLETT PACKARD",
    HIKVISION = "HIKVISION",
    OPTRAL = "OPTRAL",
    KIDDE = "KIDDE",
    SYLVANIA = "SYLVANIA",
    TIGRE = "TIGRE",
    PROCABLES = "PROCABLES",
    LEGRAND = "LEGRAND",
    VERTIV = "VERTIV"
}
export const fabricanteOptions: Option[] = Object.values(FabricanteEnum).map((value) => ({
    label: value,
    value: value
}));
export enum TipoCableadoEnum {
    CABLEADO_CAT_6 = "CABLEADO CAT 6",
    CABLEADO_CAT_6A = "CABLEADO CAT 6A",
    CABLEADO_CAT_7A = "CABLEADO CAT 7A",
    CABLEADO_CAT_8 = "CABLEADO CAT 8",
    FX_80 = "FX-80",
    FX_1000 = "FX-1000",
    VIGILANT = "VIGILANT",
    ST3 = "ST3",
    CAMARAS_IP = "CAMARAS IP",
    CAMARAS_ANALOGAS = "CAMARAS ANALOGAS",
    CONTROL_ACCESO = "CONTROL DE ACCESO",
    HIKCENTRAL = "HIKCENTRAL",
    ELECTROZINCADA = "ELECTROZINCADA",
    C8 = "C8",
    GALBANIZADO_CALIENTE = "GALBANIZADO CALIENTE",
    ACERO = "ACERO",
    TUBOS_RLH = "TUBOS RLH",
    CABLES_ELECTRICOS = "CABLES ELECTRICOS"
}
export const tipoCableadoOptions: Option[] = Object.values(TipoCableadoEnum).map((value) => ({
    label: value,
    value: value
}));