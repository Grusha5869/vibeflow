import { useContext, useState } from "react"
import RecentTrack from "../main-components/Recent-track"
import { useGetLocalStorage } from "../../hooks/useGetLocalStorage"
import { MiniPlayerContext } from "../../context/Mini-player-context"
import CompilationList from "../main-components/Compilation-list"

export default function Main() {
    const trackStorage = useGetLocalStorage()
    const { setOpenMiniPlayer, setSpecificTrack } = useContext(MiniPlayerContext) 

    function handleRecentTrackClick(track) {
        setOpenMiniPlayer(true)
        setSpecificTrack(track)
    }
    
    return (
        <main className="text-(--text-primary)">
            {trackStorage.length !== 0 && (
                <div className="mb-10">
                    <p className="text-xl">Недавнее</p>
                    
                    <ul className="flex mt-4 gap-3 flex-wrap">
                        {trackStorage.map(track => 
                            <RecentTrack 
                                key={track.identif}
                                artist={track.artist}
                                nameTrack={track.nameTrack}
                                imgTrack={track.img}
                                onClick={() => handleRecentTrackClick(track)}
                            />
                        )}
                    </ul>
                </div>
            )}
            {/* 
                Популярное за неделю в россии
                ЛУчшие треки по жанру будет после блоков
                
            */}
            
            <p className="text-2xl">Подборка</p>
            <CompilationList />
        </main>
    )
}