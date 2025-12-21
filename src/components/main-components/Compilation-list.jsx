import { Link } from "react-router"
import Trends from "./Trends"

export default function CompilationList() {
    return (
        <ul className="mx-auto max-w-10/12 h-40 flex gap-2.5 mt-5">
            <li className="flex-1  bg-red-300 hover:bg-red-400 text-3xl rounded-xl">
                <Link to='/playlist-trends' className="block h-full p-4">
                    Лучшее за последнюю неделю
                </Link>
            </li>
            <li className="flex-1 bg-orange-200 hover:bg-orange-400 rounded-xl text-3xl">
                <Link to='/playlist-trends-similar' className="block h-full p-4">
                    Похожие на последний трек
                </Link>
            </li>
            <li className="flex-1 bg-emerald-200 hover:bg-emerald-400 rounded-xl">
                
            </li>

        </ul>
    )
}