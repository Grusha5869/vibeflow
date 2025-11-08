import { config } from "../config";
import { useEffect, useState } from "react"


export const useSearch = (value, request, limit) => {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    
    useEffect(() => {
        if (value) {
            const fetchData = async () => {
                setLoading(true)
                try {
                    const res = await fetch(`${config.Api_Url}?method=track.search&track=${value}&api_key=${config.Api_Key}&format=json`)
                    const data = await res.json()

                    
                    if(data.error) {
                        throw new Error(data.message)
                        setLoading(false)
                        setError(true)
                    }

                    setResult(data)
                    setLoading(false)
                    
                } catch (error) {
                    console.error('error api', error)
                    setLoading(false)
                    setError(true)
                }
            }
            fetchData()
        }
        
    }, [request])
    const tracks = result?.results?.trackmatches?.track || [];
    const limitTracks = tracks.slice(0, limit);

    return {
        tracks: limitTracks,
        isLoading: loading,
        isError: error,
    }
}