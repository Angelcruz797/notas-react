import { useUser } from "../../../useContext/user/userContext";
import { useCallback, useMemo } from "react";
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupIcon from '@mui/icons-material/Group';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Divider } from "@mui/material";

interface SidebarProps {
  onFileSelect?: () => void;
}

const STORAGE_TOTAL = 5.0; // GB
const STORAGE_USED = 3.2; // GB

const navigationItems = [
  { label: 'My Documents', icon: <DescriptionIcon/>, to: '/' },
  { label: 'Shared with me', icon: <GroupIcon/>, to: '/' },
  { label: 'Starred', icon: <StarIcon/>, to: '/' },
  { label: 'Trash', icon: <DeleteIcon/>, to: '/' },
];

export default function Sidebar({ onFileSelect }: SidebarProps) {
  const { user } = useUser();

  const storagePercentage = useMemo(
    () => (STORAGE_USED / STORAGE_TOTAL) * 100,
    []
  );

  const handleFileClick = useCallback(() => {
    onFileSelect?.();
  }, [onFileSelect]);

  return (
    <aside className="w-56 shrink-0 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center gap-2 p-4 border-b border-slate-200 dark:border-slate-800">
        <div className="w-7 h-7 bg-primary rounded flex items-center justify-center text-white">
          <span className="material-symbols-outlined text-lg"><InsertDriveFileIcon /></span>
        </div>
        <h1 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
          NoteCraft
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
        <Divider className="my-2 border-slate-200 dark:border-slate-800" />
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
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
    </aside>
  );
}
