import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import CotizacionTable from "./tableCotizacion";

export default function CotizacionPage() {
  return (
    <div>
      <PageMeta
        title="Cotizaciones"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Gestiona tus cotizaciones" />
      <CotizacionTable />
    </div>
  );
}
