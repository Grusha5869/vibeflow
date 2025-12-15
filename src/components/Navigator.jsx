import { Link, NavLink } from "react-router"
import iconHome from '../assets/navigator-icons/home.svg'
import iconTrends from '../assets/navigator-icons/fire.svg'
import iconFavorite from '../assets/navigator-icons/favorite.svg'
import iconGeo from '../assets/navigator-icons/geo.svg'

export default function Navigator() {
    
    return (
        <nav className="w-10 h-screen text-(--text-primary) flex flex-col gap-y-7 items-center justify-center">
            
            <NavLink to='/'>
                {({ isActive }) => {
                    return (
                        <img 
                            src={iconHome} 
                            className={`w-8 h-8 ${isActive ? 'invert-50' : 'invert-100'}`}  
                            alt="Главная страница" 
                        />
                    )
                }}
            </NavLink>
            <NavLink to='/geo'>
                {({ isActive }) => {
                    return (
                        <img 
                            src={iconGeo} 
                            className={`w-8 h-8 ${isActive ? 'invert-50' : 'invert-100'}`}  
                            alt="Страница популяных треков" 
                        />
                    )
                }}
            </NavLink>
            <NavLink to='/favorite'>
                {({ isActive }) => {
                    return (
                        <img 
                            src={iconFavorite} 
                            className={`w-8 h-8 ${isActive ? 'invert-50' : 'invert-100'}`}  
                            alt="Страница ваших любимых треков" 
                        />
                    )
                }}
            </NavLink>

        </nav>
    )
}