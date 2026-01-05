import React, { useState } from 'react'
import '../styles/Input.css'
import { usePostNewCityMutation } from '../features/citiesApi'
import Alert from './alerts/Alert'
import checkIcon from '../assets/icons/check.png'
import errorIcon from '../assets/icons/exclamation.png'

export default function Input() {

    const [PostNew] = usePostNewCityMutation()

    const datosInicial = {
        city: "",
        country: "",
        photo: "",
        population: undefined,
        fundation: undefined,
        information: ""
    }

    const [city, setCity] = useState(datosInicial)

    const capturoData = (e) => {
        const { name, value } = e.target
        setCity({ ...city, [name]: value })
    }

    const [list, setList] = useState([])
    let toastProperties = null

    const showAlert = type => {
        switch (type) {
            case 'success':
                toastProperties = {
                    id: list.length + 1,
                    title: 'Welcome',
                    description: 'Successfully created a New City',
                    backgroundColor: '#5cb85c',
                    icon: checkIcon
                }
                break;
            case 'error':
                toastProperties = {
                    id: list.length + 1,
                    title: 'Try Again',
                    description: 'Error creating New City',
                    backgroundColor: '#d9534f',
                    icon: errorIcon
                }
                break;
            default:
                toastProperties = [];
        }
        setList([...list, toastProperties])
    }


    const saveData = async (e) => {
        e.preventDefault()

        const newCity = {
            city: city.city,
            country: city.country,
            photo: city.photo,
            population: city.population,
            fundation: city.fundation,
            information: city.information
        }

        PostNew(newCity)
            .then(response => {
                if (response.data.success === true) {
                    showAlert('success')
                    window.location.replace('/cities')
                }
                else {
                    showAlert('error')
                    window.location.replace('/cities')
                }
            })

        setCity({ ...datosInicial })
    }



    return (
        <div className='Input-Container'>
            <h2 className='Input-h2'>NewCity</h2>
            <form onSubmit={saveData} className='Input-Containerbox' >
                <input className='Input-input' name="city" type="text" placeholder="City" value={city.city} onChange={capturoData} required />
                <input className='Input-input' name="country" type="text" placeholder="Country" value={city.country} onChange={capturoData} required />
                <input className='Input-input' name="photo" type="text" placeholder="Photo" value={city.photo} onChange={capturoData} required />
                <input className='Input-input' name="population" type="number" placeholder="Population" value={city.population} onChange={capturoData} required />
                <input className='Input-input' name="fundation" type="text" placeholder="Fundation" value={city.fundation} onChange={capturoData} required />
                <input className='Input-input' name="information" type="text" placeholder="information" value={city.information} onChange={capturoData} required />
                <button className='Input-button'>Send</button>
            </form>
            <Alert toastlist={list} setList={setList} />
        </div>
    )
}