import { Dialog, DialogTitle, IconButton, List, ListItem, ListItemButton, ListItemText, Slide, type Transitions } from "@mui/material";
import { forwardRef, useState, type ReactElement, type Ref } from "react";
import DescriptionIcon from '@mui/icons-material/Description';
import PaletteIcon from '@mui/icons-material/Palette';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router";
import useFileMutations from "../../../hook/useFileMutations";
import { AlertError } from "../../../helpers/AlertError";
import AlertSuccess from "../../../helpers/AlertSuccess";
import { useColorStore } from "../../../store/useColorStore";

type AddFileProps = {
    openDialog: boolean;
    handleCloseDialog: () => void;
}

const Transition = forwardRef(function Transition(
  props: Transitions & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddFileDialog({openDialog: open, handleCloseDialog}: AddFileProps) {
  const [fileName, setFileName] = useState<string>("");
  const [isValidation, setIsValidation] = useState<boolean>(false);
  const { createFile } = useFileMutations();
  const navigate = useNavigate();
  const { colors } = useColorStore();

  const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
    if(isValidation) {
      setIsValidation(false);
    }
  };

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
        navigate(`/${path.toLowerCase()}/${newFile.id}`);
        AlertSuccess("File created successfully!", colors.mode);
    } catch (error) {
      console.error("Error creating file:", error);
      handleCloseDialog();
      AlertError("Error creating file. Please try again.", colors.mode);
    }
  };

  return (
    <Dialog
      open={open}
      slots={{ transition: Transition }}
      keepMounted
      onClose={handleCloseDialog}
      maxWidth="sm"
      fullWidth
      sx={{
        ['& .MuiDialog-paper']:{
          backgroundColor: colors.mode === 'dark' ? colors.primary[800] : colors.primary[100],
          color: colors.letters,
        },
        ['& .text-text-color']: {
          color: colors.letters,
        },
      }}
    >
      <div className="relative p-6 rotate-lg">
        {/* Close Button */}
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          className="absolute! right-3 top-3 text-slate-400!"
          size="small"
        >
          <CloseIcon />
        </IconButton>

        {/* Title */}
        <DialogTitle className="p-0 text-2xl text-text-color font-bold">
          Create New Document
        </DialogTitle>

        {/* File Name Input */}
        <div className="mb-6">
          <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800 focus-within:ring-2 focus-within:ring-primary">
            <span className="material-symbols-outlined px-3 text-slate-400!">< EditIcon/></span>
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
                <span className="material-symbols-outlined"><DescriptionIcon /></span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-text-color">Text Document</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Create a new document</p>
              </div>
              <span className="material-symbols-outlined text-slate-400"><ArrowForwardIcon /></span>
            </div>
          </ListItemButton>

          {/* Drawing Option */}
          <ListItemButton
            onClick={() => handleCreateFile("Draw")}
            className="px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="w-10 h-10 rounded bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                <span className="material-symbols-outlined"><PaletteIcon /></span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-text-color">Drawing</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 ">Create a new drawing</p>
              </div>
              <span className="material-symbols-outlined text-slate-400"><ArrowForwardIcon /></span>
            </div>
          </ListItemButton>
        </div>
      </div>
    </Dialog>
  );
}
