import axios from 'axios'
import { useEffect, useState } from 'react'
import '../styles/FormEditCity.css'
import api from '../api'
import { useParams } from 'react-router-dom'

export default function FormEditCity() {

  const editInicial = {
    city: "",
    country: "",
    photo: "",
    population: 0,
    fundation: 0,
    information: ""
  }


  let { id } = useParams();

  const [subId, setSubId] = useState(id)
  const [city, setCity] = useState(editInicial)




  const capturoData = (e) => {
    const { name, value } = e.target
    setCity({ ...city, [name]: value })
  }
  const saveData = async (e) => {
    e.preventDefault();
    console.log(city);

    const newCity = {
      city: city.city,
      country: city.country,
      photo: city.photo,
      population: city.population,
      information: city.information
    }

    await axios.put(api + `/cities/${subId}`, newCity)

    setCity({ ...editInicial })
  }

  const obtUno = async (valorId) => {
    const res = await axios.get(api + `/cities/${valorId}`)
    // console.log(res)
    setCity({
      city: res.data.response.city,
      country: res.data.response.country,
      photo: res.data.response.photo,
      population: res.data.response.population,
      information: res.data.response.information,

    })

  }


  useEffect(() => {
    if (subId !== "") {
      obtUno(subId)
    }
  }, [subId])


  return (
    <div className='FormEditCity-Container'>
      <h2 className='FormEditCity-h2'>Edit City</h2>
      <form onSubmit={saveData} className='FormEditCity-Containerbox'>
        <input className='FormEditCity-input' type="text" name="city" placeholder='City' value={city.city} required onChange={capturoData} />
        <input className='FormEditCity-input' type="text" name="country" placeholder='Country' value={city.country} required onChange={capturoData} />
        <input className='FormEditCity-input' type="text" name="photo" placeholder='URL Photo' value={city.photo} required onChange={capturoData} />
        <input className='FormEditCity-input' type="number" name="population" placeholder='Population' value={city.population} required onChange={capturoData} />
        <textarea className='FormEditCity-textarea ' type="text" name="information" placeholder='Information' value={city.information} required onChange={capturoData} />
        <button className='FormEditCity-button'>Send</button>
      </form>
    </div>
  )
}
