import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import SearchableSelect, { Option } from "../../components/form/selectSeach";
import { CellClass, useCellsByClassLazyQuery, useClassesQuery } from "../../domain/graphql";
import Button from "../../components/ui/button/Button";
import { ButtonTable, Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import { Pagination } from "../../components/ui/table/pagination";
import { useModal } from "../../hooks/useModal";
import { CreateBundleModal } from "./createModalBundle";

export default function ClassesPage() {
  const { data } = useClassesQuery();
  const {closeModal, isOpen, openModal} = useModal()
  const [typeClass, setTypeClass] = useState<string>("");
  const [typeSubClass, setTypeSubClass] = useState<string>("");
  const [cells, setCells] = useState<CellClass[]>([]);
  const [selectedCellIds, setSelectedCellIds] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const [getCellsByClass, { loading }] = useCellsByClassLazyQuery();

  const selectedClass = data?.Classes.find((c) => c.id === typeClass);

  const optionsClass: Option[] = data?.Classes.map((item) => ({
    label: item.name,
    value: item.id,
  })) || [];

  const optionsSubClass: Option[] = selectedClass?.subclasses?.map((sub) => ({
    label: sub.name,
    value: sub.id,
  })) || [];

  const handleClearFilters = () => {
    setTypeClass("");
    setTypeSubClass("");
    setCells([]);
    setCurrentPage(1);
  };

  const handleFilter = async () => {
    setCells([])
    if (!typeClass) return;
    const { data } = await getCellsByClass({
      variables: {
        classId: typeClass,
        subClassId: typeSubClass || null,
      },
    });
    //@ts-ignore
    setCells(() => data?.cellsByClass || []);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (limit: number) => {
    setItemsPerPage(limit);
    setCurrentPage(1);
  };

  const paginatedCells = cells.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleCheckboxChange = (id: string) => {
    setSelectedCellIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const handleSend = () => {
    console.log("IDs seleccionados:", selectedCellIds);
    openModal()
    // Aquí podrías enviar los datos a un servicio backend o realizar alguna acción.
  };

  return (
    <div>
      <PageMeta title="Clases" description="Filtrado de celulares por clase y subclase" />
      <PageBreadcrumb pageTitle="Clases" />

      <div className="p-4 space-y-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        {/* Selectores */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Clases
          </label>
          <SearchableSelect
            className="relative"
            options={optionsClass}
            placeholder="Seleccionar una clase"
            onChange={(value) => {
              setTypeClass(value);
              setTypeSubClass("");
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Subclases
          </label>
          <SearchableSelect
            className="relative"
            options={optionsSubClass}
            placeholder="Seleccionar una subclase"
            onChange={(value) => setTypeSubClass(value)}
          />
        </div>

        {/* Botones */}
        <div className="flex space-x-2">
          <Button
            onClick={handleFilter}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            disabled={!typeClass || loading}
          >
            {loading ? "Cargando..." : "Filtrar"}
          </Button>
          <Button
            onClick={handleClearFilters}
            className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
          >
            Borrar filtro
          </Button>
        </div>
      </div>
      <div className="p-4 space-y-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] mt-4">
      {/* Tabla */}
      {cells.length > 0 && (
        <div className="mt-6">
          <ButtonTable onClick={() => handleSend()}>
            Enviar mensaje
          </ButtonTable>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Nombre</TableCell>
                <TableCell isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Apellido</TableCell>
                <TableCell isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Email</TableCell>
                <TableCell isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Celular</TableCell>
                   <TableCell isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">-</TableCell>
              </TableRow>
              
            </TableHeader>
            <TableBody>
              {paginatedCells.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.cell.nombre}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.cell.apellido}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.cell.email}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.cell.celular}</TableCell>
                  <TableCell className="px-4">
                    <input
                      type="checkbox"
                      checked={selectedCellIds.includes(item.cell.id)}
                      onChange={() => handleCheckboxChange(item.cell.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination
            totalItems={cells.length}
            itemsPerPage={itemsPerPage}
            totalPages={Math.ceil(cells.length / itemsPerPage)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            className="mt-6"
          />
          <CreateBundleModal
            isOpen={isOpen}
            closeModal={closeModal}
            celularesIds={selectedCellIds}
            openModal={openModal}
          />
        </div>
      )}
      </div>
    </div>
  );
}
