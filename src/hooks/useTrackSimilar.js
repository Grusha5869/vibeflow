import { useEffect, useMemo, useState } from "react"
import API_KEYS from "../config-api"

export const useTrackSimilar = (track, limit, keyLS) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [result, setResult] = useState(null)
    

    const trackFilter = useMemo(() => {  
        
        if (track.length > 0) {
            return {
                artist: track[0].artist,
                nameTrack: track[0].nameTrack
            }
        }
        
        return null
    }, [track])

    useEffect(() => {
        if (track && track.length > 0 && trackFilter) {
            async function fetchSimilar() {
                try {
                    setLoading(true)

                    const res = await fetch(`${API_KEYS.API_URL}?method=track.getsimilar&artist=${trackFilter.artist}&track=${trackFilter.nameTrack}&limit=${limit}&api_key=${API_KEYS.API_KEY}&format=json`)
                    const data = await res.json()

                    if (data.error) {
                        throw new Error(data.message);
                    }
                    console.log(data);
                    
                    setResult(data)
                    setLoading(false)
                    setError(false)
                } catch (error) {
                    console.error("error similar api", error);
                    setLoading(false)
                    setError(true)
                }
            }
            fetchSimilar()
        }
    }, [track])

    const resultMemo = useMemo(() => {
        if (result) {
            const arr = result?.similartracks?.track || []
            const arrTracks = arr.map(elem => {
                return {
                    artist: elem?.artist?.name || 'неизвестно',
                    nameTrack: elem?.name || 'неизвестно',
                    listeners: elem?.playcount || 'неизвестно',
                }
            });
            
            return arrTracks
        }
        return []
    }, [result])

    
    return {
        resultMemo,
        loading,
        error
    }
}