import { Outlet, useLocation, useParams } from 'react-router';
import Topbar from '../topbar/Topbar';
import { useEffect, useState } from 'react';
import useFileQuery from '../../hook/useFileQuery';

export default function Home() {
  const [open, setOpen] = useState(false);
  const [titleBar, setTitleBar] = useState<string>("");
  const location =useLocation();
  const {id} =useParams();
  const {getFileById} = useFileQuery();
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
useEffect(()=>{
  const getTitle = async () => {
    switch (location.pathname) {
      case '/':
        setTitleBar('Home');
        break;
      case `/draw/${id}`:
      case `/text/${id}`:
        const fileById = await getFileById(id!);
        setTitleBar(fileById ? fileById.fileName : 'File');
        break;
      default:
        setTitleBar('Unknown Page');
        break;
    }
  };
    getTitle();
  }, [location.pathname, id]);

  return (
    <>
        <Topbar open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} title={titleBar}/>
        <div className={`${open ? 'ml-60!' : ''} duration-50 scroll-auto`}>
            <Outlet />
        </div>
    </>
    )
}
