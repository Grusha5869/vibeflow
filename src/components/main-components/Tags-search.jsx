import { useEffect, useRef, useState, useContext } from "react"
import Button from "../reused-components/Button"
import defImg from "../../assets/icons/defSearchImg.svg"
import Track from './Track'
import { useTag } from "../../hooks/useTag"
import { useInfoTrack } from "../../hooks/useInfoTrack"
import { useGetLocalStorage } from "../../hooks/useGetLocalStorage"
import { MiniPlayerContext } from "../../context/Mini-player-context"

export default function TagsSearch() {
    const [selectValue, setSelectValue] = useState(null)
    const [btnClickRequest, setBtnClickRequest] = useState(null)
    
    const [LSValue, setLSValue] = useState(() => {
        const stored = localStorage.getItem(`${btnClickRequest}Tag`);
        return stored ? JSON.parse(stored) : []
    })
    const {result: tagResult, loading, error} = useTag(btnClickRequest, 2, LSValue)
    const {result: trackInfoTag, isLoading, isError} = useInfoTrack(tagResult, true, `${btnClickRequest}Tag`)
    const {setOpenMiniPlayer, setSpecificTrack} = useContext(MiniPlayerContext);
    const trackStorage = useGetLocalStorage();

    useEffect(() => {
        console.log(btnClickRequest);
        
    }, [btnClickRequest])
    useEffect(() => {
        console.log(tagResult);
        console.log(trackInfoTag);
        
    }, [tagResult])
    useEffect(() => {
        console.log('lsValue', LSValue);
        
    }, [LSValue])


    function handleCLick() {
        /* console.log(selectValue); */
        if (!selectValue) alert('Выберите тег')

        setBtnClickRequest(selectValue)
        
    }
    function handleClickTrack(elem) {
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

    return (
        <div className="bg-(--card-bg) w-full flex min-h-40 gap-4 rounded-2xl p-5">
            <div className="w-60">
                <div className="mb-2">
                    <label htmlFor="tags" className="text-xl">Выберите тег:</label>
                    <select onChange={event => setSelectValue(event.target.value)} name="tags-select" className="text-xl w-25" id="tags">
                        <option value="pop" className="bg-(--card-bg)">Поп</option>
                        <option value="rock" className="bg-(--card-bg)">Рок</option>
                        <option value="metal" className="bg-(--card-bg)">Метал</option>
                        <option value="jazz" className="bg-(--card-bg)">Джаз</option>
                        <option value="indie" className="bg-(--card-bg)">Инди</option>
                        <option value="Hip-Hop" className="bg-(--card-bg)">Хип-хоп</option>
                        <option value="electronic" className="bg-(--card-bg)">Электроника</option>
                        <option value="punk" className="bg-(--card-bg)">Панк</option>
                        <option value="Classical" className="bg-(--card-bg)">Класика</option>
                    </select>
                </div>

                <Button
                    text={'Найти'}
                    css={'bg-(--secondary-bg) cursor-pointer hover:bg-[#171729]'}
                    onClick={handleCLick}
                />
            </div>
            <div className="line w-1 h-full min-h-40 bg-(--secondary-bg)"></div>
            <div className="">
                <ul>
                    {trackInfoTag.map(elem => 
                        <Track 
                            key={elem.identif}
                            nameTrack={elem?.name || 'неизвестно'}
                            artist={elem?.artist?.name || 'неизвестно'}
                            listeners={elem?.listeners || 'неизвестно'}
                            img={elem?.bestImage?.['#text'] || defImg}
                            onClick={() => handleClickTrack(elem)}
                        />
                    )}
                </ul>
            </div>
        </div>

        
    )
}