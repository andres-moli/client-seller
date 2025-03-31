import {
  ButtonTable,
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
  } from "../../components/ui/table";
  import Badge from "../../components/ui/badge/Badge";
import { CheckLineIcon, ListIcon, PencilIcon } from "../../icons";
import { OrderTypes, Task, TaskPrioridad, TaskStatus, useTasksQuery, useUpdateTaskMutation } from "../../domain/graphql";
import { useUser } from "../../context/UserContext";
import dayjs from "dayjs";
import Button from "../../components/ui/button/Button";
import { useModal } from "../../hooks/useModal";
import { CreateTaskModal } from "./createModalTask";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { apolloClient } from "../../main.config";
import TableSkeleton from "../../components/ui/loaders/table";
import { CreateTaskCommentModal } from "./createModalTaskComment";
import { useState } from "react";
import { File, Paperclip, Trash2Icon } from "lucide-react";

export default function TaskTable() {
const { isOpen, openModal, closeModal } = useModal();
const { isOpen: isOpenC, openModal: openModalC, closeModal: closeModalC } = useModal();
const [task,setTask] = useState<Task | null>(null)
const {user} = useUser()
const [actualizar] = useUpdateTaskMutation()
const [filterStatus, setFilterStatus] = useState<TaskStatus | null>(null); 
const {data, loading, refetch} = useTasksQuery({
  variables: {
    where: {
      worker: {
        _eq: user?.id
      },
      taskStatus: {
        _in: [TaskStatus.EnProgreso, TaskStatus.Pendiente,TaskStatus.Creada]
      }
    },
    orderBy: {
      taskDateExpiration: OrderTypes.Desc,
    }
  }
})
const onChangeStatus = async (status: TaskStatus, id: string) => {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: `¿Deseas cambiar el estado de la tarea a ${status == TaskStatus.EnProgreso ? 'En proceso' : 'Pendiente por aprobar'}?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "Cancelar",
  });
  if(result.isConfirmed){
    const res = await actualizar({
      variables: {
        updateInput: {
          id,
          taskStatus: status 
        }
      }
    })
    if(res.errors){
        toast.error('Hubo un error: ' + res.errors[0]);
        return
    }
    apolloClient.cache.evict({ fieldName: "tasks" })
    toast.success('Tarea Creada con exito')
  }
}
const handleTaskClick = (task: Task) => {
  setTask(task);
  openModalC()
};
const onFilterStatus = async (status: TaskStatus | null) => {
  const toastId = toast.loading('Aplicando filtros...')
  if(!status){
    await refetch({
      where: {
        worker: {
          _eq: user?.id
        },
        taskStatus: {
          _in: [TaskStatus.EnProgreso, TaskStatus.Pendiente,TaskStatus.Creada]
        }
      },
      orderBy: {
        taskDateExpiration: OrderTypes.Desc,
      }
    })
    toast.dismiss(toastId)
    return
  }
  setFilterStatus(status)
  await refetch({
    where: {
      worker: {
        _eq: user?.id
      },
      taskStatus: {
        _in: [status]
      }
    },
    orderBy: {
      taskDateExpiration: OrderTypes.Desc,
    }
  })
  toast.dismiss(toastId)
}
return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
    <div className="max-w-full overflow-x-auto">
        <ButtonTable 
          onClick={openModal}
        >
          Crear tarea
        </ButtonTable>
        {/* Botones de filtrado */}
        <div className="ml-2 m-b-2 flex-item">
          <Trash2Icon
           className="mb-1.5 block cursor-pointer"
            onClick={() => onFilterStatus(null)}
          />
          {Object.values(TaskStatus).map((status) => {
          const colorVariants: Record<string, string> = {
            [TaskStatus.Cancelada]: "bg-red-500 text-white",
            [TaskStatus.Creada]: "bg-blue-500 text-white",
            [TaskStatus.EnProgreso]: "bg-yellow-500 text-black",
            [TaskStatus.Pendiente]: "bg-gray-500 text-white",
            [TaskStatus.Realizada]: "bg-green-500 text-white",
            [TaskStatus.Vencida]: "bg-black text-white",
          };

            return (
              <Button
                key={status}
                size="sm"
                className={`${
                  colorVariants[status] 
                } px-4 py-2 rounded`}
                onClick={() => onFilterStatus(status)}
              >
                {status.replace(/_/g, " ")}
              </Button>
            );
          })}
        </div><br />
        <div className="min-w-[1102px]">
        {
          loading ? (
            (
              <TableSkeleton/>
            )
          )
          :
          (
            <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
                <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                Creado por
                </TableCell>
                <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                Nombre
                </TableCell>
                <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                Descripción
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                Fecha de vencimiento
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                # de comentarios
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                Estado
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                Prioridad
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                Acciones
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                Commentarios
                </TableCell>
            </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data?.tasks.map((task) => (
                <TableRow key={task.id}>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {task.createdByUser.fullName}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {task.taskName}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {task.taskDescription}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {dayjs(task.taskDateExpiration).format('YYYY-MM-DD')}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {task.taskComment.length}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                    size="sm"
                    color={
                      task.taskStatus === TaskStatus.EnProgreso
                        ? "warning"
                        : task.taskStatus === TaskStatus.Pendiente 
                        ? "light"
                        : "error"
                    }
                    >
                    {task.taskStatus.replace(/_/g, " ")}
                    </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                    size="sm"
                    color={
                        task.taskPriority === TaskPrioridad.Baja
                        ? "success"
                        : task.taskPriority === TaskPrioridad.Media
                        ? "warning"
                        : "error"
                    }
                    >
                    {task.taskPriority}
                    </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {
                    task.taskStatus != TaskStatus.EnProgreso && (
                      <ListIcon onClick={() => onChangeStatus(TaskStatus.EnProgreso, task.id)} target="Cambiar a en proseso" className="cursor-pointer"/>
                    )
                  }
                  {
                     task.taskStatus != TaskStatus.Pendiente && (
                       <CheckLineIcon onClick={() => onChangeStatus(TaskStatus.Pendiente,  task.id)} target="Cambiar a pendiente por aprobar" className="cursor-pointer"/>
                     )
                  }
                </TableCell>
                <TableCell>
                  {/* @ts-ignore */}
                  <Paperclip onClick={() => handleTaskClick(task)} target="Cambiar a en proseso" className="cursor-pointer dark:text-gray-400" size={18}/>
                    {
                      task.taskComment.find((c) => c.file) && (
                        <File size={18} />
                      )
                    }
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
          )
        }
        </div>
        <CreateTaskModal 
          closeModal={closeModal}
          isOpen={isOpen}
          openModal={openModal}
        />
        <CreateTaskCommentModal 
          closeModal={closeModalC}
          isOpen={isOpenC}
          openModal={openModalC}
          task={task}
          key={task?.id}
        />
    </div>
    </div>
);
}
  