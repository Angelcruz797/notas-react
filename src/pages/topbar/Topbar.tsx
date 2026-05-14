import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import Account from "./components/Account";
import SideBarFile from "./components/SideBarFile";

type TopbarProps = {
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  title:  string | Promise<string>;
}

export default function Topbar({open, handleDrawerOpen, handleDrawerClose,title}:TopbarProps) {  
  return (
    <>
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
            {title}
          </Typography>
          <Account />
        </Toolbar>
      </AppBar>
    </>
  )
}
