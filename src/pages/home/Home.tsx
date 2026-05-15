import { Outlet, useLocation, useParams } from 'react-router';
import Topbar from '../files/components/Topbar';
import { useEffect, useState, useMemo } from 'react';
import useFileQuery from '../../hook/useFileQuery';

export default function Home() {
  const [titleBar, setTitleBar] = useState<string>("");
  const location = useLocation();
  const { id } = useParams();
  const { getFileById } = useFileQuery();

  // Check if current route is the landing page
  const isLandingPage = useMemo(() => location.pathname === '/', [location.pathname]);

  useEffect(() => {
    const getTitle = async () => {
      switch (location.pathname) {
        case '/':
          setTitleBar('Home');
          break;
        case `/draw/${id}`:
        case `/text/${id}`:
          const fileById = await getFileById(id!);
          if (fileById) {
            setTitleBar(fileById.fileName);
          } else {
            setTitleBar('File');
          }
          break;
        default:
          setTitleBar('Unknown Page');
          break;
      }
    };
    getTitle();
  }, [location.pathname]);

  // Landing page has its own layout, don't show the global Topbar for it
  if (isLandingPage) {
    return <Outlet />;
  }

  return (
    <>
      <Topbar 
        title={titleBar}
      />
      <div className="duration-50 scroll-auto">
        <Outlet />
      </div>
    </>
  );
}
