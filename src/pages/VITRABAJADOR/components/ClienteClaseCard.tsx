import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BadgeCheck, AlertTriangle, Loader2 } from "lucide-react";
import { formatCurrency } from "../../../lib/utils";

interface ClienteClase {
  nit: string;
  clase: string;
  compra: number;
}

interface Props {
  id: string;
}

const ListaClasesCliente: React.FC<Props> = ({ id }) => {
  const [data, setData] = useState<ClienteClase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_MICRO_GRAPH}brute-force/getClaseClient?id=${id}`
        );

        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          setError("No se encontraron datos.");
        }
      } catch (err) {
        setError("Error al cargar la información.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  // Loading
  if (loading)
    return (
      <div className="flex items-center gap-2 p-4 bg-white shadow-sm rounded-xl border text-sm">
        <Loader2 className="animate-spin w-4 h-4 text-gray-600" />
        <span className="text-gray-600">Cargando...</span>
      </div>
    );

  // Error
  if (error)
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center gap-2">
        <AlertTriangle className="w-4 h-4" />
        {error}
      </div>
    );

  return (
    <div
      className="
        bg-white border border-gray-200 shadow-sm rounded-2xl p-5
        flex flex-col gap-4
      "
    >
      {/* Título de la Card */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">
          Clases que vendemos
        </h2>
      </div>

      {/* GRID DE TARJETAS */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {data.map((item, idx) => {
          const compraCero = item.compra === 0;

          return (
            <motion.div
              key={idx}
              className={`p-3 rounded-lg shadow-sm border text-sm transition-all
                ${
                  compraCero
                    ? "bg-red-50 border-red-300"
                    : "bg-white border-gray-200"
                }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
                type: "spring",
                stiffness: 140,
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-semibold text-gray-800 truncate">
                  {item.clase}
                </h2>

                {compraCero ? (
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                ) : (
                  <BadgeCheck className="w-4 h-4 text-green-500" />
                )}
              </div>

              <div className="text-gray-700 space-y-1">
                <p className="flex justify-between text-xs">
                  <span className="font-medium">Compra:</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-white text-[11px] ${
                      compraCero ? "bg-red-500" : "bg-green-600"
                    }`}
                  >
                    {formatCurrency(item.compra)}
                  </span>
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ListaClasesCliente;
