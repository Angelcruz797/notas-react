import { useState } from "react";
import { addFileAsync, fetchFilesAsync } from "../utils/fetchFiles";
import { useUser } from "../useContext/user/userContext";

export default function useFileMutations() {
    const { setFiles } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  // Crear archivo
  const createFile = async (file: { fileType: string; fileName: string }) => {
    setIsLoading(true);
    const newFile = await addFileAsync(file);
    const files = await fetchFilesAsync();
    setFiles!(files);
    setIsLoading(false);
    return newFile;
  };

//   // Actualizar archivo
//   const updateFile = async (fileId: string, updates: { fileName?: string; fileType?: string }) => {
//     setIsLoading(true);
//     const updatedFile = await updateFileAsync(fileId, updates);
//     const files = await fetchFilesAsync();
//     setFiles!(files);
//     setIsLoading(false);
//     return updatedFile;
//   };

//   // Borrar archivo
//   const deleteFile = async (fileId: string) => {
//     setIsLoading(true);
//     await deleteFileAsync(fileId);
//     const files = await fetchFilesAsync();
//     setFiles!(files);
//     setIsLoading(false);
//   };

  return {
    createFile,
    isLoading,
  };
}
