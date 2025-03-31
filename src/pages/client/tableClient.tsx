import {
  ButtonTable,
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
  } from "../../components/ui/table";
import { useNavigate } from "react-router";
import { OrderTypes, useClientsQuery, useClientsUserQuery, useProyectosQuery } from "../../domain/graphql";
import { useUser } from "../../context/UserContext";
import { formatCurrency } from "../../lib/utils";
import { Eye } from "lucide-react";
import { Pagination } from "../../components/ui/table/pagination";
import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { CreateClientModal } from "./createClient";
  
export default function ClientTable() {
const navigate  = useNavigate()
const { user } = useUser()
const { isOpen, openModal, closeModal } = useModal();
const [itemsPerPage, setItemsPerPage] = useState(10);
const [currentPage, setCurrentPage] = useState(1);
const handlePageChange = (page: number) => {
  setCurrentPage(page);
};

const handleItemsPerPageChange = (newItemsPerPage: number) => {
  setItemsPerPage(newItemsPerPage);
  setCurrentPage(1); // Resetear a la primera página cuando cambia el tamaño
};
const {data, loading} = useClientsUserQuery({
  variables: {
    where: {
      user: {
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
          onClick={()=> openModal()}
        >
          Crear Cliente
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
                Numero de documento
                </TableCell>
                <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                Dirreción
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                  Departamento
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                  Municipio
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                  Telefono
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                  Tipo
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                  Acciones
                </TableCell>
            </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data?.clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {client.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {client.numberDocument}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {client.address}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {client.department?.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {client.city?.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {client.celular}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {client.type?.replace("_", " ")}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Eye 
                    className="cursor-pointer"
                    onClick={() => navigate(`/view-proyect/${client.id}`)}
                  />
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
        </Table>
        <Pagination
          totalItems={data?.clientsCount.totalItems || 0}
          itemsPerPage={data?.clientsCount.itemsPerPage || 0}
          totalPages={Math.ceil((data?.clientsCount.totalItems || 0) / (data?.clientsCount?.itemsPerPage || 0))}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          className="mt-6"
        />
        <CreateClientModal 
          closeModal={closeModal}
          isOpen={isOpen}
          openModal={openModal}
        />
        </div>
    </div>
    </div>
);
}
  