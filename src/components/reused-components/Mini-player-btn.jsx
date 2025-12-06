export default function MiniPlayerBtn({img, alt, styles, onClick}) {
    return (
        <button onClick={onClick} className={styles}>
            <img src={img} alt={alt} />
        </button>
    )
}