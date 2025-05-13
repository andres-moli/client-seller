import { useState } from "react";
import dayjs from "dayjs";
import TextArea from "../../components/form/input/TextArea";
import { Modal } from "../../components/ui/modal";
import { TaskPrioridad, TaskStatus, TypeClientEnum, useCreateBundleMutation, useCreateClientMutation, useCreateTaskMutation, WsGroup } from "../../domain/graphql";
import { useUser } from "../../context/UserContext";
import { toast } from "sonner";
import { ToastyErrorGraph } from "../../lib/utils";
import { z } from "zod";
import Swal from "sweetalert2";
import { apolloClient } from "../../main.config";
import { WhatsAppMessageEditor } from "./WhatsAppMessageEditor";

interface CreateTaskModalProps {
  closeModal: () => void;
  openModal: () => void;
  isOpen: boolean;
  celularesIds: string[];
}

export const CreateBundleModal: React.FC<CreateTaskModalProps> = ({ isOpen, closeModal, openModal, celularesIds }) => {
  const { user } = useUser();
  const [createTask] = useCreateBundleMutation();
  const [message, setMessage] = useState("");
  const handleCreateClient = async () => {
    try {
      closeModal();
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Deseas crear este lote?",
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
              nombre: 'Lote de ' + dayjs().format('DD/MM/YYYY') + ' ' + user?.fullName,
              descripcion: 'Lote de ' + dayjs().format('DD/MM/YYYY') + ' ' + user?.fullName,
              message: message,
              createdByUserAtId: user?.id,
              celularesIds: celularesIds
            }
          }
        });
        
        if (res.errors) {
          toast.error('Hubo un error: ' + res.errors[0]);
          return;
        }
        
        apolloClient.cache.evict({ fieldName: "bundles" });
        toast.success('Lote creado con éxito');
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
            {'Crear Lote'}
          </h5>
        </div>
          <div className="mt-4">
            <WhatsAppMessageEditor 
              value={message}
              onChange={setMessage}
            />
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
            {"Crear Lote"}
          </button>
        </div>
      </div>
    </Modal>
  );
};