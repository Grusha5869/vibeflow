import { useEffect } from "react"

export const useCloseModal = (fun, ...ref) => {
    
    useEffect(() => {
        function handleClick(event) {

            ref.map(elem => {
                if (elem.current && !elem.current.contains(event.target)) {
                    return fun()
                }
            })
            
        }

        document.addEventListener('mousedown', handleClick)

        return () => document.removeEventListener('mousedown', handleClick)
    }, [ref, fun])

}