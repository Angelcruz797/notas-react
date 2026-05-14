import { useCallback, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useColor } from "../../../useContext/colorMode/ColorContext";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

interface TopBarProps {
  onSearch: (query: string) => void;
  onAddFile: () => void;
  username?: string;
}

export default function TopBar({ onSearch, onAddFile, username = "User" }: TopBarProps) {
  const [searchValue, setSearchValue] = useState("");
  const {colors, changeColor} = useColor();

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchValue(query);
      onSearch(query);
    },
    [onSearch]
  );

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-16 px-6 flex items-center justify-between gap-3 shadow-sm">
      {/* Search Bar */}
      <div className="flex-1 max-w-sm relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Search your documents..."
          value={searchValue}
          onChange={handleSearchChange}
          className="w-full h-9 pl-10 pr-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50
           dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 
           focus:ring-primary focus:border-transparent text-sm"
        />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Preferences theme Button */}
      <button 
        onClick={changeColor}
        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100
       dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400">
        <span className="material-symbols-outlined">
            {colors.mode == 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </span>
      </button>

      {/* Create Button */}
      <button
        onClick={onAddFile}
        className="flex items-center gap-2 px-4 h-9 bg-slate-200 hover:bg-slate-300 text-text-color dark:bg-slate-800 dark:hover:bg-slate-600 rounded-lg font-semibold text-sm transition-colors"
      >
        <span className="material-symbols-outlined text-lg"><AddIcon /></span>
        Create New Document
      </button>
    </header>
  );
}
