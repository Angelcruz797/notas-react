import { useState } from "react";
import { addFileAsync, fetchFilesAsync } from "../utils/fetchFiles";
import { useUser } from "../useContext/user/userContext";
import { AlertError } from "../helpers/AlertError";
import { useColor } from "../useContext/colorMode/ColorContext";

export default function useFileMutations() {
  const { setFiles } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const {colors} = useColor();

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
