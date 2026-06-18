import { Outlet, useLocation, useParams } from 'react-router';
import { useEffect, useState, useMemo, useCallback } from 'react';
import useFileQuery from '../../hook/useFileQuery';
import TopBar from '../../components/TopBar';
import {LightMode, DarkMode, Search, Add} from '@mui/icons-material';
import { useUserStore } from '../../store/useUserStore';
import { useColorStore } from '../../store/useColorStore';
import AddFileDialog from './components/AddFileDialog';
import Sidebar from './components/Sidebar';


const SearchFile = ()=>{
    const [searchValue, setSearchValue] = useState("");
    const {setSearchQuery} = useUserStore();

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchValue(query);
      setSearchQuery(query);
    },
    [setSearchQuery]
  );

  return (
    <div className="relative w-full max-w-sm">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 flex items-center">
        <Search />
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
  )
}


export default function Home() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const location = useLocation();
  const {colors, changeColor} = useColorStore();

  const handleOpenDialog = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  // Check if current route is the landing page
  const isLandingPage = useMemo(() => location.pathname === '/', [location.pathname]);

  // Landing page has its own layout, don't show the global Topbar for it
  if (isLandingPage) {
    return (
      <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar />
  
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
      
          <TopBar 
            left={<SearchFile />}
            right={
              <>
                <button
                  onClick={changeColor}
                  className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100
                dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400">
                  {colors.mode === 'light' ? <DarkMode /> : <LightMode />}
                </button>
                <button
                  onClick={handleOpenDialog}
                  className="flex items-center gap-2 px-4 h-9 bg-slate-200 hover:bg-slate-300
                  text-text-color dark:bg-slate-800 dark:hover:bg-slate-600 rounded-lg
                    font-semibold text-sm transition-colors"
                >
                  <Add className="text-lg" />
                  Create New Document
                </button>
              </>
            }
          />
          <Outlet />
          
          <AddFileDialog
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
          />
        </div>
      </div>
    );
  }
}
