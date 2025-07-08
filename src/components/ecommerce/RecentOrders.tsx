import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { OrderTypes, TaskStatus, useTasksQuery } from "../../domain/graphql";
import { useUser } from "../../context/UserContext";
import dayjs from "dayjs";
import { useState, useMemo } from "react";

const TASKS_PER_PAGE = 5;

export default function RecentOrders() {
  const { user } = useUser();
  const { data, loading } = useTasksQuery({
    variables: {
      where: {
        worker: { _eq: user?.id },
        taskStatus: {
          _in: [TaskStatus.EnProgreso, TaskStatus.Pendiente, TaskStatus.Creada],
        },
        taskDateExpiration: {
          _between: [
            dayjs().startOf("day").format("YYYY-MM-DD HH:mm:ss"),
            dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
          ],
        },
        _or: [
          {
            taskStatus: { _eq: TaskStatus.Vencida },
            _and: [{ worker: { _eq: user?.id } }],
          },
        ],
      },
      orderBy: {
        taskDateExpiration: OrderTypes.Desc,
      },
    },
  });

  const [currentPage, setCurrentPage] = useState(1);

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * TASKS_PER_PAGE;
    return data?.tasks.slice(startIndex, startIndex + TASKS_PER_PAGE) || [];
  }, [data, currentPage]);

  const totalPages = Math.ceil((data?.tasks.length || 0) / TASKS_PER_PAGE);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Tareas de hoy y vencidad ({data?.tasks.length || 0})
          </h3>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Nombre
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {paginatedTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell
                  className={`px-4 py-3 ${
                    task.taskStatus === TaskStatus.Vencida
                      ? "text-red-500 dark:text-red-400"
                      : "text-gray-500 dark:text-gray-400"
                  } text-start text-theme-sm`}
                >
                  {task.taskName}
                </TableCell>
                {task.taskStatus === TaskStatus.Vencida && (
                  <TableCell className="px-4 py-3 text-red-500 dark:text-red-400 text-start text-theme-sm">
                    {task.taskDateExpiration}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Página {currentPage} de {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
