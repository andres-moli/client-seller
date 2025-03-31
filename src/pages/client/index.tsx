import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ClientTable from "./tableClient";

export default function ClientePage() {
  return (
    <div>
      <PageMeta
        title="Mis clientes"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Mis clientes" />
      <ClientTable />
    </div>
  );
}
