import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useUser } from "../../context/UserContext";
import dayjs from "dayjs";
import TextArea from "../../components/form/input/TextArea";
import SearchableSelect, { Option } from "../../components/form/selectSeach";
import { Client, ProyectosStatusEnum, TypeClientEnum, useCitiesQuery, useClientsQuery, useCreateProyectoMutation, useCreateProyectoReferenciaMutation, useMarcaProyectosQuery, useProyectoQuery, useRemoveProyectoReferenciaMutation, useTipoProyectosQuery, useUpdateClientMutation, useUpdateProyectoMutation } from "../../domain/graphql";
import { CurrencyInput } from "../../components/form/NumberCurrey";
import Select from "../../components/form/Select";
import { z } from "zod";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { formatCurrency, ToastyErrorGraph } from "../../lib/utils";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import { Loader, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { apolloClient } from "../../main.config";
import { TIPOS_VERTICALES } from "../../lib/vertical";
import { DepartmentAndMunicipality } from "../../composables/DepartmentAndMunicipality";

const typeClientOptions: Option[] = [
  {
    value: TypeClientEnum.ClienteFinal,
    label: "FINAL"
  },
  {
    value: TypeClientEnum.Distribuidor,
    label: "DISTRIBUIDOR"
  },
  {
    value: TypeClientEnum.Instalador,
    label: "INSTALADOR"
  },
  {
    value: TypeClientEnum.Integrador,
    label: "INTEGRADOR"
  },
];

export default function ViewCliente({client: initialClient}: {client: Client | undefined}) {
  const { user } = useUser();
  const [updateCliente] = useUpdateClientMutation();
  const [client, setClient] = useState<Client | undefined>(initialClient);
  const [location, setLocation] = useState({
    departmentId: initialClient?.department?.id || "",
    municipalityId: initialClient?.city?.id || ""
  });

  const handleLocationChange = (values: {
    departmentId: string;
    municipalityId: string;
  }) => {
    setLocation(values);
  };

  const handleInputChange = (field: keyof Client) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setClient(prev => ({
      ...prev!,
      [field]: e.target.value
    }));
  };

  const handleSelectChange = (field: keyof Client) => (value: string) => {
    setClient(prev => ({
      ...prev!,
      [field]: value
    }));
  };

  const onUpdate = async () => {
    if (!client) return;

    try {
      const toastId = toast.loading("Actualizando cliente...");
      
      const data  = await updateCliente({
        variables: {
          updateInput: {
            id: client.id,
            name: client.name,
            numberDocument: client.numberDocument,
            email: client.email,
            celular: client.celular,
            type: client.type as TypeClientEnum,
            vertical: client.vertical,
            telefono: client.telefono,
            address: client.address,
            departmentId: location.departmentId,
            cityId: location.municipalityId
          }
        }
      });
      if(data.errors){
        toast.error("Uppss hubo un error al actualizar", { id: toastId });
        return
      }
      toast.success("Cliente actualizado correctamente", { id: toastId });
      

    } catch (error) {
      ToastyErrorGraph(error as any);
    }
  };

  if (!client) {
    return <div className="flex justify-center items-center h-screen">
      <Loader className="animate-spin" />
    </div>;
  }

  return (
    <div>
      <PageMeta
        title={client.name}
        description="Información detallada del cliente"
      />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[1000px] text-center">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Información general del cliente
          </h3>
          <div>
            <div className="mt-6">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Nombre del cliente
              </label>
              <div className="relative">
                <input
                  id="title"
                  type="text"
                  value={client.name}
                  onChange={handleInputChange('name')}
                  className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6 modal-footer">
              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Numero del cliente
                </label>
                <div className="relative">
                  <input
                    id="title"
                    type="text"
                    value={client.numberDocument}
                    onChange={handleInputChange('numberDocument')}
                    className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Correo del cliente
                </label>
                <div className="relative">
                  <input
                    id="title"
                    type="text"
                    value={client.email}
                    onChange={handleInputChange('email')}
                    className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Numero de celular
                </label>
                <div className="relative">
                  <input
                    id="title"
                    type="text"
                    value={client.celular}
                    onChange={handleInputChange('celular')}
                    className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
              <div className="mt-7 w-80">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tipo de cliente
                </label>
                <SearchableSelect
                  className="relative"
                  options={typeClientOptions}
                  placeholder="Seleccionar tipo de cliente"
                  onChange={handleSelectChange('type')}
                  defaultValue={client.type || ''}
                />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6 modal-footer">
              <div className="mt-6 w-100">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tipo de vertical
                </label>
                <SearchableSelect
                  className="relative"
                  options={TIPOS_VERTICALES}
                  placeholder="Seleccionar tipo de vertical"
                  onChange={handleSelectChange('vertical')}
                  defaultValue={client.vertical || ''}
                />
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Teléfono
                </label>
                <div>
                  <input
                    type="text"
                    value={client.telefono || ''}
                    onChange={handleInputChange('telefono')}
                    className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Dirección
                </label>
                <div>
                  <input
                    type="text"
                    value={client.address || ''}
                    onChange={handleInputChange('address')}
                    className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
              <div className="mt-9 w-100">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Departamento y municipio
                </label>
                <DepartmentAndMunicipality
                  onChange={handleLocationChange}
                  departmentId={location.departmentId}
                  municipalityId={location.municipalityId}
                />
              </div>
            </div>
            {/* Botones del modal */}
            <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
              <button
                onClick={onUpdate}
                type="button"
                className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
              >
                Actualizar Cliente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}