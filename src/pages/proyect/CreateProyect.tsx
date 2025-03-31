import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useUser } from "../../context/UserContext";
import dayjs from "dayjs";
import TextArea from "../../components/form/input/TextArea";
import SearchableSelect, { Option } from "../../components/form/selectSeach";
import { AddReferenciaToProyectoInput, ProyectosStatusEnum, useCitiesQuery, useClientsQuery, useCreateProyectoMutation, useMarcaProyectosQuery, useTipoProyectosQuery } from "../../domain/graphql";
import { CurrencyInput } from "../../components/form/NumberCurrey";
import Select from "../../components/form/Select";
import { z } from "zod";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { formatCurrency, ToastyErrorGraph } from "../../lib/utils";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import { PersonStanding, Trash2 } from "lucide-react";
import { apolloClient } from "../../main.config";
import { useNavigate } from "react-router";
import { useModal } from "../../hooks/useModal";
import { CreateClientModal } from "../client/createClient";
interface ProjectItem {
  id: string;
  tipo: string;
  marca: string;
  referencia: string;
  valor: number;
  description?: string;
  idTipo: string;
  idMarca: string;
  idReferencia: string;
}
const proyectoSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  dueDate: z.string().min(7, "La fecha de vencimiento es requerida"),
  status: z.nativeEnum(ProyectosStatusEnum),
  clientIntegrador: z.string().min(1, "El cliente integrador es requerido"),
  clientFinal: z.string().min(1, "El cliente final es requerido"),
  cityId: z.string().min(1, "La ciudad es requerida"),
});
export default function CreateProyecto() {
  const navigate  = useNavigate()
  const {user} = useUser()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [observacion, setObservacion] = useState("");
  const [clientIntegrador, setClientIntegrador] = useState("");
  const [clientFinal, setClientFinal] = useState("");
  const [valor, setValor] = useState(0);
  const [cityId, setCityId] = useState("");
  const [status, setStatus] = useState<ProyectosStatusEnum>(ProyectosStatusEnum.Exploracion);
  const [value, setValue] = useState(0);
  const [dueDate, setDueDate] = useState(dayjs().format("YYYY-MM-DD"));
  const {data, loading} = useClientsQuery()
  const {data: dataCity, loading: loadingCity} = useCitiesQuery({})
  const {data: dataTipoProyecto, loading: loadingTipoProyecto} = useTipoProyectosQuery({})
  const {data: dataMarca, loading: loadingMarca} = useMarcaProyectosQuery({})
  const [createProyecto] = useCreateProyectoMutation()
  // Estado para los valores seleccionados
  const [selectedTipo, setSelectedTipo] = useState("");
  const [selectedMarca, setSelectedMarca] = useState("");
  const [selectedReferencia, setSelectedReferencia] = useState("");
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [referenciaMaca, setReferenciaMarca] = useState<Option[]>([]);
  const {isOpen, closeModal, openModal} = useModal()
  const clienteOptions: Option[] = data?.clients.map((client) => {
    return {
      value: client.id,
      label: client.name
    }
  }) || []
  const cityOptions: Option[] = dataCity?.cities.map((city) => {
    return {
      value: city.id,
      label: city.name
    }
  }).sort((a,b) => a.label.localeCompare(b.label)) || []
  const tipoProyectoOptions: Option[] = dataTipoProyecto?.tipoProyectos.filter((t) => t.isActive).map((tp) => {
    return {
      value: tp.id,
      label: tp.nombre
    }
  }).sort((a,b) => a.label.localeCompare(b.label)) || []
  const marcaOptions: Option[] = dataMarca?.marcaProyectos.filter((t) => t.isActive).map((tp) => {
    return {
      value: tp.id,
      label: tp.nombre
    }
  }).sort((a,b) => a.label.localeCompare(b.label)) || []
  const proyectosStatusOptions: Option[] = Object.values(ProyectosStatusEnum).map((value) => ({
    label: value.replace("_", " "), // Opcional: Formatear los labels
    value,
  }));
  const onCreateSubmit = async () => {
    const validationResult = proyectoSchema.safeParse({
      title,
      description,
      dueDate,
      clientIntegrador,
      clientFinal,
      cityId, 
      status
    });
    

    if (!validationResult.success) {
      toast.error(validationResult.error.errors[0].message);
      return;
    }
    try {
        const result = await Swal.fire({
          title: "¿Estás seguro?",
          text: "¿Deseas crear este proyecto?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sí, crear",
          cancelButtonText: "Cancelar",
        });
        if(result.dismiss){
          return
        }
        if(result.isConfirmed) {    
          const metada: AddReferenciaToProyectoInput[] = projects.map(data => {
            return {
              marcaId: data.idMarca,
              referenciaId: data.idReferencia,
              tipoProyectoId: data.idTipo,
              valor: data.valor,
              observacion: data.description
            }
          })      
          const res = await createProyecto({
          variables: {
            createInput: {
              dateExpiration: dueDate,
              name: title,
              status: status,
              cityId: cityId,
              workerId: user?.id || '',
              description: description,
              clientFinalId: clientFinal,
              clientIntegradorId: clientIntegrador,
              value: value,
              metaData: metada
            }
          }
          })
          if(res.errors){
            toast.error('Hubo un error: ' + res.errors[0]);
            return
          }
          apolloClient.cache.evict({ fieldName: "proyectos" })
          toast.success('Proyecto Creado con exito')
          navigate('/proyect')
        }
    } catch (err){
      ToastyErrorGraph(err as any)
    }
  }
    // Función para agregar un nuevo proyecto a la tabla
  const handleAddProject = () => {
    if (selectedTipo && selectedMarca && selectedReferencia) {
      const tipo =  tipoProyectoOptions.find(opt => opt.value === selectedTipo);
      const marca = marcaOptions.find(opt => opt.value === selectedMarca);
      const referencia = referenciaMaca.find(opt => opt.value === selectedReferencia);
      const newProject: ProjectItem = {
        id: Date.now().toString(),
        tipo: tipo?.label || selectedTipo,
        marca: marca?.label || selectedMarca,
        referencia: referencia?.label || selectedReferencia,
        idMarca: marca?.value || '',
        idReferencia: referencia?.value || '',
        idTipo: tipo?.value || '',
        valor: valor,
        description: observacion
      };

      setProjects([...projects, newProject]);

    }
  };
  
    // Función para eliminar un proyecto de la tabla
  const handleRemoveProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };
  useEffect(()=>{
    if(dataMarca?.marcaProyectos){
      const marcaSelectd = dataMarca?.marcaProyectos.find((value) => value.id == selectedMarca)
      if(marcaSelectd){
        const referenciasOption: Option[] = marcaSelectd.referencias.filter((t) => t.isActive).map((refe) => {
          return {
            label: refe.codigo,
            value: refe.id
          }
        })
        setReferenciaMarca(referenciasOption)
      }
    }
  }, [selectedMarca])
  return (
    <div>
      <PageMeta
        title="Crear Prpyecto"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      {/* <PageBreadcrumb pageTitle="Blank Page" /> */}
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
  <div className="mx-auto w-full max-w-[1000px] text-center">
    <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
      Crear proyecto
    </h3>
    
    {/* Sección de información básica */}
    <div className="mt-8 space-y-6">
      {/* Nombre del proyecto */}
      <div className="text-left">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Nombre del proyecto
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
        />
      </div>

      {/* Descripción */}
      <div className="text-left">
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

      {/* Grid de 3 columnas para los campos del formulario */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Fila 1 */}
        <div className="space-y-2 text-left">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Fecha de vencimiento
          </label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
        </div>

        <div className="space-y-2 text-left">
          {loading ? (
            <p>Cargando clientes...</p>
          ) : (
            <>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Cliente integrador
              </label>
              <SearchableSelect
                placeholder="Seleccione el cliente integrador"
                options={clienteOptions}
                onChange={setClientIntegrador}
              />
            </>
          )}
          <PersonStanding 
            onClick={openModal}
            className="cursor-pointer text-gray-700 dark:text-gray-400"
          />
        </div>

        <div className="space-y-2 text-left">
          {loading ? (
            <p>Cargando clientes...</p>
          ) : (
            <>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Cliente Final
              </label>
              <SearchableSelect
                placeholder="Seleccione el cliente final"
                options={clienteOptions}
                onChange={setClientFinal}
              />
            </>
          )}
        </div>

        {/* Fila 2 */}
        <div className="space-y-2 text-left">
          {loadingCity ? (
            <p>Cargando ciudades...</p>
          ) : (
            <>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Seleccione una ciudad
              </label>
              <SearchableSelect
                placeholder="Seleccione una ciudad"
                options={cityOptions}
                onChange={setCityId}
              />
            </>
          )}
        </div>

        <div className="space-y-2 text-left">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Valor del proyecto ({formatCurrency(value)})
          </label>
          <input
            type="number"
            onChange={(e) => setValue(+e.target.value)}
            className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
        </div>

        <div className="space-y-2 text-left">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Etapa del proyecto
          </label>
          <Select
            placeholder="Seleccione una etapa del proyecto"
            options={proyectosStatusOptions}
            onChange={(e)=> setStatus(e as any)}
          />
        </div>
      </div>

      {/* Sección de marcas y referencias */}
      <div className="mt-8 space-y-6">
        <h4 className="text-left font-medium text-gray-700 dark:text-gray-300">
          Agregar marcas y referencias
        </h4>
        
        {/* Selectores de marca/referencia */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tipo proyecto
            </label>
            {
              loadingTipoProyecto
              ?
              <>Cargando tipo de proyectos</>
              :
              <SearchableSelect
                options={tipoProyectoOptions}
                placeholder="Seleccionar tipo"
                onChange={setSelectedTipo}
                defaultValue={selectedTipo}
              />
            }
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Marca proyecto
            </label>
            {
              loadingMarca
              ?
              <>Cargando marcas</>
              : 
              <SearchableSelect
              options={marcaOptions}
              placeholder="Seleccionar marca"
              onChange={setSelectedMarca}
              defaultValue={selectedMarca}
            />
            }
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Referencia proyecto
            </label>
            <SearchableSelect
              options={referenciaMaca}
              placeholder="Seleccionar referencia"
              onChange={setSelectedReferencia}
              defaultValue={selectedReferencia}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="text-left">
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Valor ({formatCurrency(valor)})
            </label>
            <input
              id="titlvalore"
              type="number"
              value={valor}
              onChange={(e) => setValor(+e.target.value)}
              className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
          </div>
          <div className="w-full">
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Observación
            </label>
            <input
              id="obsevacion"
              type="text"
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
          </div>
        </div>
        <div className="flex justify-start">
          <button
            onClick={handleAddProject}
            disabled={!selectedTipo || !selectedMarca || !selectedReferencia}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Agregar marca
          </button>
        </div>

        {/* Tabla de proyectos */}
        {projects.length > 0 && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Tipo
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Marca
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Referencia
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Valor
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Observación
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {project.tipo}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {project.marca}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {project.referencia}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {project.valor}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {project.description}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <Trash2 
                        onClick={() => handleRemoveProject(project.id)}
                        className="cursor-pointer text-red-500 hover:text-red-700"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Botón de crear proyecto */}
      <div className="flex justify-end mt-8">
        <button
          onClick={onCreateSubmit}
          className="btn btn-success btn-update-event flex justify-center rounded-lg bg-brand-500 px-6 py-3 text-sm font-medium text-white hover:bg-brand-600"
        >
          Crear Proyecto
        </button>
      </div>
    </div>
  </div>
</div>
    <CreateClientModal 
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
    />
    </div>
  );
}
