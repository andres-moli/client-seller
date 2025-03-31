import { VectorMap } from "@react-jvectormap/core";
import { coMerc } from "@react-jvectormap/colombia";

interface VentasPorVendedorDepartamento {
  vendedor: string;
  departamento: string;
  venta: number;
  costo: number;
  oip: number;
  flete: number;
  back: number;
  utilidad: number;
  utilidad_porcentaje: number;
}

interface ColombiaMapProps {
  ventas: VentasPorVendedorDepartamento[];
}

const departamentosColombia = [
  { nombre: "Amazonas", lat: -1.4429, lng: -71.5724 },
  { nombre: "Antioquia", lat: 6.2442, lng: -75.5812 },
  { nombre: "Arauca", lat: 7.0847, lng: -70.7591 },
  { nombre: "Atlántico", lat: 10.9685, lng: -74.7813 },
  { nombre: "Bolívar", lat: 9.2421, lng: -74.3587 },
  { nombre: "Boyacá", lat: 5.4545, lng: -73.362 },
  { nombre: "Caldas", lat: 5.2983, lng: -75.2479 },
  { nombre: "Caquetá", lat: 0.8699, lng: -73.8419 },
  { nombre: "Casanare", lat: 5.7589, lng: -71.5724 },
  { nombre: "Cauca", lat: 2.7089, lng: -76.8265 },
  { nombre: "Cesar", lat: 10.4742, lng: -73.2436 },
  { nombre: "Chocó", lat: 5.2528, lng: -76.8259 },
  { nombre: "Córdoba", lat: 8.7479, lng: -75.8814 },
  { nombre: "Cundinamarca", lat: 4.711, lng: -74.0721 },
  { nombre: "Guainía", lat: 3.8654, lng: -67.9231 },
  { nombre: "Guaviare", lat: 2.5726, lng: -72.6455 },
  { nombre: "Huila", lat: 2.9273, lng: -75.2819 },
  { nombre: "La Guajira", lat: 11.5444, lng: -72.9072 },
  { nombre: "Magdalena", lat: 10.4113, lng: -74.4057 },
  { nombre: "Meta", lat: 3.9876, lng: -73.258 },
  { nombre: "Nariño", lat: 1.2892, lng: -77.357 },
  { nombre: "Norte de Santander", lat: 7.9463, lng: -72.8988 },
  { nombre: "Putumayo", lat: 0.4352, lng: -76.5945 },
  { nombre: "Quindío", lat: 4.5339, lng: -75.6811 },
  { nombre: "Risaralda", lat: 5.315, lng: -75.9928 },
  { nombre: "San Andrés y Providencia", lat: 12.5567, lng: -81.7185 },
  { nombre: "Santander", lat: 7.1254, lng: -73.1198 },
  { nombre: "Sucre", lat: 9.3043, lng: -75.3978 },
  { nombre: "Tolima", lat: 4.4389, lng: -75.2322 },
  { nombre: "Valle del Cauca", lat: 3.4516, lng: -76.532 },
  { nombre: "Vaupés", lat: 1.1361, lng: -70.9766 },
  { nombre: "Vichada", lat: 4.4235, lng: -69.2878 },
];

const ColombiaMap: React.FC<ColombiaMapProps> = ({ ventas }) => {
  const normalizeName = (name: string) =>
    name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  
  const getSelectedMarkers = (ventas: VentasPorVendedorDepartamento[]) => {
    return ventas.reduce<{ [region: string]: boolean }>((acc, venta) => {
      const departamento = departamentosColombia.find(
        (d) => normalizeName(d.nombre) === normalizeName(venta.departamento)
      );
  
      if (departamento) {
        acc[departamento.nombre] = true; // Marca el departamento como seleccionado
      }
  
      return acc;
    }, {});
  };

  return (
    <div className="w-full h-[500px]">
      <VectorMap
        map={coMerc}
        backgroundColor="transparent"
        zoomOnScroll={false}
        containerStyle={{
          width: "100%",
          height: "100%",
        }}
        markers={getSelectedMarkers(ventas)}
        markerStyle={{
          initial: {
            fill: "#FF5733",
            stroke: "#FFF",
          },
        }}
        regionStyle={{
          initial: {
            fill: "#D0D5DD",
            stroke: "none",
          },
          hover: {
            fill: "#465FFF",
            cursor: "pointer",
          },
        }}
      />
    </div>
  );
};

export default ColombiaMap;
