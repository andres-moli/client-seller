import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  User2,
  Loader2,
  AlertTriangle,
  List,
  PenLine
} from "lucide-react";

import { useFindOneClientNumberDocumentQuery } from "../../../domain/graphql";

// Tipos basados en tu GraphQL
interface Props {
  nit: string;
}

export const TargetInfoClientSeller: React.FC<Props> = ({ nit }) => {
  // Query param "value"
  const searchParams = new URLSearchParams(window.location.search);
  const value = searchParams.get("value");

  // GraphQL query
  const { data, loading, error } = useFindOneClientNumberDocumentQuery({
    variables: { nit },
  });

  const cliente = data?.findOneClientNumberDocument;

  // Estado para edición inline
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    telefono: "",
    address: "",
    descripcion: "",
  });

  // Al iniciar edición cargamos valores
  const startEdit = () => {
    if (!cliente) return;
    setEditForm({
      name: cliente.name ?? "",
      email: cliente.email ?? "",
      telefono: cliente.telefono ?? "",
      address: cliente.address ?? "",
      descripcion: cliente.descripcion ?? "",
    });
    setIsEditing(true);
  };

  // Guardado (solo estructura, tú conectas tu mutation luego)
  const saveChanges = async () => {
    console.log("Datos a guardar:", editForm);
    setIsEditing(false);
  };

  if (loading)
    return (
      <div className="flex items-center gap-2 p-3 bg-white shadow-sm rounded-xl border text-sm">
        <Loader2 className="animate-spin w-4 h-4 text-gray-600" />
        Cargando cliente...
      </div>
    );

  if (error || !cliente)
    return (
      <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center gap-2">
        <AlertTriangle className="w-4 h-4" />
        Error: No se encontró información del cliente en el seller.
      </div>
    );

  return (
    <motion.div
      className="
        p-4 rounded-2xl shadow-sm border bg-white border-gray-100
        hover:shadow-md transition-all duration-300
        flex flex-col gap-3
      "
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50">
            <User2 className="w-5 h-5 text-blue-600" />
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 leading-tight">
              {cliente.name} (SELLER)
            </h2>
            <p className="text-xs text-gray-500">NIT: {cliente.numberDocument}</p>
          </div>
        </div>

        {/* Botón editar */}
        <button
          onClick={startEdit}
          className="flex items-center gap-1 text-blue-600 text-sm hover:underline"
        >
          <PenLine className="w-4 h-4" /> Editar
        </button>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-200" />

      {/* MODO EDICIÓN */}
      {isEditing && (
        <div className="flex flex-col gap-3 bg-gray-50 p-3 rounded-xl border">
          <input
            className="border p-2 rounded"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            placeholder="Nombre"
          />

          <input
            className="border p-2 rounded"
            value={editForm.email}
            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
            placeholder="Correo"
          />

          <input
            className="border p-2 rounded"
            value={editForm.telefono}
            onChange={(e) =>
              setEditForm({ ...editForm, telefono: e.target.value })
            }
            placeholder="Teléfono"
          />

          <input
            className="border p-2 rounded"
            value={editForm.address}
            onChange={(e) =>
              setEditForm({ ...editForm, address: e.target.value })
            }
            placeholder="Dirección"
          />

          <textarea
            className="border p-2 rounded"
            value={editForm.descripcion}
            onChange={(e) =>
              setEditForm({ ...editForm, descripcion: e.target.value })
            }
            placeholder="Descripción"
          />

          <button
            onClick={saveChanges}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg"
          >
            Guardar cambios
          </button>
        </div>
      )}

      {/* INFO DEL CLIENTE */}
      {!isEditing && (
        <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">

          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-500" />
            {cliente.telefono || cliente.celular || "Sin teléfono"}
          </div>

          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-500" />
            {cliente.email || "Sin correo"}
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            {cliente.address || "Sin dirección"}
          </div>
        </div>
      )}

      {/* CONTACTOS */}
      <div className="border-t border-gray-200 pt-2" />

      <div className="flex items-center gap-2 mb-1">
        <List className="w-4 h-4 text-gray-600" />
        <h3 className="text-sm font-semibold text-gray-800">Contactos</h3>
      </div>

      <div className="flex flex-col gap-2">
        {cliente.contact?.length ? (
          cliente.contact.map((c: any) => (
            <div
              key={c.id}
              className="p-3 bg-gray-50 border rounded-xl text-sm flex flex-col"
            >
              <span className="font-semibold text-gray-900">{c.name}</span>

              <div className="flex items-center gap-2 text-gray-600 text-xs mt-1">
                <Phone className="w-3 h-3" />
                {c.celular || c.telefono}
              </div>

              <div className="flex items-center gap-2 text-gray-600 text-xs">
                <Mail className="w-3 h-3" />
                {c.email}
              </div>

              <p className="text-xs text-gray-500 mt-1">{c.position}</p>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-500">No hay contactos.</p>
        )}
      </div>
    </motion.div>
  );
};
