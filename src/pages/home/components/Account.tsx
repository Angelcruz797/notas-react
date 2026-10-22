import { AccountCircle, Logout, Settings } from "@mui/icons-material"
import Dropdown, { type DropdownItem } from "../../../components/Dropdown";
import { useUserStore } from "../../../store/useUserStore";
import { useNavigate } from "react-router";

export default function Account(){
  const {user, logout} = useUserStore();
  const navigate = useNavigate();

  const singOut = () => {
    logout();
    navigate("/auth/login");
  }

  const menuItems: DropdownItem[] = [
    { icon: <AccountCircle />, label: "Account", dividerAfter: true},
    { icon: <Settings />, label: "Settings", dividerAfter: true },
    { icon: <Logout />, label: "Logout", onClick: () => singOut() },
  ]

  return (
    <Dropdown
      id="account-menu"
      trigger={
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold">
              {(user?.username || "U").charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                {user?.username || "User"}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {user?.email || "user@notecraft.com"}
              </div>
            </div>
          </div>
        </div>
      }
      items={menuItems}
    />
  )
}
