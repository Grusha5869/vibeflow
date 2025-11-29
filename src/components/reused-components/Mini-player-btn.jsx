export default function MiniPlayerBtn({img, alt, styles}) {
    return (
        <button className={styles}>
            <img src={img} alt={alt} />
        </button>
    )
}