import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ProyectTable from "./tableProyect";

export default function ProyectPage() {
  return (
    <div>
      <PageMeta
        title="Proyectos"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Gestiona tus proyectos" />
      <ProyectTable />
    </div>
  );
}
