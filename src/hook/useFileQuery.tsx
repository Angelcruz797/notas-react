import { useState } from "react";
import { fetchFilesAsync, findFileByIdAsync } from "../utils/fetchFiles";
import { AlertError } from "../helpers/AlertError";
import { useUserStore } from "../store/useUserStore";
import { useColorStore } from "../store/useColorStore";

export default function useFileQuery() {
    const { setFiles } = useUserStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { colors } = useColorStore();
    
    const getFiles=async()=>{
        try {
            setIsLoading(true);
            const files = await fetchFilesAsync();
            await setFiles!(files);
            setIsLoading(false);
        } catch (error) {
            AlertError("Error fetching files. Please try again.",colors.mode);
            setIsLoading(false);
        }
    }

    const getFileById=async(id:string)=>{
        try {    
            setIsLoading(true);
            const currentFile= await findFileByIdAsync(id);
            setIsLoading(false);
            return currentFile;
        } catch (error) {
            AlertError("Error fetching file. Please try again.",colors.mode);
            setIsLoading(false);
        }
    }
    return {
        isLoading,
        getFiles,
        getFileById,
    }    
}
