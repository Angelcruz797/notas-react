import AddIcon from '@mui/icons-material/Add';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DescriptionIcon from '@mui/icons-material/Description';
import { useState } from 'react';
import AddFileDialog from './AddFileDialog';
import { NavLink } from 'react-router';

export default function Landing() {
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const handleClickOpenDialog = () => {
    setOpenDialog(true);
    };
    const handleCloseDialog = () => {
    setOpenDialog((prev)=>!prev);
    console.log('cerrado '+openDialog);
    };

    const username:string = 'Jone Doe';
    const files = [
    {
        name: 'Documento 1',
        id: 1,
        type:'draw',
    },
    {
        name: 'Documento 2',
        id: 2,
        type:'document',
    }]
    
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
                {files.map((data) => (
                <div key={data.id} className="flex flex-col items-center gap-2">
                    <NavLink to={`/${data.type}/${data.id}`}>
                        <div className="w-36 h-50 bg-white flex items-center justify-center cursor-pointer">
                            {data.type==='draw' ? 
                            <ColorLensIcon className="text-black text-5xl!" /> :
                            <DescriptionIcon className="text-black text-5xl!" />}
                        </div>
                    </NavLink>

                    <span className="text-text-color">{data.name}</span>
                </div>
                ))}
            </div>
        </div>
    </>
  )
}
