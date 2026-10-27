import { useUserStore } from "../../../store/useUserStore";
import { useCallback } from "react";
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupIcon from '@mui/icons-material/Group';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Divider } from "@mui/material";
import Account from "./Account";

interface SidebarProps {
  onFileSelect?: () => void;
}

const navigationItems = [
  { label: 'My Documents', icon: <DescriptionIcon/>, to: '/' },
  { label: 'Shared with me', icon: <GroupIcon/>, to: '/' },
  { label: 'Starred', icon: <StarIcon/>, to: '/' },
  { label: 'Trash', icon: <DeleteIcon/>, to: '/' },
];

export default function Sidebar({ onFileSelect }: SidebarProps) {
  const { user } = useUserStore();


  const handleFileClick = useCallback(() => {
    onFileSelect?.();
  }, [onFileSelect]);

  return (
    <aside className="w-56 shrink-0 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center gap-2 p-4 h-16 border-b border-slate-200 dark:border-slate-800">
        <div className="w-7 h-7 bg-primary rounded flex items-center justify-center text-text-color">
          <span className="material-symbols-outlined text-sm"><InsertDriveFileIcon /></span>
        </div>
        <h1 className="text-base font-bold text-text-color dark:text-white tracking-tight">
          AngxSpace
        </h1>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navigationItems.map((item) => (
          <div
            key={item.label}
            onClick={handleFileClick}
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
        <Account user={user} />
    </aside>
  );
}
