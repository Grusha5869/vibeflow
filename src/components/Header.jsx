import { useEffect, useRef, useState } from "react"
import { useSearch } from '../hooks/useSearch'
import { useInfoTrack } from "../hooks/useInfoTrack"
import { config } from "../config"
import ModalSearch from "./ModalSearch"

export default function Header({ reference, setReference }) {
    const [value, setValue] = useState('');
    const [searchRequest, setSearchRequest] = useState(false);
    const [modalSearch, setModalSearch] = useState(false);
    const [infoTrackRequest, setInfoTrackRequest] = useState(false);
    const {tracks, isLoading, isError} = useSearch(value, searchRequest, 6, setInfoTrackRequest);
    const infoTracks = useInfoTrack(tracks, infoTrackRequest);
    
    
    function trigger() {
        if (value.trim() === '') {
            alert('Введите название трека')
            return
        }
        setSearchRequest(!searchRequest)
        setModalSearch(true)

    }

    function onKeyDown(event) {
        if (event.key === 'Enter') {
            trigger()
        }
    }
    function onClick() {
        trigger()
    }
    
    useEffect(() => {
        console.log(tracks, isLoading, isError);
        console.log(infoTracks);
    }, [tracks, infoTracks])
    

    return (
        <header className="w-full h-12 flex justify-between items-center mb-10">
            <div className="text-(--text-primary)">
                {/* потом поменяю */}
                    vibeflow            </div>
            <div className="w-[80%] flex justify-center items-center">
                <div className="relative">
                    <input 
                        type="text" 
                        className="w-[55vw] h-full p-2.5 bg-(--card-bg) text-(--text-primary)  rounded-2xl rounded-r-none" 
                        placeholder="Найти трек..."
                        value={value}
                        onChange={event => setValue(event.target.value)}
                        onKeyDown={event => onKeyDown(event)}
                        onBlur={() => setModalSearch(false)}
                    />
                    <input
                        className="bg-(--secondary-bg) h-full p-[9px] text-(--text-primary) rounded-2xl rounded-l-none w-20  cursor-pointer hover:bg-[#171729]"
                        type="button" 
                        value="Искать"
                        onClick={onClick} 
                    />
                    {modalSearch && (
                        <ModalSearch
                            infoTracks={infoTracks}
                            tracks={tracks}
                            isLoading={isLoading}
                            isError={isError}
                        />
                    )}
                </div>
            </div>
            <button className="text-(--text-primary) cursor-pointer" onClick={() => setReference(!reference)}>
                {/* Доработаю */}
                Справка
            </button>
            
        </header>
    )
}