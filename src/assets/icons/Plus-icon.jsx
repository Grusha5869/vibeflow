export default function PlusIcon({css, onClick}) {
    return (
        <div onClick={onClick} className={`absolute top-4 right-2 cursor-pointer ${css}`}>
            <div className="absolute w-6 h-[3px] bg-amber-50"></div>
            <div className="w-6 h-[3px] bg-amber-50 rotate-90"></div>
        </div>
    )
}