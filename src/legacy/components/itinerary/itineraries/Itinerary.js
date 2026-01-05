import '../../../styles/Itinerary.css'
import Activities from "../Activities"
import Comments from "../Comments"
import Like from '../Like'


export default function Itinerary(props) {

    const itineraries = props.data

    return (
        <>

            <div className="Itinerary-Container">
                <div className="Itinerary-ImgContainer">
                    {/* <img className="Itinerary-Img" src={itineraries.city.photo} /> */}
                </div>
                <div className="Itinerary-InformationContainer">
                    <h3 className="Itinerary-Title">{itineraries.name}</h3>
                    <div className="Itinerary-Information">
                        <div className="Itinerary-Section">
                            <div className="Itinerary-User">
                                <img className="Itinerary-ImgUser" src={itineraries.user.photo} />
                                <p className="Itinerary-UserName"> By {itineraries.user.name}</p>
                                <Like itinerary={itineraries} />
                            </div>
                            <div className="Itinerary-ActivitiesContainer">
                                <h3 className="Itinerary-ActivityTitle">Activities:</h3>
                                <Activities data={itineraries} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Comments data={itineraries} />
        </>
    )
}
