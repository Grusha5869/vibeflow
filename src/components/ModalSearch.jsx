export default function ModalSearch({tracks, infoTracks, isLoading, isError}) {
    if (isLoading || !infoTracks) {
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

    return (
        <div className="w-full top-10 p-2.5 absolute bg-amber-50">
           
        </div>
    )
}