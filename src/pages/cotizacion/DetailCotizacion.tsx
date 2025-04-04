import dayjs from "dayjs"
import { CotizacionStatusEnum, DetalleCotizacion, useCotizacionQuery, useProyectosQuery, useSaveDetalleCotizacionMutation, useUpdateCotizacionMutation, useUpdateDetalleCotizacionMutation } from "../../domain/graphql"
import SearchableSelect, { Option } from "../../components/form/selectSeach"
import { useEffect, useState } from "react"
import { ButtonTable, Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table"
import { formatCurrency, ToastyErrorGraph } from "../../lib/utils"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import Swal from "sweetalert2"
import TextArea from "../../components/form/input/TextArea"
interface ResultadosCalculo {
  subtotalCosto: number;
  subtotalVenta: number;
  utilidadBruta: number;
  porcentajeUtilidad: number;
  detallesConCalculos: Array<
    DetalleCotizacion & {
      subtotalCosto: number;
      subtotalVenta: number;
      utilidad: number;
      porcentajeUtilidad: number;
    }
  >;
}
function calcularTotalesYUtilidad(detalles: DetalleCotizacion[]): ResultadosCalculo {
  // Calcular valores para cada detalle
  const detallesConCalculos = detalles.map(detalle => {
    const subtotalCosto = detalle.cantidad * detalle.valorCosto;
    const subtotalVenta = detalle.cantidad * detalle.valorVenta;
    const utilidad = subtotalVenta - subtotalCosto;
    const porcentajeUtilidad = subtotalCosto > 0 
      ? (utilidad / subtotalCosto) * 100 
      : 0;

    return {
      ...detalle,
      subtotalCosto,
      subtotalVenta,
      utilidad,
      porcentajeUtilidad: Number(porcentajeUtilidad.toFixed(2)) // Redondear a 2 decimales
    };
  });

  // Calcular totales generales
  const subtotalCosto = detallesConCalculos.reduce((sum, detalle) => sum + detalle.subtotalCosto, 0);
  const subtotalVenta = detallesConCalculos.reduce((sum, detalle) => sum + detalle.subtotalVenta, 0);
  const utilidadBruta = subtotalVenta - subtotalCosto;
  const porcentajeUtilidad = subtotalCosto > 0 
    ? (1 - (subtotalCosto / subtotalVenta)) * 100 
    : 0;

  return {
    subtotalCosto: Number(subtotalCosto.toFixed(2)),
    subtotalVenta: Number(subtotalVenta.toFixed(2)),
    utilidadBruta: Number(utilidadBruta.toFixed(2)),
    porcentajeUtilidad: Number(porcentajeUtilidad.toFixed(2)),
    detallesConCalculos
  };
}
interface DetailCotizacionViewProps {
    id: string
}

interface EditableField {
    id: string;
    field: 'valorCosto' | 'valorVenta';
    value: number;
}

const optionsStatus: Option[] = Object.values(CotizacionStatusEnum).map((status)=> {
  return {
    label: status,
    value: status
  }
})

const calcularPorcentajeUtilidad = (costo: number, venta: number): number => {
  if (costo <= 0) return 0;
  const utilidad = venta - costo;
  return Number(((utilidad / venta) * 100).toFixed(2));
};

export const DetailCotizacionView: React.FC <DetailCotizacionViewProps> = ({ id }) => {
    const [status, setStatus] = useState<string>()
    const [proyectoId, setProyectoId] = useState<string>()
    const [description, setDescription] = useState<string>("")
    const [editingField, setEditingField] = useState<EditableField | null>(null)
    const [saveDetail] = useSaveDetalleCotizacionMutation()
    const [updateCotizacion] = useUpdateCotizacionMutation()
    const [updateDetalle] = useUpdateDetalleCotizacionMutation()

    const {data, loading, refetch} = useCotizacionQuery({
        variables: {
            cotizacionId: id
        },
        skip: !id
    })

    const {data: dataProyecto, loading: loadingProyecto} = useProyectosQuery({
      variables: {
        pagination: {
          skip: 0,
          take: 9999999
        }
      }
    })

    const proyectoOption: Option[] = dataProyecto?.proyectos.map((proyecto) => {
      return {
        label: proyecto.name,
        value: proyecto.id
      }
    }) || []

    useEffect(() => {
      if (data?.cotizacion) {
        setDescription(data.cotizacion.descripcion || "")
      }
    }, [data?.cotizacion])

    const handleStartEditing = (id: string, field: 'valorCosto' | 'valorVenta', value: number) => {
      setEditingField({ id, field, value })
    }

    const handleSaveEdit = async () => {
      if (!editingField) return

      const toastId = toast.loading('Actualizando valor...')
      try {
        const res = await updateDetalle({
          variables: {
            updateInput: {
              id: editingField.id,
              valorCosto: editingField.field == 'valorCosto' ? editingField.value : undefined,
              valorVenta: editingField.field == 'valorVenta' ? editingField.value : undefined,
            }
          }
        })

        if (res.errors) {
          toast.error('Error al actualizar')
          return
        }

        await refetch({ cotizacionId: id })
        toast.success('Valor actualizado correctamente')
        setEditingField(null)
      } catch (err) {
        ToastyErrorGraph(err as any)
      } finally {
        toast.dismiss(toastId)
      }
    }

    const onFindDetail = async () => {
      const toastId = toast.loading('Buscando detalle de la cotizacion...')
      try {
        const res = await saveDetail({
          variables: {
            saveDetalleCotizacionId: data?.cotizacion?.numeroCotizacion || ''
          }
        })
        if(res.errors){
          toast.error('Error al obtener el detalle')
          return
        }
        await refetch({ cotizacionId: id })
      } catch (err) {
        ToastyErrorGraph(err as any)
      } finally {
        toast.dismiss(toastId)
      }
    }

    const onCreateSubmit = async () => {
      try {
        const result = await Swal.fire({
          title: "¿Estás seguro?",
          text: "¿Deseas actualizar esta cotización?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sí, actualizar",
          cancelButtonText: "Cancelar",
        })

        if(result.isConfirmed) {        
          const res = await updateCotizacion({
            variables: {
              updateInput: {
                id: id,
                descripcion: description,
                status: status ? status as CotizacionStatusEnum : undefined,
                proyectoId: proyectoId
              }
            }
          })
          if(res.errors){
            toast.error('Hubo un error: ' + res.errors[0])
            return
          }
          toast.success('Actualizado con éxito')
        }
      } catch (err) {
        ToastyErrorGraph(err as any)
      }
    }

    if(loading){
        return <>Cargando Información...</>
    }

    const dataCotizacion = data?.cotizacion
    //@ts-ignore
    const resultados = calcularTotalesYUtilidad(dataCotizacion?.detalle || []);
    return(
        <>
            <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl text-center">
                Información general de la cotización
            </h3>
            
            {/* Campos de información general (se mantienen igual) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {/* Campo: Título de la tarea */}
              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Numero de cotización
                </label>
                <div className="relative">
                  <input
                    disabled={true}
                    value={dataCotizacion?.numeroCotizacion}
                    className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Fecha de cotización
                </label>
                <div className="relative">
                  <input
                    disabled={true}
                    value={dayjs(dataCotizacion?.fecha).format('YYYY-MM-DD')}
                    className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Nit o cedula
                </label>
                <div className="relative">
                  <input
                    disabled={true}
                    value={dataCotizacion?.nitCliente}
                    className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Nombre de cliente
                </label>
                <div className="relative">
                  <input
                    disabled={true}
                    value={dataCotizacion?.nombreCliente}
                    className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Ciudad del cliente
                </label>
                <div className="relative">
                  <input
                    disabled={true}
                    value={dataCotizacion?.ciudadCliente}
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
                    disabled={true}
                    value={dataCotizacion?.emailCliente}
                    className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Estado de la cotización
                </label>
                <div className="relative">
                  <SearchableSelect
                    options={optionsStatus}
                    placeholder="Seleccionar estado"
                    onChange={(e) => setStatus(e)}
                    defaultValue={dataCotizacion?.status || ''}
                  />
                </div>
              </div>
              <div className="mt-6 w-full">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Seleciones un proyecto
                </label>
                <div className="relative">
                  {
                    loadingProyecto
                    ?
                    <>Cargando proyectos...</>
                    :
                    <SearchableSelect
                      options={proyectoOption}
                      placeholder="Seleccionar un proyecto"
                      onChange={(e) => setProyectoId(e)}
                      defaultValue={dataCotizacion?.proyecto?.id}
                    />
                  }
                </div>
              </div>
              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Valor de la cotizacion
                </label>
                <div className="relative">
                  <input
                    disabled={true}
                    value={formatCurrency(dataCotizacion?.valor || 0)}
                    className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
            </div>

            <div className="text-left mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Descripción del proyecto
                </label>
                <TextArea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e)}
                  className="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-base text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
            </div>

            <div className="mt-6">
              {!(dataCotizacion?.detalle?.length) && (
                <ButtonTable onClick={onFindDetail}>
                  Obtener detalle
                </ButtonTable>
              )}
              
              <Table>
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      #
                    </TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Referencia
                    </TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Descripción
                    </TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Medida
                    </TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Cantidad
                    </TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Costo
                    </TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Venta
                    </TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Utilidad
                    </TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {dataCotizacion?.detalle?.map((detail) => (
                    <TableRow key={detail.id}>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {detail.uuid}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {detail.referencia}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          {detail.descripcion}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          {detail.unidadMedida}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          {detail.cantidad}
                      </TableCell>
                      <TableCell 
                        className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 cursor-pointer"
                        onClick={() => handleStartEditing(detail.id, 'valorCosto', detail.valorCosto)}
                      >
                        {editingField?.id === detail.id && editingField.field === 'valorCosto' ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={editingField.value}
                              onChange={(e) => setEditingField({
                                ...editingField,
                                value: parseFloat(e.target.value) || 0
                              })}
                              className="w-24 p-1 border rounded"
                            />
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                handleSaveEdit()
                              }}
                              className="px-2 py-1 bg-blue-500 text-white rounded"
                            >
                              ✓
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                setEditingField(null)
                              }}
                              className="px-2 py-1 bg-gray-500 text-white rounded"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          formatCurrency(detail.valorCosto)
                        )}
                      </TableCell>
                      <TableCell 
                        className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 cursor-pointer"
                        onClick={() => handleStartEditing(detail.id, 'valorVenta', detail.valorVenta)}
                      >
                        {editingField?.id === detail.id && editingField.field === 'valorVenta' ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={editingField.value}
                              onChange={(e) => setEditingField({
                                ...editingField,
                                value: parseFloat(e.target.value) || 0
                              })}
                              className="w-24 p-1 border rounded"
                            />
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                handleSaveEdit()
                              }}
                              className="px-2 py-1 bg-blue-500 text-white rounded"
                            >
                              ✓
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                setEditingField(null)
                              }}
                              className="px-2 py-1 bg-gray-500 text-white rounded"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          formatCurrency(detail.valorVenta)
                        )}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {calcularPorcentajeUtilidad(detail.valorCosto, detail.valorVenta)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Costo Total
          </label>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatCurrency(resultados.subtotalCosto)}
          </div>
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Venta Total
          </label>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatCurrency(resultados.subtotalVenta)}
          </div>
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Utilidad
          </label>
          <div className={`text-lg font-semibold ${
            resultados.utilidadBruta >= 0 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            {formatCurrency(resultados.utilidadBruta)}
          </div>
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Margen
          </label>
          <div className={`text-lg font-semibold ${
            resultados.porcentajeUtilidad >= 0 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            {resultados.porcentajeUtilidad.toFixed(2)}%
          </div>
        </div>
      </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={onCreateSubmit}
                  className="btn btn-success btn-update-event flex justify-center rounded-lg bg-brand-500 px-6 py-3 text-sm font-medium text-white hover:bg-brand-600"
                >
                  Actualizar Cotización
                </button>
              </div>
            </div>
        </>
    )
}