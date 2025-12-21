import Button from "../reused-components/Button"
import { usePopularTrack } from "../../hooks/usePopularTrack"
import { useEffect, useContext } from "react"
import { MiniPlayerContext } from "../../context/Mini-player-context"
import TrackTrends from "./Track-trends"
import { useInfoTrack } from "../../hooks/useInfoTrack"
import defImg from "../../assets/icons/defSearchImg.svg"
import {useGetLocalStorage} from "../../hooks/useGetLocalStorage"

export default function Trends() {
    const popularTrack = usePopularTrack("United States");
    const {setOpenMiniPlayer, setSpecificTrack} = useContext(MiniPlayerContext);
    const {result: infoPopularTrack, isLoading, isError} = useInfoTrack(popularTrack, true, 'popularTrackInfoArr')
    const trackStorage = useGetLocalStorage();
    function handleClick(elem) {
        setOpenMiniPlayer(true)
        setSpecificTrack(elem)

        const trackObj = {
            artist: elem?.artist?.name || 'неизвестно',
            nameTrack: elem?.name || 'неизвестно',
            img: elem?.bestImage?.['#text'] || defImg,
            identif: new Date().getTime() + Math.random()
        }
        
        const newTrackStorage = [trackObj, ...trackStorage];

        localStorage.setItem('trackRecent', JSON.stringify(newTrackStorage));

    }
    function btnHandleCLick() {
        handleClick(infoPopularTrack[0])
    }
    
    if (!infoPopularTrack && isLoading) {
        return (
            <p className="text-white">загрузка</p>
        )
    }

    if (isError) {
        return <p className="text-white">Ошибка</p>
    }

    return (
        <article className="text-white">
            <header className="text-4xl mb-10">🎯Лучшее за последнюю неделю</header>
            <p className="mb-4">{`${infoPopularTrack.length} треков`}</p>
            <Button
                text={'Слушать'}
                css='mb-10'
                onClick={btnHandleCLick}
            />
            
            <div className="tablee">
                <div className="w-full flex justify-between mb-4">
                    <p>Трек</p>
                    <p>Прослушиваний</p>
                </div>
            </div>
            <ul>
                {infoPopularTrack
                    .map(elem => 
                        <TrackTrends
                            key={elem.identif}
                            nameTrack={elem?.name || 'неизвестно'}
                            artist={elem?.artist?.name || 'неизвестно'}
                            listeners={elem?.listeners || 'неизвестно'}
                            img={elem?.bestImage?.['#text'] || defImg}
                            onClick={() => handleClick(elem)}
                        />    
                    )}
            </ul>
        </article>
    )
}