import { useState } from "react";
import dayjs from "dayjs";
import TextArea from "../../components/form/input/TextArea";
import { Modal } from "../../components/ui/modal";
import { TaskPrioridad, TaskStatus, TypeClientEnum, useCreateClientMutation, useCreateTaskMutation } from "../../domain/graphql";
import { useUser } from "../../context/UserContext";
import { toast } from "sonner";
import { ToastyErrorGraph } from "../../lib/utils";
import { z } from "zod";
import Swal from "sweetalert2";
import { apolloClient } from "../../main.config";
import SearchableSelect, { Option } from "../../components/form/selectSeach";
import { DepartmentAndMunicipality } from "../../composables/DepartmentAndMunicipality";
import { TIPOS_VERTICALES } from "../../lib/vertical";
const regexNit = /^\d{9}-\d$/
const clientSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  documentNumber: z.string().regex(regexNit, 'No se cumple con el pratrón de 123456789-0'),
  email: z.string().email("Correo electrónico inválido"),
  phone: z.string().optional(),
  cellphone: z.string().min(1,'El celular es requerido'),
  description: z.string().optional(),
  clientType: z.string().min(1, "El tipo de cliente es requerido"),
  verticalType: z.string().min(1, "El tipo de vertical es requerido"),
  departmentId: z.string().min(1, "El departamento es requerido"),
  municipalityId: z.string().min(1, "El municipio es requerido"),
});

interface CreateTaskModalProps {
  closeModal: () => void;
  openModal: () => void;
  isOpen: boolean;
}

const typeClientOptions: Option[] = [
  {
    value: TypeClientEnum.ClienteFinal,
    label: "FINAL"
  },
  {
    value: TypeClientEnum.Distribuidor,
    label: "DISTRIBUIDOR"
  },
  {
    value: TypeClientEnum.Instalador,
    label: "INSTALADOR"
  },
  {
    value: TypeClientEnum.Integrador,
    label: "INTEGRADOR"
  },
];

export const CreateClientModal: React.FC<CreateTaskModalProps> = ({ isOpen, closeModal, openModal }) => {
  const { user } = useUser();
  const [createTask] = useCreateClientMutation();
  
  // Estados del formulario
  const [name, setName] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [clientType, setClientType] = useState("");
  const [verticalType, setVerticalType] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [municipalityId, setMunicipalityId] = useState("");

  const handleLocationChange = (values: {
    departmentId: string;
    municipalityId: string;
  }) => {
    setDepartmentId(values.departmentId);
    setMunicipalityId(values.municipalityId);
  };

  const handleCreateClient = async () => {
    const validationResult = clientSchema.safeParse({
      name,
      documentNumber,
      email,
      phone,
      cellphone,
      description,
      clientType,
      verticalType,
      departmentId,
      municipalityId
    });

    if (!validationResult.success) {
      toast.error(validationResult.error.errors[0].message);
      return;
    }

    try {
      closeModal();
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Deseas crear este cliente?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, crear",
        cancelButtonText: "Cancelar",
      });
      
      if (result.dismiss) {
        openModal();
        return;
      }
      
      if (result.isConfirmed) {          
        const res = await createTask({
          variables: {
            createInput: {
              name,
              numberDocument: documentNumber,
              email: email || null,
              celular: cellphone,
              telefono: phone,
              descripcion: description || null,
              type: clientType as TypeClientEnum,
              vertical: verticalType,
              departmentId,
              cityId: municipalityId,
              userId: user?.id || ""
            }
          }
        });
        
        if (res.errors) {
          toast.error('Hubo un error: ' + res.errors[0]);
          return;
        }
        
        apolloClient.cache.evict({ fieldName: "clients" });
        toast.success('Cliente creado con éxito');
        closeModal();
      }
    } catch (err) {
      openModal();
      ToastyErrorGraph(err as any);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="max-w-[1200px] p-6 lg:p-10"
    >
      <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
        <div>
          <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
            {'Crear Cliente'}
          </h5>
        </div>
        
        <div className="mt-8">
          {/* Campo: Nombre del cliente */}
          <div className="mt-6">
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Nombre del cliente
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Campo: Número de documento */}
            <div className="mt-6">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Número de documento
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={documentNumber}
                  onChange={(e) => setDocumentNumber(e.target.value)}
                  className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>
            
            {/* Campo: Correo electrónico */}
            <div className="mt-6">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Correo electrónico
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>
            
            {/* Campo: Celular */}
            <div className="mt-6">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Celular
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={cellphone}
                  onChange={(e) => setCellphone(e.target.value)}
                  className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>
            
            {/* Campo: Tipo de cliente */}
            <div className="mt-7">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Tipo de cliente
              </label>
              <SearchableSelect
                className="relative"
                options={typeClientOptions}
                placeholder="Seleccionar tipo de cliente"
                onChange={(value) => setClientType(value)}
                defaultValue={clientType}
              />
            </div>
            
            {/* Campo: Tipo de vertical */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Tipo de vertical
              </label>
              <SearchableSelect
                className="relative"
                options={TIPOS_VERTICALES}
                placeholder="Seleccionar tipo de vertical"
                onChange={(value) => setVerticalType(value)}
                defaultValue={verticalType}
              />
            </div>
            
            {/* Campo: Teléfono */}
            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Teléfono
              </label>
              <div>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>
            
            {/* Componente DepartmentAndMunicipality - Ocupa 2 columnas */}
            <div className="mt-9 md:col-span-2">
              <DepartmentAndMunicipality
                onChange={handleLocationChange}
                departmentId={departmentId}
                municipalityId={municipalityId}
              />
            </div>
          </div>
          
          {/* Campo: Descripción del cliente */}
          <div className="mt-6">
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Descripción del cliente
            </label>
            <TextArea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e)}
              className="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-base text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
          </div>
        </div>

        {/* Botones del modal */}
        <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
          <button
            onClick={closeModal}
            type="button"
            className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
          >
            Cerrar
          </button>
          <button
            onClick={handleCreateClient}
            type="button"
            className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
          >
            {"Crear cliente"}
          </button>
        </div>
      </div>
    </Modal>
  );
};