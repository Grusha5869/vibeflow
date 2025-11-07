import { config } from "../config";
import { useEffect, useState } from "react"


export const useSearch = (value, request) => {
    const [result, setResult] = useState('');
    useEffect(() => {
        if (value) {
            const fetchData = async () => {
                
                try {
                    const res = await fetch(`${config.Api_Url}?method=track.search&track=${value}&api_key=${config.Api_Key}&format=json`)
                    const data = await res.json()

                    
                    if(data.error) {
                        throw new Error(data.message)
                    }

                   setResult(data)
                    
                } catch (error) {
                    console.error('error api', error)
                }
            }
            fetchData()
        }
        
    }, [request])

    return {
        tracks: result?.results?.trackmatches?.track || [],
    }
}