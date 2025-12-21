import { useEffect, useState, useContext } from "react"
import API_KEYS from "../../config-api"
import Button from "../reused-components/Button"
import { useTag } from "../../hooks/useTag"
import TrackTrends from "./Track-trends"
import { useInfoTrack } from "../../hooks/useInfoTrack"
import defImg from "../../assets/icons/defSearchImg.svg"
import { MiniPlayerContext } from "../../context/Mini-player-context"
import {useGetLocalStorage} from "../../hooks/useGetLocalStorage"

export default function Chillout() {
    //"chillout"
    /* useEffect(() => {
        const fetchFun = async () => {
            try {
                const res = await fetch(`${API_KEYS.API_URL}?method=tag.getTopTags&api_key=${API_KEYS.API_KEY}&format=json`);
                const data = await res.json();
                console.log(data);
                
            } catch (error) {
                console.error(error);
                
            }
        }
        fetchFun()
    }, []) */
    const [LSValue, setLSValue] = useState(() => {
        const stored = localStorage.getItem('chillTag');
        return stored ? JSON.parse(stored) : []
    })
    const {result: tagResult, loading, error} = useTag("chillout", 13, LSValue)
    const {result: trackInfoTag, isLoading, isError} = useInfoTrack(tagResult, true, 'chillTag')
    const {setOpenMiniPlayer, setSpecificTrack} = useContext(MiniPlayerContext);
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
            handleClick(trackInfoTag[0])
        }

    return (
        <article className="text-white">
            <header className="text-4xl mb-10">☁️Музыка для отдыха</header>
            <p className="mb-4">{`${trackInfoTag.length} треков`}</p>
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
                {trackInfoTag.map(elem => 
                    <TrackTrends
                        key={elem.identif}
                        onClick={() => handleClick(elem)}
                        nameTrack={elem?.name || 'неизвестно'}
                        artist={elem?.artist?.name || 'неизвестно'}
                        listeners={elem?.listeners || 'неизвестно'}
                        img={elem?.bestImage?.['#text'] || defImg}
                    />
                )}
            </ul>
        </article>
    )
}