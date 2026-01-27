import { AccountCircle, Logout, Settings, Tune } from "@mui/icons-material"
import { Box, Tooltip, Typography, IconButton, Avatar, Menu, MenuItem, ListItemIcon, Divider } from "@mui/material"
import { useState, type MouseEvent } from "react"
import { useColor } from "../../../useContext/colorMode/ColorContext";

export default function Account() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
      const {colors, changeColor } = useColor();
    const open = Boolean(anchorEl);
    const username: string = "Jane Doe";

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

    return (
        <>
        <Box 
        className="flex items-center cursor-pointer"
        onClick={handleClick}
        >
          <div className="text-text-color!">
            <Typography
              variant="body1" 
              className="mr-0.5 hidden text-text-color! sm:block"
            >
              {username}
            </Typography>
          </div>

          <Tooltip title="Account settings">
            <IconButton
              size="small"
              className="p-0"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar alt={username}>
                {username[0]}
              </Avatar>
            </IconButton>
          </Tooltip>
      </Box>
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
            backgroundColor: colors.primary[500],
          }
        }}
      >
        <MenuItem onClick={handleClose} sx={{color: colors.letters}} >
          <ListItemIcon>
            <AccountCircle sx={{color: colors.letters}} fontSize="small" />
          </ListItemIcon>
          Account
        </MenuItem>
        <Divider className="bg-primary-600 dark:bg-primary-400" />
        <MenuItem onClick={handleClose} sx={{color: colors.letters}}>
          <ListItemIcon>
            <Settings sx={{color: colors.letters}} fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() =>{
          handleClose();
          changeColor();
        }}
        sx={{color: colors.letters}}
        >
          <ListItemIcon>
            <Tune sx={{color: colors.letters}} fontSize="small" />
          </ListItemIcon>
          Preferences
        </MenuItem>
        <Divider className="bg-primary-600 dark:bg-primary-400"/>
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
