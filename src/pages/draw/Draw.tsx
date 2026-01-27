import { useParams } from "react-router";
import { Tldraw } from "tldraw";
import 'tldraw/tldraw.css'

export default function Draw() {
  const {id} = useParams();

  return (
    <div className="w-full h-screen pb-16">
      	<Tldraw 
        persistenceKey={id} 
        options={{maxPages:1}}/>
    </div>
  )
}