import { Link } from "react-router";

export default function Navigator() {
    return (
        <nav className="w-18 h-screen text-(--text-primary) flex flex-wrap">
            <Link to='/'>Главная</Link>
            <Link to='/trends'>В тренде</Link>
            <Link to='/favorite'>Любимое</Link>
        </nav>
    )
}