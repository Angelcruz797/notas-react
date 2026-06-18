import { useState } from "react";
import { addFileAsync, fetchFilesAsync } from "../utils/fetchFiles";
import { AlertError } from "../helpers/AlertError";
import { useUserStore } from "../store/useUserStore";
import { useColorStore } from "../store/useColorStore";

export default function useFileMutations() {
  const { setFiles } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const { colors } = useColorStore();

  // Crear archivo
  const createFile = async (file: { fileType: string; fileName: string }) => {
    try {
    setIsLoading(true);
    const newFile = await addFileAsync(file);
    const files = await fetchFilesAsync();
    setFiles!(files);
    return newFile;
    } catch (error){
      AlertError("Error creating files. Please try again.",colors.mode);
      throw error;
    }finally {
      setIsLoading(false);
    }
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
