import '../../styles/Activities.css'
import axios from "axios"
import { useEffect, useState } from 'react'
import Activity from './activities/Activity'
import api from '../../api'

export default function Activities(props) {

    const id = props.data._id
    const [activities, setActivity] = useState([])

    useEffect(() => {
        axios.get(`${api}/activities/itinerary/${id}`)
            .then(response => setActivity(response.data.response))
    }, [id])

    return (
        <div className='Activity' >
            {activities?.map(activities => <Activity key={activities._id} name={activities.name} data={activities} />)}
        </div>
    )
}