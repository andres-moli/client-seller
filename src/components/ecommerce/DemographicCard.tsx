import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import CountryMap from "./CountryMap";
import { useVentasPorVendedorDepartamentoQuery } from "../../domain/graphql";
import { formatCurrency } from "../../lib/utils";
import { useUser } from "../../context/UserContext";

export default function DemographicCard() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const { data } = useVentasPorVendedorDepartamentoQuery({
    variables: {
      input: {
        vendedor: user?.identificationNumber || ''
      },
    },
  });

  const ventasData = data?.ventasPorVendedorDepartamento || [];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Ventas por Departamento
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Resumen de ventas y utilidad
          </p>
        </div>
        <div className="relative inline-block">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
          </button>
          <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
            <DropdownItem onItemClick={closeDropdown} className="text-gray-500 hover:bg-gray-100">Ver más</DropdownItem>
            <DropdownItem onItemClick={closeDropdown} className="text-gray-500 hover:bg-gray-100">Eliminar</DropdownItem>
          </Dropdown>
        </div>
      </div>
      <CountryMap 
      ventas={ventasData}
      />

      <div className="space-y-5">
        {ventasData.map((venta, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">{venta.departamento}</p>
              <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                {formatCurrency(venta.venta)}
              </span>
            </div>
            <div className="flex w-full max-w-[140px] items-center gap-3">
              <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
                <div
                  className="absolute left-0 top-0 flex h-full items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"
                  style={{ width: `${venta.utilidad_porcentaje}%` }}
                ></div>
              </div>
              <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {venta.utilidad_porcentaje}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
