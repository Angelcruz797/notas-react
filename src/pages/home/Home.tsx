import { Outlet, useLocation } from 'react-router';
import { useMemo, useState } from 'react';
import TopBar from '../../components/TopBar';
import { Moon, House , Sun, Star, UserGroup, Trash, Menu, FilePenLine } from 'lucide-react';
import { useColorStore } from '../../store/useColorStore';
import AddFileDialog from './components/AddFileDialog';
import Sidebar from './components/Sidebar';
import {BottomNav} from '../../components/BottomNav';
import type { ButtonsNavType } from '../../types/ButtonsNavType';
import { SearchToggle } from './components/SearchToggle';
import Account from './components/Account';


export default function Home() {
  const location = useLocation();
  const {colors, changeColor} = useColorStore();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);


  // Check if current route is the landing page
  const isLandingPage = useMemo(() => location.pathname === '/', [location.pathname]);


  const navItems: ButtonsNavType[] = [
    { label: 'Home', icon: <House/>, to: '/' },
    { label: 'Shared', icon: <UserGroup />, to: '/shared' },
    { label: 'Starred', icon: <Star/>, to: '/starred' },
    { label: 'Trash', icon: <Trash/>, to: '/trash' },
  ];


  // Landing page has its own layout, don't show the global Topbar for it
  if (isLandingPage) {
    return (
      <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar navItems={navItems} mobileSidebarOpen={mobileSidebarOpen} onClose={()=>setMobileSidebarOpen(false)} />
        <BottomNav buttonsNav={navItems} />
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
      
          <TopBar 
            left={
              <>
                <button
                  onClick={()=>setMobileSidebarOpen(true)}
                  className="lg:hidden max-sm:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100
                dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400">
                  <Menu />
                </button>

                <div className="sm:hidden flex items-center gap-2 h-16">
                  <div className="w-7 h-7 rounded flex items-center justify-center bg-transparent text-text-color">
                    <span className="text-sm"><FilePenLine /></span>
                  </div>
                  <h1 className="text-base font-bold text-text-color dark:text-white tracking-tight">
                    AngxSpace
                  </h1>
                </div>
              </>
            }
            center={
              <SearchToggle />
            }
            right={
              <>
                <button
                  onClick={changeColor}
                  className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100
                dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400">
                  {colors.mode === 'light' ? <Moon /> : <Sun />}
                </button>
                <div className='max-sm:hidden'>
                  <AddFileDialog />
                </div>
                <div className='sm:hidden'>
                  <Account />
                </div>
              </>
            }
          />
          <Outlet />
          
        </div>
      </div>
    );
  }
}
