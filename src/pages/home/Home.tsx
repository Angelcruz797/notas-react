import { Outlet } from 'react-router';
import Topbar from '../topbar/Topbar';
import { useState } from 'react';

export default function Home() {
  const [open, setOpen] = useState(false);
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
        <Topbar open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
        <div className={`${open ? 'ml-60!' : ''} duration-50 scroll-auto`}>
            <Outlet />
        </div>
    </>
    )
}
