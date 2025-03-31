import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import TaskTable from "./tableTask";

export default function TaskPage() {
  return (
    <div>
      <PageMeta
        title="Tareas"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Gestiona tus tareas" />
      <TaskTable />
    </div>
  );
}
