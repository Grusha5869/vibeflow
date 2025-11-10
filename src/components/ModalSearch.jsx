export default function ModalSearch({tracks, isLoading, isError}) {
    if (isLoading) {
        return (
            <div className="w-full top-10 p-2.5 absolute bg-amber-50">
                загрузка
            </div>
        )
    }
    if (isError) {
        return (
            <div className="w-full top-10 p-2.5 absolute bg-amber-50">
                Ошибка, трек не найден
            </div>
        )
    }
    if (!tracks || tracks.length === 0) {
        return (
            <div className="w-full top-10 p-2.5 absolute bg-amber-50">
                треки не найдены
            </div>
        )
    }
    function onClick(url) {
        const audio = new Audio(url)
        audio.play()
    }

    return (
        <div className="w-full top-10 p-2.5 absolute bg-amber-50">
            <strong onClick={() => onClick(tracks[0].url)}>{tracks[0].artist}</strong>
        </div>
    )
}