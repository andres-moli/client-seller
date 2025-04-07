import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useState } from "react";
import { 
  Info, 
  MessageSquare, 
  FileText, 
  File, 
  Trash2Icon,
  Eye,
  PersonStandingIcon,
  LucidePhoneOutgoing,
  PhoneIcon,
  MailIcon,
  MapPinPlusIcon,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { OrderTypes, ProyectComment, useClientContactsQuery, useClientQuery, useCotizacionesQuery, useCreateProyectCommentMutation, useProyectCommentsQuery, useProyectosQuery, useVisitsQuery } from "../../domain/graphql";
import TextArea from "../../components/form/input/TextArea";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { apolloClient } from "../../main.config";
import { formatCurrency, ToastyErrorGraph } from "../../lib/utils";
import FileInput from "../../components/form/input/FileInput";
import handleUploadImage from "../../lib/uptloadFile";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import dayjs from "dayjs";
import { Pagination } from "../../components/ui/table/pagination";
import ViewCliente from "./viewClient";
/**
 * Convierte bytes a la unidad más apropiada (KB, MB o GB)
 * @param bytes - El número de bytes a convertir
 * @param decimals - Número de decimales a mostrar (opcional, default 2)
 * @returns String formateado con la unidad adecuada (ej. "1.45 GB")
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  if (isNaN(bytes)) return 'Tamaño inválido';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
export default function IndexClientView() {
  const { id } = useParams<{ id: string }>();
  if(!id) {
    return 
  }
  const {data, loading} = useClientQuery({
    variables: {
      clientId: id
    }
  })
  const [activeTab, setActiveTab] = useState("informacion");

  const tabs = [
    {
      id: "informacion",
      label: "Información",
      icon: <Info size={18} />,
      //@ts-ignore
      content: <ViewCliente client={data?.client || undefined} key={data?.client.id}/>
    },
    {
      id: "contacto",
      label: "Contacto",
      icon: <LucidePhoneOutgoing size={18} />,
      content: <ContactClient id={id} key={id} />
    },
    {
      id: "proyecto",
      label: "Proyectos",
      icon: <MessageSquare size={18} />,
      content: <Proyectos key={id} id={id}/>
    },
    {
      id: "cotizaciones",
      label: "Cotizaciones",
      icon: <FileText size={18} />,
      content: <CotizacionesTab nitClient={data?.client.numberDocument} loading={loading}/>
    },
    {
      id: "visitas",
      label: "Visitas",
      icon: <MapPinPlusIcon size={18} />,
      content: <Visitas key={id} id={id}/>
    }
  ];

  return (
    <div>
      <PageMeta
        title="Cliente"
        description="Vista detallada del cliente"
      />
      <PageBreadcrumb pageTitle="Detalle de cliente" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* Navegación por pestañas */}
          <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium ${
                    activeTab === tab.id
                      ? "border-brand-500 text-brand-600 dark:border-brand-800 dark:text-brand-500"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contenido de las pestañas */}
          <div>
            {tabs.find(tab => tab.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>
  );
}

