import { ListItemButton } from "@mui/material";
import { useCallback, useState } from "react";
import { Edit, Description, Palette, ArrowForward} from '@mui/icons-material';
import { useNavigate } from "react-router";
import useFileMutations from "../../../hook/useFileMutations";
import { AlertError } from "../../../helpers/AlertError";
import AlertSuccess from "../../../helpers/AlertSuccess";
import { useColorStore } from "../../../store/useColorStore";
import AppDialog from "../../../components/AppDialog";
import {Plus} from 'lucide-react';

export default function AddFileDialog() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const [isValidation, setIsValidation] = useState<boolean>(false);
  const { createFile } = useFileMutations();
  const navigate = useNavigate();
  const { colors } = useColorStore();

  

  const handleFileNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
    if(isValidation) {
      setIsValidation(false);
    }
  }, [fileName, isValidation]);

  const handleCreateFile = async (path: string) => {
    if(fileName.trim().length <= 1) {
      setFileName("");
      setIsValidation(true);
      return;
    }
    try {
        const newFile = await createFile({fileType: path, fileName: fileName.trim()});
        setFileName("");
        setIsValidation(false);
        handleCloseDialog();
        navigate(`/view/${path.toLowerCase()}/${newFile.id}`);
        AlertSuccess("File created successfully!", colors.mode);
    } catch (error) {
      console.error("Error creating file:", error);
      handleCloseDialog();
      AlertError("Error creating file. Please try again.", colors.mode);
    }
  };

  const handleOpenDialog = useCallback(() => {
      setOpenDialog(true);
    }, []);
  
    const handleCloseDialog = useCallback(() => {
      setOpenDialog(false);
    }, []);

  return (
    <>
      <button
        onClick={handleOpenDialog}
        className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300
          text-text-color dark:bg-slate-800 dark:hover:bg-slate-600
          font-semibold text-sm transition-colors
          sm:px-4 sm:h-9 sm:rounded-lg sm:w-max

          max-sm:fixed max-sm:bottom-20 max-sm:right-5 max-sm:z-40
          max-sm:w-14 max-sm:h-14 max-sm:rounded-full max-sm:shadow-lg
          max-sm:bg-blue-600 max-sm:hover:bg-blue-700 max-sm:text-white
          dark:max-sm:bg-blue-600 dark:max-sm:hover:bg-blue-700
          "
      >
        <Plus className="text-lg max-sm:m-auto" />
        <p className="max-sm:hidden">New Document</p>
      </button>

      <AppDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title="Create New Document">

          {/* File Name Input */}
          <div className="mb-6">
            <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800 focus-within:ring-2 focus-within:ring-primary">
              <span className="material-symbols-outlined px-3 text-slate-400!"><Edit /></span>
              <input
                type="text"
                value={fileName}
                placeholder="Enter file name..."
                onChange={handleFileNameChange}
                className="px-0 py-3 w-full outline-none bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm"
              />
            </div>
            {isValidation && (
              <span className="text-red-500 dark:text-red-400 text-xs mt-2 block">
                File name must be at least 2 characters long
              </span>
            )}
          </div>

          {/* File Type Options */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-text-color dark:text-slate-400 uppercase tracking-wider mb-4">
              Select document type
            </p>

            {/* Text Document Option */}
            <ListItemButton
              onClick={() => handleCreateFile("Text")}
              className="px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3 w-full">
                <div className="w-10 h-10 rounded bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                  <span className="material-symbols-outlined"><Description /></span>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-text-color">Text Document</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Create a new document</p>
                </div>
                <span className="material-symbols-outlined text-slate-400"><ArrowForward /></span>
              </div>
            </ListItemButton>

            {/* Drawing Option */}
            <ListItemButton
              onClick={() => handleCreateFile("Draw")}
              className="px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3 w-full">
                <div className="w-10 h-10 rounded bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                  <span className="material-symbols-outlined"><Palette /></span>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-text-color">Drawing</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 ">Create a new drawing</p>
                </div>
                <span className="material-symbols-outlined text-slate-400"><ArrowForward /></span>
              </div>
            </ListItemButton>
          </div>
      </AppDialog>

      {/* <AddFileDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
      /> */}
    </>
  );
}