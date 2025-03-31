import { FC } from "react";
import { toast } from "sonner";

interface FileInputProps {
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean; // Permitir múltiples archivos
  accept?: string; // Tipos de archivo permitidos (ej: "image/*, .pdf")
  maxSize?: number; // Tamaño máximo del archivo en bytes
  label?: string; // Etiqueta personalizada
  key?: string
}

const FileInput: FC<FileInputProps> = ({
  className,
  onChange,
  multiple = false,
  accept,
  maxSize,
  label,
  key
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      // Validar el tamaño máximo del archivo
      if (maxSize) {
        for (let i = 0; i < files.length; i++) {
          if (files[i].size > maxSize) {
            toast.error(`El archivo ${files[i].name} excede el tamaño máximo permitido.`);
            event.target.value = ""; // Limpiar el input
            return;
          }
        }
      }

      // Llamar a la función onChange si está definida
      if (onChange) {
        onChange(event);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
          {label}
        </label>
      )}
      <input
        type="file"
        className={`focus:border-ring-brand-300 h-11 w-full overflow-hidden rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 shadow-theme-xs transition-colors file:mr-5 file:border-collapse file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-gray-50 file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-gray-700 placeholder:text-gray-400 hover:file:bg-gray-100 focus:outline-hidden focus:file:ring-brand-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:text-white/90 dark:file:border-gray-800 dark:file:bg-white/[0.03] dark:file:text-gray-400 dark:placeholder:text-gray-400 ${className}`}
        onChange={handleFileChange}
        multiple={multiple}
        accept={accept}
        key={key}
      />
    </div>
  );
};

export default FileInput;