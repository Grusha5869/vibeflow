import { useContext, useEffect } from "react"
import { MiniPlayerContext } from "../context/Mini-player-context"
export default function MiniPlayer() {
    const {specificTrack} = useContext(MiniPlayerContext);
    
    return (
        
        <div className="w-[350px] h-25 bg-(--card-bg) fixed bottom-0 right-0 rounded-t-xl">
            {specificTrack?.artist?.name || 'неизвестно'}
        </div>
    )
}