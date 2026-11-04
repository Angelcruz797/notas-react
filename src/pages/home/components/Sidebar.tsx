import { useCallback } from "react";
import { Divider } from "@mui/material";
import Account from "./Account";
import { useNavigate } from "react-router";
import { type ButtonsNavType } from '../../../types/ButtonsNavType'
import ResponsiveDrawer from "../../../components/ResponsiveDrawer";
import { FilePenLine } from "lucide-react";


interface SidebarProps {
  navItems: ButtonsNavType[];
  mobileSidebarOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ navItems,mobileSidebarOpen,onClose }: SidebarProps) {
  const navigate = useNavigate();


  const handleFileClick = useCallback((to: string) => {
    navigate(to);
  }, [navigate]);

  return (
    <ResponsiveDrawer mobileSidebarOpen={mobileSidebarOpen} onClose={onClose}>
      {/* Logo Section */}
      <div className="flex items-center gap-2 p-4 h-16 border-b border-slate-200 dark:border-slate-800">
        <div className="w-7 h-7 rounded flex items-center justify-center bg-transparent">
          <span className="material-symbols-outlined text-sm"><FilePenLine className="text-text-color" /></span>
        </div>
        <h1 className="text-base font-bold text-text-color dark:text-white tracking-tight">
          AngxSpace
        </h1>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => (
          <div
            key={item.label}
            onClick={() => handleFileClick(item.to)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors
            hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900
            dark:hover:text-white hover:font-medium"
          >
            <span className="material-symbols-outlined text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
        <Divider className=" border-slate-200 dark:border-slate-800" />
      </nav>

      {/* User Profile Section */}
      <Account />
    </ResponsiveDrawer>
  );
}
