import { useState } from "react";
import { fetchFilesAsync, findFileByIdAsync } from "../utils/fetchFiles";
import { useUser, type File } from "../useContext/user/userContext";
import { AlertError } from "../helpers/AlertError";
import { useColor } from "../useContext/colorMode/ColorContext";

export default function useFileQuery() {
    const {setFiles} = useUser();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {colors} = useColor();
    
    const getFiles=async()=>{
        try {
            setIsLoading(true);
            const files:File[] = await fetchFilesAsync();
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
