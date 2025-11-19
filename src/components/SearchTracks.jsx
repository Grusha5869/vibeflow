import defImg from '../assets/icons/defSearchImg.svg'

export default function SearchTracks({identif, elem}) {
    return (
        <li className="border-3 border-(--secondary-bg) mt-1 p-2 rounded-xl flex items-center">
            <img className="w-19 h-19 mr-2" src={elem?.bestImage?.['#text'] || defImg} alt="Обложка трека" />
            <div className="flex flex-col">
                <span className="text-white text-[18px]">{elem?.name}</span>
                <span className="text-white text-[12px]">{elem?.artist?.name}</span>
            </div>
        </li>
    )
}