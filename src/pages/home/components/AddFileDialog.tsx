import { Dialog, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { forwardRef, type ReactElement, type Ref } from "react";
import { useColor } from "../../../useContext/colorMode/ColorContext";
import type { TransitionProps } from "@mui/material/transitions";
import Slide from '@mui/material/Slide';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink, redirect } from "react-router";

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
            <DialogTitle className="mr-10!" 
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
            <List className="pt-0">
                <ListItem disablePadding>
                    <ListItemButton onClick={() =>
                      redirect('/draw')
                    }>
                    <ListItemAvatar>
                        <DescriptionIcon sx={{color:colors.letters}} />
                    </ListItemAvatar>
                    <ListItemText 
                    sx={{color:colors.letters}}
                    primary='Document' />
                    </ListItemButton>
                </ListItem>
                <NavLink to={'/draw/1'}>
                  <ListItem disablePadding>
                      <ListItemButton>
                      <ListItemAvatar>
                          <ColorLensIcon sx={{color:colors.letters}} />
                      </ListItemAvatar>
                      <ListItemText
                      sx={{color:colors.letters}}
                      primary='Draw' />
                      </ListItemButton>
                  </ListItem>
                </NavLink>
            </List>
      </Dialog>
    </>
  )
}
