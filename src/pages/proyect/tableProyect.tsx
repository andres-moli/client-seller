import {
  ButtonTable,
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
  } from "../../components/ui/table";
import { useNavigate } from "react-router";
import { OrderTypes, useProyectosQuery } from "../../domain/graphql";
import { useUser } from "../../context/UserContext";
import { formatCurrency } from "../../lib/utils";
import { Eye } from "lucide-react";
import { Pagination } from "../../components/ui/table/pagination";
import { useState } from "react";
  
export default function ProyectTable() {
const navigate  = useNavigate()
const { user } = useUser()
const [itemsPerPage, setItemsPerPage] = useState(10);
const [currentPage, setCurrentPage] = useState(1);
const handlePageChange = (page: number) => {
  setCurrentPage(page);
};

const handleItemsPerPageChange = (newItemsPerPage: number) => {
  setItemsPerPage(newItemsPerPage);
  setCurrentPage(1); // Resetear a la primera página cuando cambia el tamaño
};
const {data, loading} = useProyectosQuery({
  variables: {
    where: {
      worker: {
        _eq: user?.id || ''
      }
    },
    orderBy: {
      createdAt: OrderTypes.Desc
    },
    pagination: {
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage
    }
  }
})
return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
    <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
        <ButtonTable 
          onClick={()=> navigate('/create-proyect')}
        >
          Crear proyecto
        </ButtonTable>
        <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
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
                Cliente final
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
                  Precio
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                  Accion
                </TableCell>
            </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data?.proyectos.map((proyect) => (
              <TableRow key={proyect.id}>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {proyect.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {proyect.clientFinal.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {proyect.status}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {formatCurrency(proyect.value)}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Eye 
                    className="cursor-pointer"
                    onClick={() => navigate(`/view-proyect/${proyect.id}`)}
                  />
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
        </Table>
        <Pagination
          totalItems={data?.proyectosCount.totalItems || 0}
          itemsPerPage={data?.proyectosCount.itemsPerPage || 0}
          totalPages={Math.ceil((data?.proyectosCount.totalItems || 0) / (data?.proyectosCount?.itemsPerPage || 0))}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          className="mt-6"
        />
        </div>
    </div>
    </div>
);
}
  