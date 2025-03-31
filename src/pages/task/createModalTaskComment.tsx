import { useState } from "react";
import dayjs from "dayjs";
import TextArea from "../../components/form/input/TextArea";
import { Modal } from "../../components/ui/modal";
import { Task, TaskPrioridad, TaskStatus, useCreateTaskCommentMutation } from "../../domain/graphql";
import { useUser } from "../../context/UserContext";
import { toast } from "sonner";
import { ToastyErrorGraph } from "../../lib/utils";
import { z } from "zod";
import Swal from "sweetalert2";
import { apolloClient } from "../../main.config";
import FileInput from "../../components/form/input/FileInput";
import TaskCommentView from "./taskComenteViewn";
import handleUploadImage from "../../lib/uptloadFile";
import { Trash2Icon } from "lucide-react";

const taskSchema = z.object({
  description: z.string().optional(),
});

interface CreateTaskModalProps {
  closeModal: () => void;
  openModal: () => void;
  task: Task | null;
  isOpen: boolean;
}

export const CreateTaskCommentModal: React.FC<CreateTaskModalProps> = ({ isOpen, closeModal, openModal, task }) => {
  if (!task) return null;

  const { user } = useUser();
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<React.ChangeEvent<HTMLInputElement>>();
  const [inputKey, setInputKey] = useState(Date.now()); // Forzar reinicio
  const [createTask] = useCreateTaskCommentMutation();

  // Función para manejar el envío del formulario
  const handleCreateTask = async () => {
    const validationResult = taskSchema.safeParse({
      description,
    });

    if (!validationResult.success) {
      toast.error(validationResult.error.errors[0].message);
      return;
    }

    try {
      closeModal();
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Deseas crear este comentario a la tarea?",
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
        let fileId: null | string = null
        if(file){
          if(file?.target?.files?.[0]){
            const dataFile = await handleUploadImage(file?.target?.files?.[0])
            fileId = dataFile?.id || ''
          }else {
            toast.error('No se selecionaste un archivo para subir')
            return
          }
        }
        const res = await createTask({
          variables: {
            createInput: {
              taskId: task.id,
              taskDescription: description,
              fileId: fileId ? fileId : undefined
            },
          },
        });

        if (res.errors) {
          toast.error("Hubo un error: " + res.errors[0]);
          return;
        }

        apolloClient.cache.evict({ fieldName: "tasks" });
        toast.success("Comentario de Tarea Creada con éxito");
        closeModal();
      }
    } catch (err) {
      openModal();
      ToastyErrorGraph(err as any);
    }
  };
  const onDeleteFile = () => {
    setFile(undefined)
    setInputKey(Date.now()); // Cambia la key para reiniciar el input
    toast.success('Archivo eliminado con exitó')

  }
  return (
<Modal
  isOpen={isOpen}
  onClose={closeModal}
  className="max-w-[1200px] max-h-[110vh] p-6 lg:p-6 flex flex-col"
>
  <div className="flex flex-col h-full">
    {/* Encabezado del modal */}
    <div className="flex-shrink-0">
      <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
        {"Crear Comentario"}
      </h5>
    </div>

    {/* Contenido con scroll */}
    <div className="flex-1 overflow-y-auto custom-scrollbar px-2">
      <div className="mt-4">
        {/* Descripción */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Descripción de la tarea
          </label>
          <TextArea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          />
        </div>

        {/* Subir archivo */}
        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Subir archivo
          </label>
          {file && (
            <Trash2Icon className="mb-1.5 block cursor-pointer" onClick={onDeleteFile} />
          )}
          <FileInput
             key={inputKey.toString()} // Cambia la key para forzar el reinicio
            onChange={(e) => setFile(e)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          />
        </div>
      </div>

      {/* Lista de comentarios */}
      <div className="mt-8">
        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
          {"Comentarios"}
        </h5>
        <div className="max-h-[200px] overflow-y-auto">
          {task.taskComment.map((coment) => (
            <TaskCommentView comment={coment} key={coment.id} />
          ))}
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="flex-shrink-0 flex items-center gap-3 mt-6 sm:justify-end">
      <button
        onClick={closeModal}
        className="w-full sm:w-auto rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
      >
        Cerrar
      </button>
      <button
        onClick={handleCreateTask}
        className="w-full sm:w-auto rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
      >
        {"Crear comentario"}
      </button>
    </div>
  </div>
</Modal>

  );
};