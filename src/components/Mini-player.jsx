import { useContext, useEffect, useMemo, useState } from "react"
import { MiniPlayerContext } from "../context/Mini-player-context"
import defImg from '../assets/icons/defSearchImg.svg'
import MiniPlayerBtn from "./reused-components/Mini-player-btn"
import prevTrackImg from '../assets/mini-player-icons/right-arrow.svg'
import playTrackImg from '../assets/mini-player-icons/play.svg'
import stopTrackImg from '../assets/mini-player-icons/stop.svg'
import mockTrack from '../assets/mock-files/track.mp3'
import PlusIcon from "../assets/icons/Plus-icon"

export default function MiniPlayer() {
    const {specificTrack, setSpecificTrack, setOpenMiniPlayer} = useContext(MiniPlayerContext);
    const [playing, setPlaying] = useState(false);

    const audio = useMemo(() => new Audio(mockTrack), [])
    useEffect(() => {
        if (playing) {
            audio.play();
        }

        return () => {
            audio.pause();
        }
    }, [playing, audio])

    function handlePlusClick() {
        setOpenMiniPlayer(false)
        setSpecificTrack(null)
    }
    
    return (
        
        <div className="w-[370px] h-30 bg-(--card-bg) fixed bottom-0 right-0 rounded-t-xl flex justify-between items-center p-3.5">
            <div className="text-white flex items-center gap-2">
                <img className="w-15 h-15" src={specificTrack?.bestImage?.['#text'] || specificTrack?.img || defImg} alt="обложка трека" />
                <div className="s">
                    <p className="text-[16px] max-w-[150px]">{specificTrack?.name || specificTrack?.nameTrack || 'неизвестно'}</p>
                    <p className="text-[12px] text-gray-400 max-w-[150px]">{specificTrack?.artist?.name || specificTrack?.artist || 'неизвестно'}</p>
                </div>
            </div>

            <div className="flex gap-3.5">
                <MiniPlayerBtn
                    img={prevTrackImg}
                    styles='mirror invert-100 size-[25px] cursor-pointer'
                />
                <MiniPlayerBtn
                    onClick={() => setPlaying(!playing)}
                    img={playing ? stopTrackImg : playTrackImg}
                    styles='mirror invert-90 size-[25px] cursor-pointer'
                />
                <MiniPlayerBtn
                    img={prevTrackImg}
                    styles='invert-100 size-[25px] cursor-pointer'
                />
                
            </div>

            <PlusIcon
                css={'rotate-45'}
                onClick={handlePlusClick}
            />
        </div>

    )
}