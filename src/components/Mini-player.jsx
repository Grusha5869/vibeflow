import { useContext, useEffect, useMemo, useState } from "react"
import { MiniPlayerContext } from "../context/Mini-player-context"
import defImg from '../assets/icons/defSearchImg.svg'
import MiniPlayerBtn from "./reused-components/Mini-player-btn"
import prevTrackImg from '../assets/mini-player-icons/right-arrow.svg'
import playTrackImg from '../assets/mini-player-icons/play.svg'
import stopTrackImg from '../assets/mini-player-icons/stop.svg'
import mockTrack from '../assets/mock-files/track.mp3'

export default function MiniPlayer() {
    const {specificTrack} = useContext(MiniPlayerContext);
    const [playing, setPlaying] = useState(false);

    const audio = useMemo(() => new Audio(mockTrack), [])
    useEffect(() => {
        if (playing) {
            audio.play();
        }
        
        return () => {
            audio.pause();
            console.log('из useEffect');
            
        }
    }, [playing])
    
    return (
        
        <div className="w-[350px] h-25 bg-(--card-bg) fixed bottom-0 right-0 rounded-t-xl flex justify-between items-center p-3.5">
            <div className="text-white flex items-center gap-2">
                <img className="w-15 h-15" src={specificTrack?.bestImage?.['#text'] || defImg} alt="Нет обложки трека" />
                <div className="s">
                    <p className="text-[16px] max-w-[150px]">{specificTrack?.name || 'неизвестно'}</p>
                    <p className="text-[12px] text-gray-400 max-w-[150px]">{specificTrack?.artist?.name || 'неизвестно'}</p>
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
        </div>

    )
}