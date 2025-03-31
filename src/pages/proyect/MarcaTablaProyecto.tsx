import { useState } from "react";
import SearchableSelect from "../../components/form/selectSeach";

interface ProjectItem {
  id: string;
  tipo: string;
  marca: string;
  referencia: string;
}

const ProjectSelectorTable = () => {
  // Datos de ejemplo para los selects
  const tipoOptions = [
    { value: "tipo1", label: "Tipo de Proyecto 1" },
    { value: "tipo2", label: "Tipo de Proyecto 2" },
    { value: "tipo3", label: "Tipo de Proyecto 3" },
  ];

  const marcaOptions = [
    { value: "marca1", label: "Marca 1" },
    { value: "marca2", label: "Marca 2" },
    { value: "marca3", label: "Marca 3" },
  ];

  const referenciaOptions = [
    { value: "ref1", label: "Referencia 1" },
    { value: "ref2", label: "Referencia 2" },
    { value: "ref3", label: "Referencia 3" },
  ];

  // Estado para los valores seleccionados
  const [selectedTipo, setSelectedTipo] = useState("");
  const [selectedMarca, setSelectedMarca] = useState("");
  const [selectedReferencia, setSelectedReferencia] = useState("");
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  // Función para agregar un nuevo proyecto a la tabla
  const handleAddProject = () => {
    if (selectedTipo && selectedMarca && selectedReferencia) {
      const newProject: ProjectItem = {
        id: Date.now().toString(),
        tipo: tipoOptions.find(opt => opt.value === selectedTipo)?.label || selectedTipo,
        marca: marcaOptions.find(opt => opt.value === selectedMarca)?.label || selectedMarca,
        referencia: referenciaOptions.find(opt => opt.value === selectedReferencia)?.label || selectedReferencia,
      };

      setProjects([...projects, newProject]);
      
      // Limpiar los selects después de agregar
      setSelectedTipo("");
      setSelectedMarca("");
      setSelectedReferencia("");
    }
  };

  // Función para eliminar un proyecto de la tabla
  const handleRemoveProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Selectores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tipo proyecto *
          </label>
          <SearchableSelect
            options={tipoOptions}
            placeholder="Seleccionar tipo"
            onChange={setSelectedTipo}
            defaultValue={selectedTipo}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Marca proyecto *
          </label>
          <SearchableSelect
            options={marcaOptions}
            placeholder="Seleccionar marca"
            onChange={setSelectedMarca}
            defaultValue={selectedMarca}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Referencia proyecto *
          </label>
          <SearchableSelect
            options={referenciaOptions}
            placeholder="Seleccionar referencia"
            onChange={setSelectedReferencia}
            defaultValue={selectedReferencia}
          />
        </div>
      </div>

      {/* Botón para agregar */}
      <div className="flex justify-end">
        <button
          onClick={handleAddProject}
          disabled={!selectedTipo || !selectedMarca || !selectedReferencia}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Agregar a la tabla
        </button>
      </div>

      {/* Tabla de proyectos */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-white/[0.05]">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Marca
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Referencia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-white/[0.05]">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {project.tipo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {project.marca}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {project.referencia}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <button
                        onClick={() => handleRemoveProject(project.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No hay proyectos agregados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectSelectorTable;