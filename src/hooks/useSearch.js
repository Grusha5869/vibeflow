import API_KEYS from "../config-api.js";
import { useEffect, useState, useMemo, useRef } from "react"


export const useSearch = (value, searchRequest, setSearchRequest, limit, setInfoTrackRequest) => {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const isFetching = useRef(false);
    
    useEffect(() => {
        if (searchRequest && value && !isFetching.current) {
            isFetching.current = true;
            const fetchData = async () => {
                setLoading(true)
                try {
                    const res = await fetch(`${API_KEYS.API_URL}?method=track.search&track=${value}&api_key=${API_KEYS.API_KEY}&format=json`)
                    const data = await res.json()
                    
                    if(data.error) {
                        throw new Error(data.message)
                    }

                    setResult(data)
                    setLoading(false)
                    
                } catch (error) {
                    console.error('error api', error)
                    setError(true)
                } finally {
                    setLoading(false)
                    setSearchRequest(false)
                    isFetching.current = false
                }
            }
            fetchData()
        }
        
    }, [searchRequest])

    useEffect(() => {
        if (!loading && result) {
            setInfoTrackRequest(true)
        } else {
            setInfoTrackRequest(false)
        }
    }, [loading, result])

    //был бесконечный рендер :(
    const tracks = useMemo(() => {
        const rawTracks = result?.results?.trackmatches?.track || [];
        return rawTracks.slice(0, limit);
        
    }, [result, limit]);

    return {
        tracks,
        isLoading: loading,
        isError: error,
    }
}