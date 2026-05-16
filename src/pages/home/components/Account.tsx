import { AccountCircle, Logout, Settings } from "@mui/icons-material"
import {Menu, MenuItem, ListItemIcon, Divider } from "@mui/material"
import { useState, type MouseEvent } from "react"
import { useColor } from "../../../useContext/colorMode/ColorContext";

type AccountProps = {
    user: {
        username: string;
        email: string;
    } | null;
}

export default function Account({user}: AccountProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
      const {colors } = useColor();
    const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

    return (<>
      <div 
      className="p-4 border-t border-slate-200 dark:border-slate-800 cursor-pointer"
      onClick={handleClick}
      >
        <div className="flex items-center gap-2">
          <div 
          className="w-8 h-8 rounded-full text-white 
          flex items-center justify-center text-sm font-bold"
          >
            {(user?.username || "U").charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
              {user?.username || "User"}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {user?.email || "user@doccraft.ai"}
            </div>
          </div>
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          ['& .MuiMenu-list']:{
            backgroundColor: colors.mode === 'dark' ? colors.primary[800] : colors.primary[100],
          }
        }}
      >
        <MenuItem onClick={handleClose} sx={{color: colors.letters}} >
          <ListItemIcon>
            <AccountCircle sx={{color: colors.letters}} fontSize="small" />
          </ListItemIcon>
          Account
        </MenuItem>
        <Divider className="bg-slate-600" />
        <MenuItem onClick={handleClose} sx={{color: colors.letters}}>
          <ListItemIcon>
            <Settings sx={{color: colors.letters}} fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider className="bg-slate-600" />
        <MenuItem onClick={handleClose} sx={{color: colors.letters}}>
          <ListItemIcon>
            <Logout
            sx={{color: colors.letters}} 
            fontSize="small" 
            />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      </>
    )
}
