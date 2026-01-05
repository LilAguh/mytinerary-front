import '../../../styles/Activities.css'
export default function Activities(props) {

    const activities = props.data

    return (
        <div className="Activity-Container">
            <div className='Activity-ContainerImg' >
                <img className='Activity-Img' src={activities.photo} />
            </div>
                <h4 className='Activity-Title' >{activities.name}</h4>
        </div>
    )
}