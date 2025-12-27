import { useContext } from "react"
import { MiniPlayerContext } from "../../context/Mini-player-context"

export default function TrackTrends({onClick, nameTrack, artist, listeners, img, opo}) {
    
    return (
        <div onClick={onClick} className="w-full flex justify-between items-center cursor-pointer hover:bg-(--card-bg) p-4 rounded-2xl">
        <div className="flex items-center gap-2">
            <img className="w-12 h-12" src={img} alt="обложка трека" />
            <div className=" lin">
                <p className="text-xl">{nameTrack}</p>
                <p className="text-[14px]">{artist}</p>
            </div>
        </div>
            <p>{listeners}</p>
        </div>
    )
}