import { useEffect, useRef, useState } from "react"
import { config } from "../config";

export default function Header() {
    const [value, setValue] = useState('');
    const [request, setRequest] = useState(false);
    const inputRef = useRef(null)
    /* const [active, setActive] = useState(false) */
    
    useEffect(() => {
        if (value) {
            const fetchData = async () => {
                
                try {
                    const res = await fetch(`${config.Api_Url}?method=track.search&track=${value}&api_key=${config.Api_Key}&format=json`)
                    const data = await res.json()

                    if(data.error) {
                        throw new Error(data.message)
                    }

                    console.log(data);
                    
                } catch (error) {
                    console.error('error api', error)
                }
            }
            fetchData()
        }
    }, [request])

    function onKeyDown(event) {
        if (event.key === 'Enter') {
            if (value === '') {
                alert('Такого трека нет')
            }
            setRequest(!request)
        }
    }
    function onClick() {
        if (value === '') {
            alert('Такого трека нет')
        }
        setRequest(!request)
    }
    
    return (
        <header className="w-full h-12 flex justify-between items-center mb-10">
            <div className="text-(--text-primary)">
                {/* потом поменяю */}
                    vibeflow
            </div>
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
            <button className="text-(--text-primary)">
                {/* Доработаю */}
                Справка
            </button>
        </header>
    )
}