import { useParams } from "react-router";
import { Tldraw } from "tldraw";
import 'tldraw/tldraw.css'
import Error404 from "../../error/Error404";
import useFileQuery from "../../../hook/useFileQuery";
import { useEffect } from "react";
import { useDrawStore } from "../../../store/useDrawStore";

export default function Draw() {
  const {id} = useParams();
  const {getFileById,isLoading} = useFileQuery();
  const setEditor =useDrawStore((s) => s.setEditor);
  const {currentFile, setCurrentFile, loadDraw, reset} =useDrawStore();
  
  useEffect(()=>{
    if(!id) return;
    const fetchFile = async () => {
      const file = await getFileById(id!);
      setCurrentFile(file || null);
    }
    fetchFile();
    reset()
  },[id,reset]);

  if(isLoading) return <div className="w-full h-screen flex items-center justify-center"><span className="text-2xl text-text-color">Loading...</span></div>;
  if(!isLoading && currentFile == null) return <Error404/>;
    
  return (
    <div className="w-full h-screen pb-16">
      <Tldraw
        onMount={(editor)=>{
          setEditor(editor)
          loadDraw()
        }}
        options={{maxPages:1}}/>
    </div>
  )
}