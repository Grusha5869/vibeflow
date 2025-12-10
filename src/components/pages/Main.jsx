import { useContext } from "react"
import RecentTrack from "../main-components/Recent-track"
import { useGetLocalStorage } from "../../hooks/useGetLocalStorage"
import defImg from "../../assets/icons/defSearchImg.svg"
import { MiniPlayerContext } from "../../context/Mini-player-context"

export default function Main() {
    const trackStorage = useGetLocalStorage()
    const { setOpenMiniPlayer, setSpecificTrack } = useContext(MiniPlayerContext)

    function handleRecentTrackClick(track) {
        setOpenMiniPlayer(true)
        console.log('из handleClick', track);
        
        setSpecificTrack(track)
        
    }
    return (
        <main className="text-(--text-primary) p-5">
            {trackStorage.length !== 0 && (
                <>
                    <p className="text-xl">Недавнее</p>
                    
                    <ul className="flex mt-4 gap-3 flex-wrap">
                        {trackStorage.map(track => 
                            <RecentTrack 
                                key={track.identif}
                                artist={track.artist}
                                nameTrack={track.nameTrack}
                                imgTrack={defImg}
                                onClick={() => handleRecentTrackClick(track)}
                            />
                        )}
                    </ul>
                </>
            )}
        </main>
    )
}