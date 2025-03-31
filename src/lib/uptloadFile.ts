import axios from "axios";
import { FileInfo } from "../domain/graphql";
import { toast } from "sonner";

// const compressImage = async (uri: string) => {
//   const result = await ImageManipulator.manipulateAsync(
//     uri,
//     [{ resize: { width: 800 } }], // Redimensionar a 800px de ancho
//     { compress: 0.3, format: ImageManipulator.SaveFormat.JPEG } // Comprimir al 70%
//   );
//   return result.uri;
// };
// Función para subir el archivo
const handleUploadImage = async (file: File) => {
  const toatId = toast.loading('Subiendo archivo...')
  try {
    const url = `${import.meta.env.VITE_APP_GRAPH}attachment/files`;
    const formData = new FormData();
    formData.append('file',file);
    console.log(formData)

    const response = await axios.post<FileInfo>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Transfer-Encoding': 'chunked',
      },
      timeout: 60000, // Aumentar el tiempo de espera si es necesario
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / (progressEvent?.total || 0));
        // setProgress(percent);
      },
    });
    return response?.data;
  } catch (error) {
    console.log('Error subiendo imagen:', error);
  }finally {
    toast.dismiss(toatId)
  }
};


export default handleUploadImage;
