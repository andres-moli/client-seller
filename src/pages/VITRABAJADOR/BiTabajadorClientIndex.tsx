import { useParams } from "react-router";
import ListaClasesCliente from "./components/ClienteClaseCard";
import ClienteInfoCard from "./components/ClienteInfoCard";
import CotizacionTable from "./components/tableCotizacion";
import { TargetInfoClientSeller } from "./components/TargetInfoClientSeller";

const BiTrabajadorClientIndex = () => {
    const params = useParams<{ clienteId: string }>();
    if (!params.clienteId) {
        return <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Reporte de Cliente</h1>
            <p className="text-red-600">ID de cliente no proporcionado en la URL.</p>
        </div>;
    }
    const clienteId = params.clienteId;
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <ClienteInfoCard nit={clienteId} /><br />
            <TargetInfoClientSeller nit={clienteId} /> <br />
            <ListaClasesCliente id={clienteId} /> <br />
            <CotizacionTable nit={clienteId} />
        </div>
    )
};

export default BiTrabajadorClientIndex;