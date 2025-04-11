import { useState } from "react";
import dayjs from "dayjs";
import TextArea from "../../components/form/input/TextArea";
import { Modal } from "../../components/ui/modal";
import { Cotizacion, Proyectos, TaskPrioridad, TaskStatus, useCreateTaskMutation } from "../../domain/graphql";
import { useUser } from "../../context/UserContext";
import { toast } from "sonner";
import { ToastyErrorGraph } from "../../lib/utils";
import { z } from "zod";
// import { fireAlert } from "../../domain/store/general.store";
import Swal from "sweetalert2";
import { apolloClient } from "../../main.config";

const taskSchema = z.object({
  dueDate: z.string().min(7, "La fecha de vencimiento es requerida"),
});
interface CreateTaskModalProps {
  closeModal: () => void;
  openModal: () => void;
  isOpen: boolean;
  proyecto?: Proyectos;
  cotizacion?: Cotizacion

}

export const CreateTaskByDateModal: React.FC<CreateTaskModalProps> = ({ isOpen, closeModal, openModal, cotizacion, proyecto }) => {
  const {user} = useUser()
  const [dueDate, setDueDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [priority, setPriority] = useState<TaskPrioridad>(TaskPrioridad.Media);
  const [createTask] = useCreateTaskMutation()
  // Función para manejar el envío del formulario
  const handleCreateTask = async () => {
    const validationResult = taskSchema.safeParse({
        dueDate,
      });
    

    if (!validationResult.success) {
        toast.error(validationResult.error.errors[0].message);
        return;
    }

    try {
        closeModal()
        const result = await Swal.fire({
          title: "¿Estás seguro?",
          text: "¿Deseas crear esta tarea?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sí, crear",
          cancelButtonText: "Cancelar",
        });
        if(result.dismiss){
          openModal()
          return
        }
        if(result.isConfirmed) {      
          const title = proyecto ? 'Tarea creada para seguimiento del proyecto ( ' + proyecto.name  + ' )': cotizacion ? `Tarea creada para seguimiento de la cotizacion con numero ${cotizacion?.numeroCotizacion} ( ` + cotizacion?.descripcion + ' )' || 'N/A' : 'NO SE SELECIONO NI PROYECTO NI COTIZACION SE CREO PORQUE SI'
          const res = await createTask({
              variables: {
                createInput: {
                    taskDateExpiration: dueDate,
                    taskName: title,
                    taskPriority: priority,
                    taskStatus: TaskStatus.Creada,
                    workerId: user?.id || '',
                    cotizacionId: cotizacion ? cotizacion.id : undefined,
                    proyectoId: proyecto ? proyecto.id : undefined
                  }
              }
          })
          if(res.errors){
              toast.error('Hubo un error: ' + res.errors[0]);
              return
          }
          apolloClient.cache.evict({ fieldName: "tasks" })
          toast.success('Tarea Creada con exito')
          closeModal();
        }
    } catch (err){
        openModal()
        ToastyErrorGraph(err as any)
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="max-w-[700px] p-6 lg:p-10"
    >
      <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
        <div>
          <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
            {'Crear tarea'}
          </h5>
        </div>
        <div className="mt-8">
          {/* Campo: Fecha de vencimiento */}
          <div className="mt-6">
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Fecha de vencimiento
            </label>
            <div className="relative">
              <input
                id="event-start-date"
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>
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
            onClick={handleCreateTask}
            type="button"
            className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
          >
            {"Crear tarea"}
          </button>
        </div>
      </div>
    </Modal>
  );
};