import { useParams } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { DetailCotizacionView } from "./DetailCotizacion";

export default function ViewCotizacionPage() {
  const { id } = useParams<{ id: string }>();
  if(!id){
    return (
      <>ID NOUT FOUND</>
    )
  }
  return (
    <div>
      <PageMeta
        title="Cotizacion detalle"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Cotizacion detalle" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <DetailCotizacionView id={id} key={id} />
      </div>
    </div>
  );
}
