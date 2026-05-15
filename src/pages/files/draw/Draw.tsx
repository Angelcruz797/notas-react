import { useParams } from "react-router";
import { Tldraw } from "tldraw";
import 'tldraw/tldraw.css'
import Error404 from "../../error/Error404";
import useFileQuery from "../../../hook/useFileQuery";
import { useEffect, useState } from "react";

export default function Draw() {
  const {id} = useParams();
  const {getFileById,isLoading} = useFileQuery();
  const [currentFile, setCurrentFile] = useState<Object | null>(null);
  useEffect(()=>{
    if(!id) return;
    const fetchFile = async () => {
      const file = await getFileById(id!);
      setCurrentFile(file || null);
    }
    fetchFile();
  },[]);

  if(isLoading) return <div className="w-full h-screen flex items-center justify-center"><span className="text-2xl text-text-color">Loading...</span></div>;
  if(!isLoading && currentFile == null) return <Error404/>;

  return (
    <div className="w-full h-screen pb-16">
      	<Tldraw 
        persistenceKey={id} 
        options={{maxPages:1}}/>
    </div>
  )
}