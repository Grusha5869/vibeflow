import { Link } from "react-router"
import Trends from "./Trends"

export default function CompilationList() {
    return (
        <ul className="mx-auto max-w-10/12 flex gap-2.5 mb-15">
            
            <li className="flex-1 h-50 bg-violet-900/10 backdrop-blur-lg
                          border border-violet-500/20
                          hover:bg-violet-900/20 hover:border-violet-400/40
                          hover:shadow-[0_8px_32px_0] hover:shadow-violet-500/15
                          transition-all duration-200 rounded-xl text-4xl">
                <Link to='/playlist-trends' className="block h-full p-5 text-violet-200">
                    Лучшее за последнюю неделю
                </Link>
            </li>
            <li className="flex-1 h-50 bg-cyan-900/10 backdrop-blur-lg
                          border border-cyan-500/20
                          hover:bg-cyan-900/20 hover:border-cyan-400/40
                          hover:shadow-[0_8px_32px_0] hover:shadow-cyan-500/15
                          transition-all duration-200 rounded-xl text-4xl">
                <Link to='/playlist-trends-similar' className="block h-full p-5 text-cyan-200">
                    Похожие на последний трек
                </Link>
            </li>
            <li className="flex-1 h-50 bg-emerald-900/10 backdrop-blur-lg
                          border border-emerald-500/20
                          hover:bg-emerald-900/20 hover:border-emerald-400/40
                          hover:shadow-[0_8px_32px_0] hover:shadow-emerald-500/15
                          transition-all duration-200 rounded-xl text-4xl">
                <Link to='/playlist-tags' className="block h-full p-5 text-emerald-200">
                    Музыка для отдыха
                </Link>
            </li>

        </ul>
    )
}