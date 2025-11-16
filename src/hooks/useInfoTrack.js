import { useEffect, useMemo, useState } from "react";
import { config } from "../config-api";

export const useInfoTrack = (tracks, infoTrackRequest) => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!infoTrackRequest || tracks.length === 0) {
      setResult(null);
      setError(null);
      return;
    }

    let isMounted = true; // Флаг для отмены эффекта при размонтировании

    const infoTrackFetch = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const fetchPromises = tracks.map((elem) =>
          fetch(
            `${config.Api_Url}?method=track.getInfo&api_key=${config.Api_Key}&artist=${elem.artist}&track=${elem.name}&format=json`
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
              return data;
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
      return null;
    }

    return result.map((item) => {
      const track = item?.track || {};
      const album = track.album || {};
      const artist = track.artist || {};

      return {
        album: album,
        artist: artist,
        name: track.name || null,
        bestImage: album.image?.[album.image.length - 1] || null,
      };
    });
  }, [result]);

  return { result: resultMemo, isLoading, error };
};
