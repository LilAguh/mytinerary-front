import '../styles/Details.css'
import axios from "axios"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import { Link as LinkRouter } from 'react-router-dom'
import Itineraries from './itinerary/Itineraries'
import { useSelector } from 'react-redux'

export default function Details() {

  let { id } = useParams()

  const logged = useSelector(state => state.userr.logged)
  const role = useSelector(state => state.userr.role)
  const [cities, setCities] = useState([])

  useEffect(() => {
    axios.get(api + `/cities/${id}`)
      .then(response => setCities(response.data.response))
  }, [id])

  const userlogic = () => {
    if (logged) {
      if (role === "admin") {
        return (
          <>
            <LinkRouter className='Details-boton' to={'/editcity/' + id}>Edit City</LinkRouter>
            <LinkRouter className='Details-boton' to={'/newitinerary/' + id}>New Itinerary</LinkRouter>
          </>
        )
      } else {
        return (
          <>
            <LinkRouter className='Details-boton' to={'/newitinerary/' + id}>New Itinerary</LinkRouter>
          </>
        )
      }
    } else {
      return (
        <>
        </>
      )
    }
  }

  const printDetails = (city) => {
    return (
      <>
        <LinkRouter to="/cities">
          <button className='Details-btn'><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
            <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
          </svg>  Back
          </button>

        </LinkRouter>
        <div className="Details-container">
          <div className="Details-Card">
            <div className='Details-containerImg'>
              <img className="Details-img" src={city.photo} alt="img" />
            </div>
            <div className='Details-containe-p'>
              <h2 className="Details-h2">{city.city}</h2>
              <p className='Details-p'>Country: {city.country} </p>
              <p className='Details-p'>population: {city.population} </p>
              {userlogic()}
            </div>
          </div>
        </div>
      </>

    )
  }


  return (
    <>
      {printDetails(cities)}
      <Itineraries data={cities} />
    </>
  )
}
