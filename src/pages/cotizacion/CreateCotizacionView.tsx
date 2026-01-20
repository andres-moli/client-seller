import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Trash2,
  Plus,
  Calculator,
  FileText,
  User,
  Package,
  Loader2,
  Info,
  Percent,
  Tag,
  Package2,
  Bot
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from "../../components/ui/table";
import Input from "../../components/form/input/InputField";
import { formatCurrency, ToastyErrorGraph } from "../../lib/utils";
import { useCreateCotizacionIntranetMutation, UserStatusTypes, useUsersQuery } from "../../domain/graphql";
import { toast } from "sonner";
import { useUser } from "../../context/UserContext";
import { AIModal } from "./AIModal";

interface Cliente {
  nit: string;
  nombre: string;
  celular: string;
  email: string;
  dirrecion: string;
  ciudad: string;
  plazo: number;
  vendedor: string;
}

interface ProductoAPI {
  referencia: string;
  Descripcion: string;
  Stock: number;
  Costo: number;
  Iva?: number;
  Medida?: string;
}

interface ItemCotizacion {
  referencia: string;
  descripcion: string;
  costo: number;
  utilidad: number;
  cantidad: number;
  venta: number;
  subtotal: number;
  subtotalConIva: number;
  iva: number;
  stock: number;
  entrega: string
  unidad: string;
}
export const toInteger = (value: number): number => {
  return Math.round(value);
};

