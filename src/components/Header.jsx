export default function Header() {
    return (
        <header className="w-full h-12 flex justify-between items-center mb-10">
            <div className="text-(--text-primary)">
                {/* потом поменяю */}
                    vibeflow
            </div>
            <input type="text" className="w-[70%] h-full p-2.5 bg-(--card-bg) text-(--text-primary)  rounded-2xl " placeholder="Найти трек..." />
            <button className="text-(--text-primary)">
                {/* Доработаю */}
                Справка
            </button>
        </header>
    )
}