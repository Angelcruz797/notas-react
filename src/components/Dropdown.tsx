import { Menu, MenuItem, ListItemIcon, Divider } from "@mui/material"
import { useState, cloneElement, type MouseEvent, type ReactElement } from "react"
import { useColorStore } from "../store/useColorStore"
import type { PopoverOrigin } from "@mui/material"

export type DropdownItem = {
  icon?: ReactElement<any>;
  label: string;
  onClick?: () => void;
  dividerAfter?: boolean;
}

type DropdownProps = {
  trigger: ReactElement<any>;
  items: DropdownItem[];
  id?: string;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
}

export default function Dropdown({
  trigger,
  items,
  id = "dropdown-menu",
  anchorOrigin = { horizontal: "right", vertical: "top" },
  transformOrigin = { horizontal: "right", vertical: "bottom" },
}: DropdownProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { colors } = useColorStore()
  const open = Boolean(anchorEl)

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const triggerWithHandler = cloneElement(trigger, {
    onClick: handleOpen,
    style: { cursor: "pointer" },
  })

  return (
    <>
      {triggerWithHandler}
      <Menu
        anchorEl={anchorEl}
        id={id}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        sx={{
          ["& .MuiMenu-list"]: {
            backgroundColor:
              colors.mode === "dark"
                ? colors.primary[800]
                : colors.primary[100],
          },
        }}
      >
        {items.map((item, index) => (
          <span key={index}>
            <MenuItem
              onClick={item.onClick}
              sx={{ color: colors.letters }}
            >
              {item.icon && (
                <ListItemIcon>
                  {cloneElement(item.icon, {
                    fontSize: "small",
                    sx: { color: colors.letters },
                  })}
                </ListItemIcon>
              )}
              {item.label}
            </MenuItem>
            {item.dividerAfter && <Divider className="bg-slate-600" />}
          </span>
        ))}
      </Menu>
    </>
  )
}
