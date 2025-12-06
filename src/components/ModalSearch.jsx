import { MiniPlayerContext } from "../context/Mini-player-context";
import { useContext, useEffect, useRef, useState } from "react";
import SearchTrack from "./SearchTrack"
import { useCloseModal } from "../hooks/useCloseModal";

export default function ModalSearch({tracks, infoTracks, isLoading, isError, setModalSearch, modalSearch}) {
    const [point, setPoint] = useState('загрузка');
    const {setOpenMiniPlayer, specificTrack, setSpecificTrack} = useContext(MiniPlayerContext);
    const modalRef = useRef(null);
    const closeModal = useCloseModal(modalRef, () => setModalSearch(false))

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

    function clickSearchTrack(elem) {
        if (!elem) return;

        setOpenMiniPlayer(true);
        setSpecificTrack(elem);

        if (modalSearch) {
            setModalSearch(false)
        }
    }

    return (
        <div ref={modalRef} className="w-full top-12 p-2.5 absolute bg-(--card-bg) rounded-[7px]">
            <ul className='cursor-pointer'>
                {tracksArr ? 
                    tracksArr.map(elem => 
                        <SearchTrack
                            key={elem.identif}
                            identif={elem.identif}
                            elem={elem}
                            onClick={() => clickSearchTrack(elem)}
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