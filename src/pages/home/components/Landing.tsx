import AddIcon from '@mui/icons-material/Add';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DescriptionIcon from '@mui/icons-material/Description';
import { useEffect, useState } from 'react';
import AddFileDialog from './AddFileDialog';
import { NavLink, useLocation } from 'react-router';
import { useUser } from '../../../useContext/user/userContext';
import { Skeleton } from '@mui/material';
import useFileQuery from '../../../hook/useFileQuery';

export default function Landing() {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const {user} = useUser();
    const location = useLocation();

    const { getFiles, isLoading} = useFileQuery();

    useEffect(() => {
        getFiles();
    },[])

    const handleClickOpenDialog = () => {
    setOpenDialog(true);
    };
    const handleCloseDialog = () => {
    setOpenDialog((prev)=>!prev);
    };

    const username:string = user?.username || 'Unknown';
    
  return (
    <>
        <AddFileDialog openDialog={openDialog} handleCloseDialog={handleCloseDialog} />
        <div className="px-10 pt-14">
            <h1 className="text-4xl text-text-color mb-6"> Bienvenido {username}</h1>

            <div
            className='grid sm:grid-cols-auto grid-cols-2 items-center gap-6'
            >
                <div className="flex flex-col items-center gap-2">
                    <div 
                    className="w-36 h-50 bg-white hover:bg-gray-200 active:bg-gray-300 flex items-center justify-center cursor-pointer"
                    onClick={handleClickOpenDialog}
                    >
                        <AddIcon 
                        className="text-black text-5xl!" 
                        />
                    </div>
                    <span className="text-text-color">Nuevo Documento</span>
                </div>
                {isLoading && new Array(4).fill(null).map((_,index)=>
                <div key={index} className="flex flex-col items-center gap-2">
                    <Skeleton variant="rectangular" animation='wave' className='w-36 h-50!'/>
                    <Skeleton variant="rounded" animation='wave' className='w-36 h-6'/>            
                </div>)}
                {!isLoading && user.files.map((data) => (
                <div key={data.id} className="flex flex-col items-center gap-2">
                    <NavLink to={`/${data.fileType.toLowerCase()}/${data.id}`}>
                        <div className="w-36 h-50 bg-white flex items-center justify-center cursor-pointer">
                            {data.fileType==='Draw' ? 
                            <ColorLensIcon className="text-black text-5xl!" /> :
                            <DescriptionIcon className="text-black text-5xl!" />}
                        </div>
                    </NavLink>

                    <span className="text-text-color">{data.fileName}</span>
                </div>
                ))}
            </div>
        </div>
    </>
  )
}
