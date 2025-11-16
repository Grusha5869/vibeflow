import { config } from "../config-api";
import { useEffect, useState, useMemo } from "react"


export const useSearch = (value, searchRequest, limit, setInfoTrackRequest) => {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    /* const [verifLoad, setVerifLoad] = useState(false); */
    const [error, setError] = useState(false);
    
    useEffect(() => {
        if (value) {
            const fetchData = async () => {
                setLoading(true)
                try {
                    const res = await fetch(`${config.Api_Url}?method=track.search&track=${value}&api_key=${config.Api_Key}&format=json`)
                    const data = await res.json()

                    
                    if(data.error) {
                        throw new Error(data.message)
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