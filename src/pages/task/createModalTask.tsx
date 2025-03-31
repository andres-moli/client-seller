import { useState } from "react";
import dayjs from "dayjs";
import TextArea from "../../components/form/input/TextArea";
import { Modal } from "../../components/ui/modal";
import { TaskPrioridad, TaskStatus, useCreateTaskMutation } from "../../domain/graphql";
import { useUser } from "../../context/UserContext";
import { toast } from "sonner";
import { ToastyErrorGraph } from "../../lib/utils";
import { z } from "zod";
// import { fireAlert } from "../../domain/store/general.store";
import Swal from "sweetalert2";
import { apolloClient } from "../../main.config";

const taskSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  dueDate: z.string().min(7, "La fecha de vencimiento es requerida"),
  priority: z.nativeEnum(TaskPrioridad),
});
interface CreateTaskModalProps {
  closeModal: () => void;
  openModal: () => void;
  isOpen: boolean;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, closeModal, openModal }) => {
  const {user} = useUser()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [priority, setPriority] = useState<TaskPrioridad>(TaskPrioridad.Media);
  const [createTask] = useCreateTaskMutation()
  // Función para manejar el envío del formulario
  const handleCreateTask = async () => {
    const validationResult = taskSchema.safeParse({
        title,
        description,
        dueDate,
        priority,
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
          const res = await createTask({
              variables: {
                createInput: {
                      taskDateExpiration: dueDate,
                      taskName: title,
                      taskPriority: priority,
                      taskStatus: TaskStatus.Creada,
                      workerId: user?.id || '',
                      taskDescription: description
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
          {/* Campo: Título de la tarea */}
          <div className="mt-6">
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Titulo de la tarea
            </label>
            <div className="relative">
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>
          </div>

          {/* Campo: Descripción de la tarea */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Descripción de la tarea
            </label>
            <TextArea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e)}
              className="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-base text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
          </div>

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

          {/* Campo: Prioridad */}
          <div className="mt-6">
            <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
              Prioridad
            </label>
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              {Object.entries(TaskPrioridad).map(([key, value]) => (
                <div key={key} className="n-chk">
                  <div className={`form-check form-check-${value} form-check-inline`}>
                    <label
                      className="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400"
                      htmlFor={`modal${key}`}
                    >
                      <span className="relative">
                        <input
                          className="sr-only form-check-input"
                          type="radio"
                          name="event-level"
                          value={value}
                          id={`modal${key}`}
                          checked={priority === value}
                          onChange={() => setPriority(value)}
                        />
                        <span className="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full box dark:border-gray-700">
                          <span
                            className={`h-2 w-2 rounded-full bg-white ${
                              priority === value ? "block" : "hidden"
                            }`}
                          ></span>
                        </span>
                      </span>
                      {key}
                    </label>
                  </div>
                </div>
              ))}
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