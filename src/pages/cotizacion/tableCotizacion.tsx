import {
  ButtonTable,
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
  } from "../../components/ui/table";
  import Badge from "../../components/ui/badge/Badge";
import { useNavigate } from "react-router";
import { useUser } from "../../context/UserContext";
import { useEffect, useMemo, useState } from "react";
import { OrderTypes, useCotizacionesQuery, useFindSeachCotizacionLazyQuery, useFindSeachCotizacionQuery } from "../../domain/graphql";
import { formatCurrency } from "../../lib/utils";
import SearchableSelect, { Option } from "../../components/form/selectSeach";
import { Pagination } from "../../components/ui/table/pagination";
import { toast } from "sonner";
import dayjs from "dayjs";
import { Eye, Search } from "lucide-react";
import { debounce } from "lodash";
import Input from "../../components/form/input/InputField";
const currentYear = new Date().getFullYear();
  
// Generar opciones de años (3 años atrás hasta 3 años adelante)
const yearOptions: Option[] = Array.from({ length: 7 }, (_, i) => {
  const year = currentYear - 3 + i;
  return {
    label: year.toString(),
    value: year.toString()
  };
});

// Opciones de meses (1-12 con nombres)
const monthOptions: Option[] = [
  { label: 'Enero', value: '1' },
  { label: 'Febrero', value: '2' },
  { label: 'Marzo', value: '3' },
  { label: 'Abril', value: '4 '},
  { label: 'Mayo', value: '5' },
  { label: 'Junio', value: '6' },
  { label: 'Julio', value: '7' },
  { label: 'Agosto', value: '8' },
  { label: 'Septiembre', value: '9' },
  { label: 'Octubre', value: '10' },
  { label: 'Noviembre', value: '11' },
  { label: 'Diciembre', value: '12 '}
];
export default function CotizacionTable() {
const navigate  = useNavigate()
const { user } = useUser()
// Estado para los valores seleccionados
const [selectedYear, setSelectedYear] = useState<number>(currentYear);
const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
const [itemsPerPage, setItemsPerPage] = useState(10);
const [currentPage, setCurrentPage] = useState(1);
const [isFind, setIsFinf] = useState(false);
const [searchTerm, setSearchTerm] = useState("");
const [find] = useFindSeachCotizacionLazyQuery()
const handlePageChange = (page: number) => {
  setCurrentPage(page);
};

const handleItemsPerPageChange = (newItemsPerPage: number) => {
  setItemsPerPage(newItemsPerPage);
  setCurrentPage(1); // Resetear a la primera página cuando cambia el tamaño
};
const {data, loading, refetch} = useCotizacionesQuery({
  variables: {
    where: {
      vendedor: {
        _eq: user?.identificationNumber || ''
      },
      ...(searchTerm && {
        _and: [
          {
            nitCliente: {
              _contains: searchTerm
            },
            _or: [{
              nombreCliente: {
                _contains: searchTerm
              },
              _or: [
                {
                  numeroCotizacion: {
                    _contains: searchTerm
                  }
                }
              ]
            }]
          }
        ]
      })
    },
    orderBy: {
      fecha: OrderTypes.Desc
    },
    pagination: {
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage
    }
  }
})
  // Debounce search to avoid too many requests
  const debouncedSearch = useMemo(
    () =>
      debounce((term: string) => {
        setSearchTerm(term);
        setCurrentPage(1); // Reset to first page when searching
      }, 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };
  const onFind = async () => {
    setIsFinf(true)
    const toastId = toast.loading('Buscando cotizaciónes en el fomplus...');
    await find({
      variables: {
        cotizacionSeachInput: {
          ano: selectedYear,
          mes: selectedMonth
        }
      }
    })
    refetch()
    setIsFinf(false)
    toast.dismiss(toastId)
  }
return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
    <div className="max-w-full overflow-x-auto">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mt-6 px-6">
          <div className="text-left">
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Año
            </label>
            <SearchableSelect
              onChange={(e) => setSelectedYear(+e)}
              options={yearOptions}
              defaultValue={selectedYear.toString()}
            />
          </div>
          <div className="w-full">
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Mes
            </label>
            <SearchableSelect
              onChange={(e) => setSelectedMonth(+e)}
              options={monthOptions}
              defaultValue={selectedMonth.toString()}

            />
          </div>
          <ButtonTable 
          onClick={onFind}
          disabled={isFind}
          >
            Buscar...
          </ButtonTable>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar por nombre o nit o numero de cotizacion..."
              className="pl-10 w-full"
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="min-w-[1102px]">
        <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
                <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                Numero de cotizacion
                </TableCell>
                <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                Fecha
                </TableCell>
                <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                Cliente
                </TableCell>
                <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                Valor
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
            {data?.cotizaciones.map((coti) => (
              <TableRow key={coti.id}>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {coti.numeroCotizacion}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {dayjs(coti.fecha).format('YYYY-MM-DD')}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {coti.nombreCliente}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {formatCurrency(coti.valor)}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Eye 
                    onClick={() => navigate(`/view-cotizacion/${coti.id}`)}
                    className="cursor-pointer"
                  />
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
        </Table>
        <Pagination
          totalItems={data?.cotizacionesCount.totalItems || 0}
          itemsPerPage={data?.cotizacionesCount.itemsPerPage || 0}
          totalPages={Math.ceil((data?.cotizacionesCount.totalItems || 0) / (data?.cotizacionesCount?.itemsPerPage || 0))}
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
  