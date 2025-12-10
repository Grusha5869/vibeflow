import { useEffect, useState } from "react";

export function useGetLocalStorage() {
    
    
    const [trackStorage, setTrackStorage] = useState(() => {
        const stored = JSON.parse(localStorage.getItem('trackRecent')) || [];
        return stored
    });
    useEffect(() => {
        const updateStorage = () => {
            const stored = JSON.parse(localStorage.getItem('trackRecent')) || [];
            setTrackStorage(stored)
        }

        window.addEventListener('storage', updateStorage)

        return () => window.removeEventListener('storage', updateStorage)

    }, [])
    return trackStorage
}