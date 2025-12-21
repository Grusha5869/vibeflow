import { useEffect, useMemo, useState } from "react"
import API_KEYS from "../config-api"

export const useTag = (tag, limit, LSKey) => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchTag() {
            
            if (LSKey.length > 0) {
                setLoading(false)
                setError(false)
                return 
            }
            try {
                setLoading(true)
                const res = await fetch(`${API_KEYS.API_URL}?method=tag.gettoptracks&tag=${tag}&limit=${limit}&api_key=${API_KEYS.API_KEY}&format=json`)
                const data = await res.json()

                if (data.error) {
                    throw new Error(data.message);
                }

                setResult(data)
                setLoading(false)
                setError(false)

            } catch (error) {
                console.error('error Tag api', error);
                setLoading(false)
                setError(true)
            }
        }
        fetchTag()
    }, [])

    const resultMemo = useMemo(() => {
        if (!result) return []
        
        const arr = result?.tracks.track || [];
        const arrFil = arr.map(elem => {
            return {
                artist: elem?.artist?.name || 'неизвестно',
                nameTrack: elem?.name || 'неизвестно'
            }
        })
    
        return arrFil
    }, [result])

    return {
        result: resultMemo,
        loading,
        error
    }
}