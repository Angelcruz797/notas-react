import { Dialog, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { forwardRef, useState, type ReactElement, type Ref } from "react";
import { useColor } from "../../../useContext/colorMode/ColorContext";
import type { TransitionProps } from "@mui/material/transitions";
import Slide from '@mui/material/Slide';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router";
import useFileMutations from "../../../hook/useFileMutations";
import { AlertError } from "../../../helpers/AlertError";
import AlertSuccess from "../../../helpers/AlertSuccess";

type AddFileProps = {
    openDialog: boolean;
    handleCloseDialog: () => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddFileDialog({openDialog: open, handleCloseDialog}: AddFileProps) {
  const {colors} = useColor();
  const [fileName, setFileName] = useState<string>("");
  const [isValidation, setIsValidation] = useState<boolean>(false);
  const { createFile } = useFileMutations();
  const navigate=useNavigate();


  const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
    if(isValidation) {
      setIsValidation(false);
    }
  };

  const handleCreateFile =async (path:string) => {
    if(fileName.trim().length<=1) {
      setFileName("");
      setIsValidation(true);
      return;
    }
    try {
        setFileName("");
        const newFile = await createFile({fileType:path, fileName:fileName.trim()});
        navigate(`/${path.toLowerCase()}/${newFile.id}`);
        AlertSuccess("File created successfully!",colors.mode);
    } catch (error) {
      console.error("Error creating file:", error);
      handleCloseDialog();
      AlertError("Error creating file. Please try again.",colors.mode);
    }
  }
  return (
    <>
        <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
        sx={{
            ['& .MuiDialog-paper']:{
                backgroundColor: colors.primary[500],
            }
        }}
        >
            <DialogTitle className=" mr-10!" 
            sx={{color:colors.letters}}
            >Whitch type of File do you want to create?</DialogTitle>
            <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            className="absolute! right-2 top-2"
            sx={{color:colors.letters}}
            >
            <CloseIcon />
            </IconButton>
            <List className="px-7!">
                <div className="flex items-center text-sm bg-primary-600 h-12 border pl-2 rounded border-gray-500/30 w-full max-w-md
                mb-2">
                  <input className="px-2 w-full h-full outline-none text-text-color bg-transparent"
                  name="file-name" 
                  type="text"
                  value={fileName}
                  placeholder="Enter file name"
                  onChange={handleFileNameChange} />
                </div>
                {isValidation && <span className="text-red-500 dark:text-red-400 text-xs my-3">File name must be at least 2 characters long</span>}

                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemAvatar>
                        <DescriptionIcon sx={{color:colors.letters}} />
                    </ListItemAvatar>
                    <ListItemText 
                    sx={{color:colors.letters}}
                    primary='Document' />
                    </ListItemButton>
                </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>handleCreateFile('Draw')}>
                    <ListItemAvatar>
                        <ColorLensIcon sx={{color:colors.letters}} />
                    </ListItemAvatar>
                    <ListItemText
                    sx={{color:colors.letters}}
                    primary='Draw' />
                    </ListItemButton>
                  </ListItem>
            </List>
      </Dialog>
    </>
  )
}
