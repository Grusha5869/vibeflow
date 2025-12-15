import { useEffect, useMemo, useState } from "react"
import API_KEYS from "../config-api"

export const usePopularTrack = (country) => {
    const [result, setResult] = useState(null)
    const [getLSValue, setGetLSValue] = useState(() => {
        const stored = localStorage.getItem('popularTrackArr')
        return stored ? JSON.parse(stored) : []
    })
    //сохранение в local storage и еще обновить через неделю
    //нету картинок, тк к каждому треку getTopTrack, много запросов.
    useEffect(() => {
        async function fetchPopularTrack() {
            if (!(getLSValue.length === 0)) return
            
            try {
                const res = await fetch(`${API_KEYS.API_URL}?method=geo.gettoptracks&country=${country}&limit=65&api_key=${API_KEYS.API_KEY}&format=json`)
                const data = await res.json();

                if (data.error) {
                    throw new Error(data.message)
                }

                const dataTrack = data?.tracks?.track || []
                setResult(dataTrack)
                
            } catch (error) {
                console.error('error api popular track', error);
                
            }
        }
        fetchPopularTrack()
    }, [])
    const trackMemo = useMemo(() => {
        if (result) {
            const tracksArr = result.map(elem => {
                return {
                    nameTrack: elem?.name || 'неизвестно',
                    artist: elem?.artist?.name || 'неизвестно',
                    listeners: elem?.listeners || 'неизвестно',
                    identif: new Date().getTime() + Math.random() * 10000
                }
                
            })
            tracksArr.push(new Date().getDate())
            localStorage.setItem(`popularTrackArr`, JSON.stringify(tracksArr))

            return tracksArr
        }
        return getLSValue
        
    }, [result])

    return trackMemo
}
