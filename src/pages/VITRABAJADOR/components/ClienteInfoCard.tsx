import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, User2, Loader2, AlertTriangle } from "lucide-react";
import { formatCurrency } from "../../../lib/utils";


interface ClienteInfo {
  nit: string;
  nombre: string;
  celular: string;
  email: string;
  dirrecion: string;
}

interface Props {
  nit: string;
}

const ClienteInfoCard: React.FC<Props> = ({ nit }) => {
  const [data, setData] = useState<ClienteInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchParams = new URLSearchParams(window.location.search);
  const value = searchParams.get("value");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_MICRO_GRAPH}brute-force/getClienteNit?nit=${nit}`
        );

        if (Array.isArray(res.data) && res.data.length > 0) {
          setData(res.data[0]);
        } else {
          setError("No se encontraron datos del cliente.");
        }
      } catch (err) {
        setError("Error al cargar la información del cliente.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [nit]);

  if (loading)
    return (
      <div className="flex items-center gap-2 p-3 bg-white shadow-sm rounded-xl border text-sm">
        <Loader2 className="animate-spin w-4 h-4 text-gray-600" />
        Cargando cliente...
      </div>
    );

  if (error)
    return (
      <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center gap-2">
        <AlertTriangle className="w-4 h-4" />
        {error}
      </div>
    );

  if (!data) return null;

  return (
    <motion.div
      className="
        p-4 rounded-2xl shadow-sm border bg-white border-gray-100
        hover:shadow-md transition-all duration-300
        flex flex-col gap-3
      "
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-50">
          <User2 className="w-5 h-5 text-blue-600" />
        </div>

        <div>
          <h2 className="font-semibold text-gray-900 leading-tight">
            {data.nombre} - {value ? formatCurrency(Number(value)) : '$0'}
          </h2>
          <p className="text-xs text-gray-500">NIT: {data.nit}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Info */}
      <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">

        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-500" />
          {data.celular || "Sin teléfono"}
        </div>

        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-500" />
          {data.email || "Sin correo"}
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          {data.dirrecion || "Sin dirección"}
        </div>

      </div>
    </motion.div>
  );
};

export default ClienteInfoCard;
