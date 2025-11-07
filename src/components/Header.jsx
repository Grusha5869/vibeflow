import { useEffect, useRef, useState } from "react"
import { useSearch } from '../hooks/useSearch'
import { config } from "../config";

export default function Header({ reference, setReference }) {
    const [value, setValue] = useState('');
    const [request, setRequest] = useState(false);
    const inputRef = useRef(null)
    const infoTracks = useSearch(value, request)
    
    function trigger() {
        if (value === '') {
            alert('Такого трека нет')
            return
        }
        setRequest(!request)

    }

    function onKeyDown(event) {
        if (event.key === 'Enter') {
            trigger()
        }
    }
    function onClick() {
        trigger()
    }
    

    return (
        <header className="w-full h-12 flex justify-between items-center mb-10">
            <div className="text-(--text-primary)">
                {/* потом поменяю */}
                    vibeflow            </div>
            <div className="w-[80%] flex justify-center items-center">
                <input 
                    type="text" 
                    className="w-[70%] h-full p-2.5 bg-(--card-bg) text-(--text-primary)  rounded-2xl rounded-r-none" 
                    placeholder="Найти трек..."
                    value={value}
                    onChange={event => setValue(event.target.value)}
                    onKeyDown={event => onKeyDown(event)}
                    
                />
                <input
                    className="bg-(--secondary-bg) h-full p-[9px] text-(--text-primary) rounded-2xl rounded-l-none w-20  cursor-pointer hover:bg-[#171729]"
                    type="button" 
                    value="Искать"
                    onClick={onClick} 
                />
            </div>
            <button className="text-(--text-primary) cursor-pointer" onClick={() => setReference(!reference)}>
                {/* Доработаю */}
                Справка
            </button>
        </header>
    )
}