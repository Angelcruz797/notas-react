import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Divider, IconButton, useTheme } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useColor } from "../../../useContext/colorMode/ColorContext";
import { NavLink, redirect } from "react-router";

type SideBarFileProps = {
    handleDrawerClose: () => void;
    open?: boolean;
}


export default function SideBarFile({handleDrawerClose,open}: SideBarFileProps) {
      const theme = useTheme();
      const {colors} = useColor()
  return (
    <>
        <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: 240, 
            boxSizing: 'border-box',
            backgroundColor: colors.primary[500],
           },
        }}
        open={open}
        variant="persistent"
        anchor="left"
        transitionDuration={0}
      >
        <div className="flex items-center justify-end h-16 px-4">
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon className="text-text-color" /> : <ChevronRightIcon className="text-text-color" />}
          </IconButton>
        </div>
        <Divider className="bg-primary-700 dark:bg-primary-400"/>
        <Box 
        className="duration-1000 overflow-auto"
        >
          <List>
            <NavLink to={'/'}>
              <ListItem disablePadding>
                <ListItemButton onClick={()=>redirect('/')}>
                  <ListItemIcon>
                    <DescriptionIcon className="text-text-color"/>
                  </ListItemIcon>
                  <ListItemText className="text-text-color" primary='home' />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <Divider className="bg-primary-700 dark:bg-primary-400"/>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DescriptionIcon className="text-text-color"/>
                  </ListItemIcon>
                  <ListItemText className="text-text-color" primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider className="bg-primary-700 dark:bg-primary-400"/>
          <List>
            {['All mail', 'Trash', 'Spam'].map((text) => (
              <ListItem  key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DescriptionIcon className="text-text-color" />
                  </ListItemIcon>
                  <ListItemText className="text-text-color" primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}