export const CreateCotizacionView = () => {
  /* ================= CLIENTE ================= */
  const {user} = useUser()
  const [clienteQuery, setClienteQuery] = useState("");
  const [clientesOptions, setClientesOptions] = useState<Cliente[]>([]);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loadingCliente, setLoadingCliente] = useState(false);
  const [showClienteDropdown, setShowClienteDropdown] = useState(false);
  const [createCotizacion] = useCreateCotizacionIntranetMutation();
  
  /* ================= PLAZO ================= */
  const [plazo, setPlazo] = useState("1");
  
  /* ================= TRABAJADOR ================= */
  const { data: usersData } = useUsersQuery({
    variables: {
      pagination: {
        skip: 0,
        take: 99999
      }
    }
  });
  const trabajadores = useMemo(() => usersData?.users.filter(u => u.status === UserStatusTypes.Active) || [], [usersData]);
  const [trabajadorSeleccionado, setTrabajadorSeleccionado] = useState<any>(null);

  useEffect(() => {
    if (clienteQuery.length < 2) {
      setClientesOptions([]);
      setShowClienteDropdown(false);
      return;
    }

    const buscarClientes = async () => {
      setLoadingCliente(true);
      try {
        const res = await fetch(
          `https://intranet.cytech.net.co:3003/brute-force/getClienteSearch?value=${encodeURIComponent(clienteQuery)}`
        );
        const data = await res.json();
        setClientesOptions(Array.isArray(data) ? data : []);
        setShowClienteDropdown(true);
      } catch (error) {
        console.error("Error buscando clientes:", error);
        setClientesOptions([]);
      } finally {
        setLoadingCliente(false);
      }
    };

    const delay = setTimeout(buscarClientes, 300);
    return () => clearTimeout(delay);
  }, [clienteQuery]);

  const seleccionarCliente = (clienteSeleccionado: Cliente) => {
    setCliente(clienteSeleccionado);
    setClienteQuery(clienteSeleccionado.nombre);
    setPlazo(String(clienteSeleccionado.plazo));
    const trabajador = trabajadores.find(t => t.identificationNumber === clienteSeleccionado.vendedor);  
    setTrabajadorSeleccionado(trabajador || null);
    setShowClienteDropdown(false);
    setClientesOptions([]);
  };

  /* ================= PRODUCTOS ================= */
  const [queryProducto, setQueryProducto] = useState("");
  const [productos, setProductos] = useState<ProductoAPI[]>([]);
  const [loadingProductos, setLoadingProductos] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (queryProducto.length < 3) {
      setProductos([]);
      return;
    }

    const fetchProductos = async () => {
      setLoadingProductos(true);
      try {
        const res = await fetch(
          `https://intranet.cytech.net.co:3003/ventas/buscar/tienda/${encodeURIComponent(queryProducto)}`
        );
        const data = await res.json();
        setProductos(data || []);
      } catch (error) {
        console.error("Error buscando productos:", error);
      } finally {
        setLoadingProductos(false);
      }
    };

    const delay = setTimeout(fetchProductos, 400);
    return () => clearTimeout(delay);
  }, [queryProducto]);

  /* ================= ITEMS ================= */
  const [items, setItems] = useState<ItemCotizacion[]>([]);

  // Estado para controlar edición por celda (index-field)
  const [editing, setEditing] = useState<Record<string, boolean>>({});

  /* ================= IA MODAL ================= */
  const [showAIModal, setShowAIModal] = useState(false);
  const isEditing = (index: number, field: string) => !!editing[`${index}-${field}`];
  const startEditing = (index: number, field: string) => setEditing(prev => ({ ...prev, [`${index}-${field}`]: true }));
  const stopEditing = (index: number, field: string) => setEditing(prev => { const copy = { ...prev }; delete copy[`${index}-${field}`]; return copy; });

  const agregarItem = (producto: ProductoAPI) => {
    const utilidad = 20;
    const ivaPorcentaje = producto.Iva || 19;
    const venta = producto.Costo + producto.Costo * (utilidad / 100);
    const subtotal = venta;
    const iva = subtotal * (ivaPorcentaje / 100);
    const subtotalConIva = subtotal + iva;

    setItems(prev => [
      ...prev,
      {
        referencia: producto.referencia,
        descripcion: producto.Descripcion,
        costo: producto.Costo,
        utilidad,
        cantidad: 1,
        venta,
        subtotal,
        subtotalConIva,
        iva,
        stock: producto.Stock,
        entrega: producto.Stock > 0 ? "Inmediata" : "",
        unidad: producto.Medida || "UN"
      }
    ]);

    setQueryProducto("");
    setProductos([]);
  };

  const actualizarItem = (
    index: number,
    field: keyof ItemCotizacion,
    value: number | string 
  ) => {
    const updated = [...items];
    // @ts-ignore
    updated[index][field] = value as any;

    const item = updated[index];
    const { costo, utilidad, cantidad, venta } = item;
    const ivaPorcentaje = 19;
    
    // Recalcular venta si cambió utilidad
    let newVenta = venta;
    if(field === "utilidad"){
      newVenta = costo + costo * (Number(utilidad) / 100);
    }
    
    const subtotal = newVenta * cantidad;
    const iva = subtotal * (ivaPorcentaje / 100);
    const subtotalConIva = subtotal + iva;

    updated[index].venta = newVenta;
    updated[index].subtotal = subtotal;
    updated[index].iva = iva;
    updated[index].subtotalConIva = subtotalConIva;

    setItems(updated);
  };

  const eliminarItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

    /* ================= TOTALES ================= */
  const totalCosto = useMemo(
    () => items.reduce((s, i) => s + i.costo * i.cantidad, 0),
    [items]
  );

  const totalVenta = useMemo(
    () => items.reduce((s, i) => s + i.subtotal, 0),
    [items]
  );

  const totalIva = useMemo(
    () => items.reduce((s, i) => s + i.iva, 0),
    [items]
  );

  const totalConIva = useMemo(
    () => items.reduce((s, i) => s + i.subtotalConIva, 0),
    [items]
  );

  const utilidadTotal = useMemo(
    () => totalVenta - totalCosto,
    [totalVenta, totalCosto]
  );

  const handleGuardarCotizacion = async() => {
    if (!cliente) return;
    // Lógica para guardar la cotización usando createCotizacion
    try {
      setIsLoading(true);
      const res = await createCotizacion({
        variables: {
          input: {
            cotizacion: {
              numeroCotizacion: cliente.nit,
              fecha: new Date(),
              nombreCliente: cliente.nombre,
              nombreVendedor: trabajadorSeleccionado?.fullName || user?.fullName || "Vendedor",
              vendedor: trabajadorSeleccionado?.identificationNumber || user?.identificationNumber || "Vendedor",
              ciudadCliente: cliente.ciudad,
              emailCliente: cliente.email,
              nitCliente: cliente.nit,
              valor: toInteger(totalVenta),
              plazo: Number(plazo),
            },
            detalle: items.map((item) => ({
              CANTIDAD: item.cantidad,
              DESCRIPCION: item.descripcion,
              REFERENCIA: item.referencia,
              TIEMPO_ENTREGA: item.entrega,
              TOTAL: toInteger(item.venta * item.cantidad),
              UNIDMED: item.unidad,
              UNIT_MEDIDA: item.unidad,
              VCOSTO: toInteger(item.costo),
              VVENTA: toInteger(item.venta),
          }))
          },
        }
      });
      if(res.data?.createCotizacionIntranet?.id){
        toast.success("Cotización creada exitosamente");
      }
      else{
        toast.error("Error al crear la cotización");
      }
    } catch (error) {
      console.error("Error creando cotización:", error);
      ToastyErrorGraph(error as any);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-brand-50">
            <FileText className="text-brand-600" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Nueva Cotización
            </h2>
            <p className="text-sm text-gray-500">Complete los datos del cliente y agregue productos</p>
          </div>
        </div>
        
        {/* Botón IA */}
        {/* <button
          onClick={() => setShowAIModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
          title="Usar asistente de IA para agregar productos"
        >
          <Bot size={18} />
          <span className="hidden sm:inline">Asistente IA</span>
        </button> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SEARCH ROW - Cliente, Productos, Plazo y Trabajador */}
        <div className="lg:col-span-3 space-y-6">
          {/* Fila 1: Cliente y Productos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CLIENTE */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-blue-50">
                <User className="text-blue-600" size={18} />
              </div>
              <h3 className="font-semibold text-gray-900">Información del Cliente</h3>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Buscar cliente por nombre o NIT (mínimo 2 caracteres)"
                  className="pl-9"
                  value={clienteQuery}
                  onChange={e => setClienteQuery(e.target.value)}
                />
                {loadingCliente && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-gray-400" size={16} />
                )}
              </div>

              {/* Dropdown de opciones */}
              {showClienteDropdown && clientesOptions.length > 0 && (
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Resultados ({clientesOptions.length})
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y">
                    {clientesOptions.map((clienteOption) => (
                      <button
                        key={clienteOption.nit}
                        onClick={() => seleccionarCliente(clienteOption)}
                        className="w-full text-left p-4 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <User size={14} className="text-gray-400" />
                              <p className="font-medium text-gray-900">{clienteOption.nombre}</p>
                            </div>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{clienteOption.email}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs">
                              <span className="flex items-center gap-1 text-gray-500">
                                NIT: {clienteOption.nit}
                              </span>
                              <span className="flex items-center gap-1 text-gray-500">
                                {clienteOption.celular}
                              </span>
                            </div>
                          </div>
                          <Plus size={16} className="text-gray-400 group-hover:text-blue-600" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {clienteQuery.length >= 2 && !loadingCliente && clientesOptions.length === 0 && showClienteDropdown && (
                <div className="text-center py-8 text-gray-500">
                  <User className="mx-auto mb-2 text-gray-300" size={24} />
                  <p>No se encontraron clientes</p>
                  <p className="text-sm">Intenta con otros términos de búsqueda</p>
                </div>
              )}
            </div>

            {cliente && (
              <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <User className="text-blue-600" size={16} />
                    <p className="font-semibold text-blue-900">{cliente.nombre}</p>
                  </div>
                  <button
                    onClick={() => {
                      setCliente(null);
                      setClienteQuery("");
                      setClientesOptions([]);
                    }}
                    className="text-xs px-2 py-1 rounded bg-blue-200 text-blue-700 hover:bg-blue-300 transition-colors"
                  >
                    Cambiar
                  </button>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="text-gray-500 w-16">NIT:</span>
                    <span className="font-medium">{cliente.nit}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-gray-500 w-16">Email:</span>
                    <span>{cliente.email}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-gray-500 w-16">Celular:</span>
                    <span>{cliente.celular}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-gray-500 w-16">Dirección:</span>
                    <span>{cliente.dirrecion}</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* BUSCAR PRODUCTOS */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-green-50">
                <Package className="text-green-600" size={18} />
              </div>
              <h3 className="font-semibold text-gray-900">Agregar Productos</h3>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Buscar por referencia o descripción (mínimo 3 caracteres)"
                className="pl-9"
                value={queryProducto}
                onChange={e => setQueryProducto(e.target.value)}
              />
              {loadingProductos && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-gray-400" size={16} />
              )}
            </div>

            {productos.length > 0 && (
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Resultados ({productos.length})
                </div>
                <div className="max-h-72 overflow-y-auto divide-y">
                  {productos.map(p => (
                    <button
                      key={p.referencia}
                      onClick={() => agregarItem(p)}
                      className="w-full text-left p-4 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Package2 size={14} className="text-gray-400" />
                            <p className="font-medium text-gray-900">{p.referencia}</p>
                          </div>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{p.Descripcion}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs">
                            <span className="flex items-center gap-1 text-gray-500">
                              <Tag size={12} />
                              {formatCurrency(p.Costo)}
                            </span>
                            <span className={`flex items-center gap-1 ${p.Stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              <Info size={12} />
                              Stock: {p.Stock}
                            </span>
                          </div>
                        </div>
                        <Plus size={16} className="text-gray-400 group-hover:text-blue-600" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {queryProducto.length >= 3 && !loadingProductos && productos.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Package className="mx-auto mb-2 text-gray-300" size={24} />
                <p>No se encontraron productos</p>
                <p className="text-sm">Intenta con otros términos de búsqueda</p>
              </div>
            )}
          </div>
          </div>

          {/* Fila 2: Plazo y Trabajador */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* PLAZO */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-orange-50">
                  <Calculator className="text-orange-600" size={18} />
                </div>
                <h3 className="font-semibold text-gray-900">Forma de pago</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Días
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={plazo}
                    onChange={(e) => setPlazo(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Forma de pago:</span>
                  <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
                    +plazo > 1 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-blue-100 text-blue-700 border border-blue-200'
                  }`}>
                    {+plazo > 1 ? 'CREDITO' : 'DE CONTADO'}
                  </span>
                </div>
              </div>
            </div>

            {/* TRABAJADOR */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-purple-50">
                  <User className="text-purple-600" size={18} />
                </div>
                <h3 className="font-semibold text-gray-900">Asignar a Trabajador</h3>
              </div>
              <select
                value={trabajadorSeleccionado?.id || ""}
                onChange={(e) => {
                  const trabajador = trabajadores.find(t => t.id === e.target.value);
                  setTrabajadorSeleccionado(trabajador || null);
                }}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              >
                <option value="">Selecciona un trabajador...</option>
                {trabajadores.map((trab) => (
                  <option key={trab.id} value={trab.id}>
                    {trab.fullName}
                  </option>
                ))}
              </select>
              {trabajadorSeleccionado && (
                <div className="mt-4 p-3 rounded-lg bg-purple-50 border border-purple-100">
                  <p className="text-sm text-purple-900">
                    <span className="font-medium">Asignado a:</span> {trabajadorSeleccionado.nombre || trabajadorSeleccionado.fullName}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TABLA Y TOTALES - ocupa toda la fila debajo de búsquedas */}
        <div className="lg:col-span-3 space-y-6">
          {/* TABLA DE ITEMS */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50">
              <div className="flex items-center gap-2">
                <Calculator className="text-gray-600" size={18} />
                <h3 className="font-semibold text-gray-900">Productos en Cotización</h3>
                <span className="ml-auto px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {items.length} {items.length === 1 ? 'ítem' : 'ítems'}
                </span>
              </div>
            </div>

            {items.length > 0 ? (
              <div className="overflow-x-auto">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableCell isHeader className="px-5 py-3 font-medium cursor-pointer text-start text-gray-500 dark:text-gray-400">Producto</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium cursor-pointer text-start text-gray-500 dark:text-gray-400">Costo</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium cursor-pointer text-start text-gray-500 dark:text-gray-400">Stock</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium cursor-pointer text-start text-gray-500 dark:text-gray-400">Util %</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium cursor-pointer text-start text-gray-500 dark:text-gray-400">Cant</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium cursor-pointer text-start text-gray-500 dark:text-gray-400">Venta</TableCell>
                      {/* <TableCell isHeader className="px-5 py-3 font-medium cursor-pointer text-start text-gray-500 dark:text-gray-400">Total</TableCell> */}
                      <TableCell isHeader className="px-5 py-3 font-medium cursor-pointer text-start text-gray-500 dark:text-gray-400">Descripción</TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium cursor-pointer text-start text-gray-500 dark:text-gray-400">Acciones</TableCell>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {items.map((item, i) => (
                      <TableRow key={i} className="hover:bg-gray-50 border-b">
                        <TableCell>
                          <div className="min-w-[200px]">
                            <p className="font-medium text-gray-900">{item.referencia}</p>
                            <p className="text-xs text-gray-500 line-clamp-2">{item.descripcion}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(item.costo)}
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.stock > 0 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {item.stock}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="w-20">
                            {isEditing(i, 'utilidad') ? (
                              <Input
                                type="number"
                                min="0"
                                max="500"
                                className="pl-7"
                                value={item.utilidad}
                                onChange={e =>
                                  actualizarItem(i, "utilidad", Number(e.target.value))
                                }
                                // @ts-ignore
                                onBlur={() => stopEditing(i, 'utilidad')}
                                onKeyDown={(e: any) => { if (e.key === 'Enter') (e.target as HTMLElement).blur(); }}
                              />
                            ) : (
                              <div
                                tabIndex={0}
                                role="button"
                                onClick={() => startEditing(i, 'utilidad')}
                                onKeyDown={(e) => { if (e.key === 'Enter') startEditing(i, 'utilidad'); }}
                                className="cursor-pointer"
                              >
                                {item.utilidad}%
                              </div>
                            )}
                          </div>
                        </TableCell> 
                        <TableCell>
                          <div className="w-16">
                            {isEditing(i, 'cantidad') ? (
                              <Input
                                type="number"
                                min="1"
                                className="text-center"
                                // autoFocus
                                value={item.cantidad}
                                onChange={e =>
                                  actualizarItem(i, "cantidad", Number(e.target.value))
                                }
                                // @ts-ignore
                                onBlur={() => stopEditing(i, 'cantidad')}
                                onKeyDown={(e: any) => { if (e.key === 'Enter') (e.target as HTMLElement).blur(); }}
                              />
                            ) : (
                              <div
                                tabIndex={0}
                                role="button"
                                onClick={() => startEditing(i, 'cantidad')}
                                onKeyDown={(e) => { if (e.key === 'Enter') startEditing(i, 'cantidad'); }}
                                className="text-center cursor-pointer py-1"
                              >
                                {item.cantidad}
                              </div>
                            )}
                          </div>
                        </TableCell> 
                        <TableCell className="font-medium">
                          {
                            isEditing(i, 'venta') ? (
                              <Input
                                type="number"
                                min="0"
                                className="pl-7"
                                value={item.venta}
                                onChange={e =>
                                  actualizarItem(i, "venta", Number(e.target.value))
                                }
                                // @ts-ignore
                                onBlur={() => stopEditing(i, 'venta')}
                                onKeyDown={(e: any) => { if (e.key === 'Enter') (e.target as HTMLElement).blur(); }}
                              />
                            ) : (
                              <div
                                tabIndex={0}
                                role="button"
                                onClick={() => startEditing(i, 'venta')}
                                onKeyDown={(e) => { if (e.key === 'Enter') startEditing(i, 'venta'); }}
                                className="cursor-pointer"
                              >
                                {formatCurrency(item.venta)}
                              </div>
                            )
                          }
                          {/* {formatCurrency(item.venta)} */}
                        </TableCell>
                        {/* <TableCell className="font-medium">
                          {formatCurrency(item.subtotalConIva)}
                        </TableCell> */}
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                            <Input
                              type="text"
                              value={item.entrega}
                              onChange={e =>
                                actualizarItem(i, "entrega", e.target.value)
                              }
                              className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                              />
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() => eliminarItem(i)}
                            className="p-2 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-700 transition-colors"
                            title="Eliminar ítem"
                          >
                            <Trash2 size={16} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="mx-auto mb-3 text-gray-300" size={32} />
                <p className="text-gray-500">No hay productos en la cotización</p>
                <p className="text-sm text-gray-400">Busca y agrega productos desde el panel izquierdo</p>
              </div>
            )}
          </div>

          {/* TOTALES */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-gray-100">
                  <Calculator className="text-gray-600" size={16} />
                </div>
                <p className="text-sm font-medium text-gray-600">Costo Total</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalCosto)}</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Tag className="text-blue-600" size={16} />
                </div>
                <p className="text-sm font-medium text-gray-600">Venta Total</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalVenta)}</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-red-100">
                  <Percent className="text-red-600" size={16} />
                </div>
                <p className="text-sm font-medium text-gray-600">Total IVA</p>
              </div>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(totalIva)}</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <FileText className="text-green-600" size={16} />
                </div>
                <p className="text-sm font-medium text-gray-600">Total con IVA</p>
              </div>
              <p className="text-2xl font-bold text-green-700">{formatCurrency(totalConIva)}</p>
            </div>
          </div>

          {/* RESUMEN FINAL */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <h4 className="font-semibold text-gray-900 mb-2">Resumen de la Cotización</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(totalVenta)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IVA (19%):</span>
                    <span>{formatCurrency(totalIva)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold text-gray-900">
                      <span>Total a Pagar:</span>
                      <span className="text-lg">{formatCurrency(totalConIva)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm font-medium text-green-800 mb-1">Utilidad Estimada</p>
                <p className="text-2xl font-bold text-green-700">{formatCurrency(utilidadTotal)}</p>
                <p className="text-xs text-green-600 mt-1">
                  {totalCosto > 0 ? `${((utilidadTotal / totalCosto) * 100).toFixed(1)}% de margen` : 'N/A'}
                </p>
              </div>
            </div>

            {/* BOTÓN GUARDAR */}
            <button
              onClick={handleGuardarCotizacion}
              disabled={items.length === 0 || !cliente || isLoading}
              className="w-full mt-6 flex items-center justify-center gap-3 rounded-lg bg-brand-600 py-3.5 text-white hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <Plus size={18} />
              {
                isLoading
                  ? 'Guardando...'
                  : 'Guardar Cotización'
              }
            </button>
          </div>
        </div>
      </div>

      <AIModal 
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        onItemsAdded={(items) => setItems(prev => [...prev, ...items])}
      />
    </div>
  );
};