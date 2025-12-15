import Button from "../reused-components/Button"
import { usePopularTrack } from "../../hooks/usePopularTrack"
import { useEffect, useContext } from "react"
import { MiniPlayerContext } from "../../context/Mini-player-context"
import TrackTrends from "./Track-trends"

export default function Trends() {
    const popularTrack = usePopularTrack("United States");
    const {setOpenMiniPlayer, setSpecificTrack} = useContext(MiniPlayerContext);
    useEffect(() => {
        console.log(popularTrack);
        
    }, [popularTrack])
    function handleClick(track) {
        setOpenMiniPlayer(true)
        setSpecificTrack(track)
    }
    function btnHandleCLick() {
        handleClick(popularTrack[0])
    }
    return (
        <article className="text-white">
            <header className="text-4xl mb-10">Лучшее за последнюю неделю</header>
            <p className="mb-4">{`${popularTrack.length - 1} треков`}</p>
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
                {popularTrack
                .filter(elem => typeof elem !== 'number')
                .map(elem => 
                    <TrackTrends
                        key={elem.identif}
                        nameTrack={elem?.nameTrack || 'неизвестно'}
                        artist={elem?.artist || 'неизвестно'}
                        listeners={elem?.listeners || 'неизвестно'}
                        onClick={() => handleClick(elem)}
                    />    
                )}
            </ul>
        </article>
    )
}