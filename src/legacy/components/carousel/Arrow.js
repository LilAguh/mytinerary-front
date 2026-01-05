import '../../styles/Arrow.css'

export default function Arrow(props) {
    if (!props.icon) {
        throw new Error("No esta llegando el icon")
    }
    if (!props.click) {
        throw new Error("No esta llegando el click")
    }
    return (
        <div className="Arrow-container">
            <button className="Arrow-btn" onClick={props.click}>
                {props.icon}
            </button>
        </div>
    )
}
