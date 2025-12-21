import Button from "../reused-components/Button"
import { useTrackSimilar } from "../../hooks/useTrackSimilar"
import { useEffect, useContext, useState } from "react"
import { useInfoTrack } from "../../hooks/useInfoTrack"
import TrackTrends from "./Track-trends"
import defImg from "../../assets/icons/defSearchImg.svg"
import { MiniPlayerContext } from "../../context/Mini-player-context"
import { useGetLocalStorage } from "../../hooks/useGetLocalStorage"

export default function TrendsSimilar() {

    const [getLS, setGetLS] = useState(() => {
        const stored = localStorage.getItem('trackRecent');
        return stored ? JSON.parse(stored) : []
    })
    const {resultMemo: trackSimilar} = useTrackSimilar(getLS, 2)
    const {result: infoTrack, isLoading, isError} = useInfoTrack(trackSimilar, true)
    const {setOpenMiniPlayer, setSpecificTrack} = useContext(MiniPlayerContext);
    const trackStorage = useGetLocalStorage()

    useEffect(() => {
        
        console.log('simen', trackSimilar);
        
        console.log('info', infoTrack);
        
    }, [infoTrack])

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
        handleClick(infoTrack[0])
    }

    return (
        <article className="text-white">
            <header className="text-4xl mb-10">Похожие на последний трек</header>
            <p className="mb-4">{`0 треков`}</p>
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
                {infoTrack.map(elem => 
                    <TrackTrends 
                        key={elem.identif}
                        onClick={() => handleClick(elem)}
                        nameTrack={elem?.name || 'неизветсно'}
                        artist={elem?.artist?.name || 'неизветсно'}
                        listeners={elem?.listeners || 'неизвестно'}
                        img={elem?.bestImage?.['#text'] || defImg}
                    />
                )}
            </ul>
        </article>
    )
}