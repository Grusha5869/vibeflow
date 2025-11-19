import { useEffect, useState } from "react";
import SearchTracks from "./SearchTracks"

export default function ModalSearch({tracks, infoTracks, isLoading, isError}) {
    const [point, setPoint] = useState('загрузка')

    useEffect(() => {
        if (isLoading || !infoTracks.result && infoTracks.isLoading) {
            const interval = setInterval(() => {
                return setPoint(prevItems => prevItems.length >= 11 ? prevItems = 'загрузка' : prevItems + '.')
            }, 400)
            return () => clearInterval(interval)
        }   
    }, [isLoading, infoTracks.result, infoTracks.isLoading])

    if (isLoading || !infoTracks.result && infoTracks.isLoading) {
        return (
            <div className="w-full top-12 p-2.5 absolute bg-(--card-bg) rounded-[7px] text-white">
                {point}
            </div>
        )
    }
    if (!tracks || tracks.length === 0 || isError || infoTracks.error) {
        return (
            <div className="w-full top-12 p-2.5 absolute bg-(--card-bg) rounded-[7px] text-white">
                Ошибка, треки не найдены
            </div>
        )
    }

    const tracksArr = infoTracks ? infoTracks.result : null;

    return (
        <div className="w-full top-12 p-2.5 absolute bg-(--card-bg) rounded-[7px]">
            <ul>
                {tracksArr ? 
                    tracksArr.map(elem => 
                        <SearchTracks
                            key={elem.identif}
                            identif={elem.identif}
                            elem={elem}
                        />
                    ) : (
                       <div className="w-full top-12 p-2.5 absolute bg-(--card-bg) rounded-[7px]">
                            Ошибка, треки не найдены
                        </div>  
                    )
                }
            </ul>
        </div>
    )
}