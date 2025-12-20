import { useEffect, useMemo, useState } from "react"
import API_KEYS from "../config-api"

export const usePopularTrack = (country) => {
    const [result, setResult] = useState(null)
    const [getLSValue, setGetLSValue] = useState(() => {
        const stored = localStorage.getItem('popularTrackArr')
        return stored ? JSON.parse(stored) : []
    })

    useEffect(() => {
        async function fetchPopularTrack() {
            if (getLSValue.length > 0) {
                const timestap = getLSValue[getLSValue.length - 1];
                const date = new Date().getTime();
                const fourDays = 4 * 24 * 60 * 60 * 1000;

                if (date - timestap <= fourDays) return
            }
            
            try {
                const res = await fetch(`${API_KEYS.API_URL}?method=geo.gettoptracks&country=${country}&limit=10&api_key=${API_KEYS.API_KEY}&format=json`)
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
            tracksArr.push(new Date().getTime())
            localStorage.setItem(`popularTrackArr`, JSON.stringify(tracksArr))

            return tracksArr
        }
        return getLSValue
        
    }, [result])

    return trackMemo
}
