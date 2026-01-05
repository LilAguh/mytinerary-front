import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom"
import api from "../api"
import { useIdItineraryQuery } from "../features/itinerariesApi"
import '../styles/EditInerary.css'



export default function EditInerary() {

    let { id } = useParams()

    const { data: Itinerary } = useIdItineraryQuery(id)

    const editInicial = {
        name: "",
        duration: ""
    }

    const [dataitinerary, setDataitenerary] = useState(editInicial)

    const captureData = (event) => {
        const { name, value } = event.target
        setDataitenerary({ ...dataitinerary, [name]: value })
    }

    const saveData = async (event) => {
        event.preventDefault()

        const editItnerary = {
            name: dataitinerary.name,
            duration: dataitinerary.duration,
        }

        await axios.put(api + `/itineraries/${id}`, editItnerary)

        event.target.reset()

        window.location.replace('/mytineraries')
    }

    return (
        <>
            <div className="EditItinerary-conatiner">
                <form className="EditItinerary-form" onSubmit={saveData}>
                    <input className="EditItinerary-input" name='name' onChange={captureData} placeholder='name' />
                    <input className="EditItinerary-input" name='duration' onChange={captureData} placeholder='duration' />
                    <button className="EditItinerary-btn">Send</button>
                </form>
            </div>
        </>
    )
}