function Proyectos({id}: {id: string}) {
  const navigate  = useNavigate()
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
        clientFinal: {
          _eq: id
        },
        _or: [
          {
            clientIntegrador: {
              _eq: id
            }
          }
        ]
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
    <div>
      <h3 className="mb-4 text-lg font-medium text-gray-800 dark:text-white">
        Proyecto del cliente
      </h3>
      <div className="space-y-4">
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
  );
}
function Visitas({id}: {id: string}) {
  const navigate  = useNavigate()
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Resetear a la primera página cuando cambia el tamaño
  };
  const {data, loading} = useVisitsQuery({
    variables: {
      where: {
        client: {
          _eq: id
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
    <div>
      <h3 className="mb-4 text-lg font-medium text-gray-800 dark:text-white">
        Visitas del cliente
      </h3>
      <div className="space-y-4">
      <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
                <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                Trabajador
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
                Estado
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                  Descripción
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                  Proyecto
                </TableCell>
                {/* <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                  Accion
                </TableCell> */}
            </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data?.visits.map((visit) => (
              <TableRow key={visit.id}>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {visit.user.fullName}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {dayjs(visit.dateVisit).format('YYYY-MM-DD HH:mm:ss')}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {visit.status}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {visit.description}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="relative inline-block group">
                    {visit.isProyect ? 'SI' : 'NO'}
                    {visit.isProyect && visit.proyecto?.name && (
                      <span className="
                        absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2
                        px-2 py-1 text-xs text-white bg-gray-800 rounded
                        opacity-0 group-hover:opacity-100 transition-opacity
                        whitespace-nowrap z-10
                      ">
                        {visit.proyecto?.name}
                        <span className="
                          absolute top-full left-1/2 -translate-x-1/2
                          border-4 border-transparent border-t-gray-800
                        "></span>
                      </span>
                    )}
                  </div>
                </TableCell>
                {/* <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Eye 
                    className="cursor-pointer"
                    onClick={() => navigate(`/view-proyect/${proyect.id}`)}
                  />
                </TableCell> */}
              </TableRow>
            ))}
            </TableBody>
        </Table>
        <Pagination
          totalItems={data?.visitsCount.totalItems || 0}
          itemsPerPage={data?.visitsCount.itemsPerPage || 0}
          totalPages={Math.ceil((data?.visitsCount.totalItems || 0) / (data?.visitsCount?.itemsPerPage || 0))}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          className="mt-6"
        />
      </div>
    </div>
  );
}
function CotizacionesTab({nitClient, loading}: { nitClient: string | undefined, loading: boolean}) {
  const navigate  = useNavigate()
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Resetear a la primera página cuando cambia el tamaño
  };
  if(!nitClient) return
  const {data, loading: loadingCotizacion} = useCotizacionesQuery({
    variables: {
      where: {
        nitCliente: {
          _eq: nitClient
        }
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
  if(loading || loadingCotizacion){
    return <>Cargando...</>
  }
  return (
    <div>
      <h3 className="mb-4 text-lg font-medium text-gray-800 dark:text-white">
        Cotizaciones
      </h3>
      <div className="overflow-x-auto">
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
  );
}

function DocumentosTab({comments, id}: {comments: ProyectComment[], loading: boolean, id: string}) {
  const files = comments.filter(comment => comment.file)
  const [file, setFile] = useState<React.ChangeEvent<HTMLInputElement>>();
  const [createTask] = useCreateProyectCommentMutation()
  const [inputKey, setInputKey] = useState(Date.now()); // Forzar reinicio
  const onDeleteFile = () => {
    setFile(undefined)
    setInputKey(Date.now()); // Cambia la key para reiniciar el input
    toast.success('Archivo eliminado con exitó')
  }
  const handleCreateTask = async () => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Deseas crear este Archivo al proyecto?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, crear",
        cancelButtonText: "Cancelar",
      });

      if (result.dismiss) {
        return;
      }

      if (result.isConfirmed) {
        if(file){
          if(file?.target?.files?.[0]){
            const dataFile = await handleUploadImage(file?.target?.files?.[0])
            const res = await createTask({
              variables: {
                createInput: {
                  fileId: dataFile?.id,
                  proyectId: id
                },
              },
            });
    
            if (res.errors) {
              toast.error("Hubo un error: " + res.errors[0]);
              return;
            }
    
            apolloClient.cache.evict({ fieldName: "proyectComments" });
            toast.success("Archivo de proyecto Creado con éxito");
          }else {
            toast.error('No se selecionaste un archivo para subir')
            return
          }
        }

      }
    } catch (err) {
      ToastyErrorGraph(err as any);
    }
  };
  return (
    <div>
      <h3 className="mb-4 text-lg font-medium text-gray-800 dark:text-white">
        Documentos del Proyecto ({files.length})
      </h3>
      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Subir archivo
        </label>
        {file && (
          <Trash2Icon className="mb-1.5 block cursor-pointer" onClick={onDeleteFile} />
        )}
        <FileInput
            key={inputKey.toString()} // Cambia la key para forzar el reinicio
            onChange={(e) => setFile(e)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        />
      </div>
      <br />
      <button
        onClick={handleCreateTask}
        className="w-full sm:w-auto rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
      >
        {"Subir archivo"}
      </button>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {
          files.map(file => {
            return (
              <DocumentCard 
                date={file.createdAt}
                title={file.file?.fileName || ''}
                type={file.file?.fileExtension || ''}
                size={formatFileSize(file.file?.chunkSize || 0)}
                url={file.file?.url || ''}
              />
            )
          })
        }
      </div>
    </div>
  );
}
function ContactClient({ id }: { id: string }) {
  const { data, loading } = useClientContactsQuery({
    variables: {
      where: {
        client: {
          _eq: id
        }
      },
      pagination: {
        skip: 0,
        take: 999999
      }
    }
  });

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (!data?.clientContacts?.length) {
    return (
      <div className="rounded-lg border border-gray-200 p-6 text-center dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400">No hay contactos registrados</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.clientContacts.map((client) => (
        <div 
          key={client.id} 
          className="flex items-start gap-4 rounded-lg border border-gray-200 p-4 transition-all hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/50"
        >
          {/* Avatar/Icono */}
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
            <PersonStandingIcon size={20} className="text-gray-600 dark:text-gray-400" />
          </div>

          {/* Información del contacto */}
          <div className="flex-1 space-y-1.5">
            {/* Nombre y posición */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-gray-800 dark:text-white">
                {client.name}
              </h3>
              {client.position && (
                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {client.position}
                </span>
              )}
            </div>

            {/* Teléfono */}
            {client.celular && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <PhoneIcon className="h-4 w-4" />
                <a 
                  href={`tel:${client.celular}`}
                  className="hover:text-blue-600 hover:underline dark:hover:text-blue-400"
                >
                  {client.celular}
                </a>
              </div>
            )}

            {/* Email */}
            {client.email && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MailIcon className="h-4 w-4" />
                <a 
                  href={`mailto:${client.email}`}
                  className="hover:text-blue-600 hover:underline dark:hover:text-blue-400"
                >
                  {client.email}
                </a>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
function DocumentCard({ title, type, size, date, url }: { title: string; type: string; size: string; date: string; url: string }) {
  return (
    <div className="flex items-center rounded-lg border border-gray-200 p-4 dark:border-gray-700">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700 text-sm"
      >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
        <File size={20} className="text-gray-600 dark:text-gray-400" />
      </div>
      <div className="ml-4 flex-1">
        <div className="flex items-center justify-between">
          <p className="font-medium text-gray-800 dark:text-white">{title}</p>
          <span className="text-xs text-gray-500 dark:text-gray-400">{type}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <p className="text-gray-500 dark:text-gray-400">{size}</p>
          <p className="text-gray-500 dark:text-gray-400">{date.split('T')[0]}</p>
        </div>
      </div>
      </a>
    </div>
  );
}