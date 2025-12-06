import { useEffect } from "react"

export const useCloseModal = (ref, fun) => {
    
    useEffect(() => {
        function handleClick(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                fun()
            }
        }

        document.addEventListener('mousedown', handleClick)

        return () => document.removeEventListener('mousedown', handleClick)
    }, [ref, fun])

}