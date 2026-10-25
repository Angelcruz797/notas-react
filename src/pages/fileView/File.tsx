import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation, Outlet } from 'react-router';
import useFileQuery from '../../hook/useFileQuery';
import TopBar from '../../components/TopBar';
import { Typography } from '@mui/material';
import {GridView} from '@mui/icons-material';
import SaveButton from './draw/components/SaveButton';


export const File = () => {
    const [titleBar, setTitleBar] = useState('File');
    const location = useLocation();
    const { id } = useParams();
    const { getFileById } = useFileQuery();
    const navigate = useNavigate();

    useEffect(() => {
        const getTitle = async () => {
            const fileById = await getFileById(id!);
            if (fileById) {
                setTitleBar(fileById.fileName);
            } else {
                setTitleBar('File');
            }
        };
        getTitle();
      }, [location.pathname]);
  return (
    <>
        {/* top bar */}
        <TopBar 
            left={
                <div className="flex items-center gap-2 shrink-0">
                    <Typography
                        variant="body1"
                        className="text-gray-400 text-sm font-medium tracking-wider cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        <GridView className="text-gray-400 mr-1.5" fontSize="small" />
                        Document
                    </Typography>
                    <Typography className="dark:text-white/60 text-black/60 text-sm">/</Typography>
                    <Typography
                        variant="h6"
                        className="dark:text-white text-black text-sm font-semibold max-w-xs overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                        {titleBar}
                    </Typography>
                </div>
            }
            right={
                <div className="flex items-center gap-2 shrink-0">
                    {/* Save button or other actions can go here */}
                    {
                        location.pathname==`/view/draw/${id}`  &&<SaveButton />
                    }
                </div>
            }
        />

        {/* Render Content Area */}
        <div className="duration-50 scroll-auto">
            <Outlet />
        </div>
    </>
  )
}