import '../../styles/Itinerary.css'
import Itinerary from './itineraries/Itinerary'
import { useGetItinerariesQuery } from '../../features/itinerariesApi'


export default function Itineraries(props) {

    const id = props.data._id

    const { data: itineraries, isLoading } = useGetItinerariesQuery(id)

    if(isLoading){
        return(
          <div className="Cities-Loader">
            <span className="loader"></span>
          </div>
        )
    }

    return (
        <div className="Itinerary">
            {itineraries?.map(itineraries => <Itinerary key={itineraries._id} name={itineraries.name} data={itineraries} />)}
        </div>
    )
}
