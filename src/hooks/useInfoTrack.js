import { useEffect, useMemo, useState } from "react";
import API_KEYS from "../config-api";


export const useInfoTrack = (tracks, infoTrackRequest, lsKey) => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [getLSValue, setGetLSValue] = useState(() => {
    if (lsKey) {
      const stored = localStorage.getItem(lsKey);
      return stored ? JSON.parse(stored) : []
    }
    
    return []
  })

  function dataIdentificator() {
    return new Date().getTime() + Math.random()
  }

  useEffect(() => { 
    
    if (!infoTrackRequest || tracks.length <= 0) {
      setResult(null);
      setError(null);
      setIsLoading(false);
      
      return;
    }

    let isMounted = true; // Флаг для отмены эффекта при размонтировании

    const infoTrackFetch = async () => {
      setIsLoading(true);
      setError(null);
      if (getLSValue.length !== 0) {
        
        return
      }
      
      const filterTracks = tracks.filter(elem => typeof elem !== 'number')
      
      try {
        
        const fetchPromises = filterTracks.map((elem) =>  
          fetch(
            `${API_KEYS.API_URL}?method=track.getInfo&api_key=${API_KEYS.API_KEY}&artist=${elem.artist}&track=${elem.name || elem.nameTrack}&format=json`
          )
            .then((res) => {
              if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
              }
              return res.json();
            })
            .then((data) => {
              if (data.error) {
                throw new Error(data.message);
              }

              data.identif = dataIdentificator();

              return data;
            })
            .catch(error => {
              console.error(error);
              
            })
        );

        const results = await Promise.all(fetchPromises);

        setResult(results);
        
        
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    infoTrackFetch();

    return () => {
      isMounted = false; // Отмена эффекта при размонтировании
    };
  }, [infoTrackRequest, tracks]);

  const resultMemo = useMemo(() => {
    
    if (!result || !Array.isArray(result)) {

      return getLSValue;
    }

    return result.map((item) => {
      const identificator = item?.identif || null;
      const track = item?.track || {};
      const album = track.album || {};
      const artist = track.artist || {};
      const listeners = track?.listeners || 'неизвестно'

      return {
        identif: identificator,
        album: album,
        artist: artist,
        name: track.name || null,
        bestImage: album.image?.[album.image.length - 1] || null,
        listeners: listeners,
      };
    });
  }, [result]);

  useEffect(() => {
    if (resultMemo) {
      if (lsKey) {
        localStorage.setItem(lsKey, JSON.stringify(resultMemo));
      }
    }
  }, [resultMemo])
  
  return { result: resultMemo, isLoading, error };
};
