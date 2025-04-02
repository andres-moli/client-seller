import { useState } from "react";
import dayjs from "dayjs";
import { OrderTypes, StatusVisitEnum, useClientsUserQuery, useProyectosQuery, useVisitTypesQuery } from "../../domain/graphql";
import { useUser } from "../../context/UserContext";
import { useCreateVisitMutation } from "../../domain/graphql";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { Modal } from "../../components/ui/modal";
import TextArea from "../../components/form/input/TextArea";
import SearchableSelect, { Option } from "../../components/form/selectSeach";
import RadioButtons from "../../components/form/form-elements/RadioButtons";
import Radio from "../../components/form/input/Radio";
import { apolloClient } from "../../main.config";

interface CreateVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  initialDay: string;
}

export const CreateVisitModal = ({ isOpen, onClose, initialDay, onOpen }: CreateVisitModalProps) => {
  const { user } = useUser();
  const [createVisit] = useCreateVisitMutation();
  const [proyectoId, setProyectoId] = useState<string>()
  const [description, setDescription] = useState("");
  const [client, setClient] = useState("");
  const [typeVisit, setTypeVist] = useState("");
  const [selectedValue, setSelectedValue] = useState<'SI' | 'NO'>('NO');
  const [status, setStatus] = useState<StatusVisitEnum>(StatusVisitEnum.Programmed);
  const [dateTime, setDateTime] = useState(initialDay);
  const {data, loading} = useClientsUserQuery({
    variables: {
        where: {
        user: {
            _eq: user?.id || ''
        }
        },
        orderBy: {
            name: OrderTypes.Asc
        },
        pagination: {
            skip: 0,
            take: 99999999
        }
    }
   })
  const {data: dataProyecto, loading: loadingProyecto} = useProyectosQuery({
    variables: {
      pagination: {
        skip: 0,
        take: 9999999
      }
    }
  })

  const proyectoOption: Option[] = dataProyecto?.proyectos.map((proyecto) => {
    return {
      label: proyecto.name,
      value: proyecto.id
    }
  }) || []
   const {data: dataTypeVisit, loading: loadingVisit} = useVisitTypesQuery({
    variables: {
        where: {
        },
        orderBy: {
            createdAt: OrderTypes.Asc
        },
        pagination: {
            skip: 0,
            take: 99999999
        }
    }
   })
   const otpionCliente: Option[] = data?.clients.map((client) => {
    return {
        label: client.name,
        value: client.id
    }
   }) || []
   const otpionTypeVisit: Option[] = dataTypeVisit?.visitTypes.map((visit) => {
    return {
        label: visit.name,
        value: visit.id
    }
   }) || []
  const handleCreateVisit = async () => {
    try {
      onClose()
      const result = await Swal.fire({
        title: "¿Confirmar visita?",
        text: "¿Deseas programar esta visita?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, programar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        toast.info('Creando visita...')
        await createVisit({
          variables: {
            createInput: {
              description,
              status,
              dateVisit: dayjs(dateTime).format("YYYY-MM-DD HH:mm:ss"),
              userId: user?.id || "",
              clientId: client,
              typeId: typeVisit,
              isProyect: selectedValue == 'SI',
              proyectoId: proyectoId
            }
          }
        });
        apolloClient.cache.evict({ fieldName: "visits" });
        
        toast.success("Visita programada correctamente");
        onClose();
      }
    } catch (error) {
        onOpen()
      toast.error("Error al programar la visita");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] p-6 lg:p-10">
      <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
        <div>
          <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
            Programar nueva visita
          </h5>
        </div>
        
        <div className="mt-1">
            <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Cliente
            </label>
            <SearchableSelect
              onChange={(e) => setClient(e)}
              options={otpionCliente}
              placeholder="Selecione un cliente"
            //   className="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-base text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Tipo de visita
            </label>
            <SearchableSelect
              onChange={(e) => setTypeVist(e)}
              options={otpionTypeVisit}
              placeholder="Selecione un tipo de visita"
            //   className="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-base text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Descripción
            </label>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e)}
              rows={4}
              className="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-base text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              ¿Tiene proyecto?
            </label>
            <div className="flex flex-wrap items-center gap-8">

            <Radio
                id="radioSi"
                name="group1"
                value="option2"
                checked={selectedValue === "SI"}
                onChange={() => setSelectedValue("SI")}
                label="SI"
                />
            <Radio
                id="radio2"
                name="group1"
                value="option2"
                checked={selectedValue === "NO"}
                onChange={() => setSelectedValue("NO")}
                label="NO"
                />
            </div>
          </div>
          {
            selectedValue == 'SI' && (
              <div className="mt-6 w-full">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Seleciones un proyecto
              </label>
              <div className="relative">
                {
                  loadingProyecto
                  ?
                  <>Cargando proyectos...</>
                  :
                  <SearchableSelect
                    options={proyectoOption}
                    placeholder="Seleccionar un proyecto"
                    onChange={(e) => setProyectoId(e)}
                  />
                }
              </div>
            </div>
            )
          }
          {/* <div className="mt-6">
            <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
              Estado
            </label>
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              {Object.entries(StatusVisitEnum).map(([key, value]) => (
                <div key={key} className="n-chk">
                  <div className={`form-check form-check-${value} form-check-inline`}>
                    <label className="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400">
                      <span className="relative">
                        <input
                          disabled
                          className="sr-only form-check-input"
                          type="radio"
                          name="status"
                          checked={status === value}
                          onChange={() => setStatus(value)}
                        />
                        <span className="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full box dark:border-gray-700">
                          <span className={`h-2 w-2 rounded-full bg-white ${status === value ? "block" : "hidden"}`}></span>
                        </span>
                      </span>
                      {key}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          <div className="mt-6">
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Fecha y hora
            </label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            //   min={dayjs(dateRange.start).format("YYYY-MM-DDTHH:mm")}
            //   max={dayjs(dateRange.end).format("YYYY-MM-DDTHH:mm")}
              className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
          >
            Cancelar
          </button>
          <button
            onClick={handleCreateVisit}
            className="flex justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
          >
            Programar visita
          </button>
        </div>
      </div>
    </Modal>
  );
};