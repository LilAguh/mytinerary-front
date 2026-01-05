import axios from "axios"
import { useGetItinerariesByUserQuery } from '../features/itinerariesApi'
import { Link as LinkRouter } from 'react-router-dom'
import { useSelector } from "react-redux"
import api from "../api"

export default function UserMytineraries() {

    let user = useSelector(state => state.userr)

    const showItineraries = (itinera) => {
        return (
            <div className='MyTineraries-itneraries'>
                <p>City: {itinera.city.city}</p>
                <p>Name: {itinera.name}</p>
                <p>Duration: {itinera.duration} days</p>
                <div className="container-btn">
                    <LinkRouter className="buttom-link" to={`/itineraries/${itinera._id}`}>Edit</LinkRouter>
                    <button className="buttom" onClick={() => deleteItinerary(itinera._id)}>Delete</button>
                </div>
            </div>

        )
    }

    const deleteItinerary = (id) => {
        axios.delete(api + `/itineraries/${id}`)
        window.location.replace('/mytineraries')
    }

    const { data: itinerary } = useGetItinerariesByUserQuery(user.id)


    return (
        <div>
            <LinkRouter to='/'><button className='MyTineraries-btn'>Back</button></LinkRouter>
            <h2 className='MyTineraries-h2'>MyTineraries</h2>
            <div className='MyTineraries-container'>
                <h4 className='MyTineraries-h4'>User: {user.name}</h4>
                {itinerary?.map(showItineraries)}
            </div>
        </div>
    )
}
