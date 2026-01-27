import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import Account from "./components/Account";
import { useLocation } from "react-router";
import SideBarFile from "./components/SideBarFile";
import SaveDraw from "../draw/components/SaveDraw";

type TopbarProps = {
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
}

export default function Topbar({open, handleDrawerOpen, handleDrawerClose}:TopbarProps) {
  const location =useLocation();

  return (
    <>
    {/* {location.pathname === '/draw' && <SideBarFile handleDrawerClose={handleDrawerClose} open={open} />} */}
    {/* {location.pathname === '/' && <SideBarFile handleDrawerClose={handleDrawerClose} open={open} />} */}
      <SideBarFile handleDrawerClose={handleDrawerClose} open={open} />
      <AppBar position="static" className={`${open?'ml-60!':''}`}>
        <Toolbar 
          className={`bg-primary-500 border-primary-600 border max-w-full ${open ? 'w-[calc(100%-15rem)]' : ''}`}
          >
          {/* {location.pathname === '/draw' ? <SideBarFile handleDrawerClose={handleDrawerClose} /> : ( */}
          {!open &&<IconButton
            size="large"
            edge="start"
            aria-label="menu"
            className="mr-0.5 text-text-color!"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>}
          {/* )} */}

          <Typography variant="h6" className="grow text-text-color">
            Draw Name
          </Typography>
          <SaveDraw />
          <Account />
        </Toolbar>
      </AppBar>
    </>
  )
}
