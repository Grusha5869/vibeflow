import { useEffect } from "react"
import SearchTrack from "../SearchTrack"

export default function RecentTrack({artist, nameTrack, imgTrack, onClick}) {
    useEffect(() => {
        console.log(imgTrack);
        console.log(nameTrack);
        
    }, [])
    return (
        <li onClick={onClick} className="min-w-65 bg-(--card-bg) p-3.5 rounded-2xl hover:bg-(--secondary-bg) cursor-pointer">
            <div className="flex gap-2 items-center">
                <img className="w-15 h-15" src={imgTrack} alt={`${nameTrack, artist}`} />
                <div className="">
                    <p className="text-xl">{nameTrack}</p>
                    <p className="text-[14px]">{artist}</p>
                </div>
            </div>
        </li>
    )
}