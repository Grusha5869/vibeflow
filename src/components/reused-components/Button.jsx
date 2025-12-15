import playImg from "../../assets/mini-player-icons/play.svg"

export default function Button({text, css, onClick}) {
    return (
        <button onClick={onClick} className={`bg-(--card-bg) rounded-2xl p-3 flex gap-2 items-center cursor-pointer ${css}`}>
            <img className="invert-100 w-6 h-6" src={playImg} alt="Слушать" />
            {text}
        </button>
    )
}