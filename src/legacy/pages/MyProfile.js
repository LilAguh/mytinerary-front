import axios from "axios"
import { useState } from "react"
import { useSelector } from "react-redux"
import api from '../api'
import '../styles/MyProfile.css'

export default function MyProfile() {

    let id = useSelector(state => state.userr.id)
    let userStore = useSelector(state => state.userr)

    let editInitial = {
        name: "",
        lastname: "",
        photo: "",
        country: "",
    }

    const [user, setUser] = useState(editInitial)


    const captureData = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const saveData = async (event) => {
        event.preventDefault();

        const newUser = {
            name: user.name,
            lastname: user.lastname,
            photo: user.photo,
            country: user.country,
        }

        await axios.put(api + `/auth/${id}`, newUser)

        window.location.reload(true)
    }

    return (
        <div className="MyProfile-container">
            <h2 className="MyProfile-h2">MyProfile</h2>
            <form onSubmit={saveData} className="MyProfile-form">
                <input className="Myprofile-input" onChange={captureData} placeholder={userStore.name} name="name" />
                <input className="Myprofile-input" onChange={captureData} placeholder={userStore.lastName} name="lastname" />
                <input className="Myprofile-input" onChange={captureData} placeholder={userStore.photo} name="photo" />
                <input className="Myprofile-input" onChange={captureData} placeholder={userStore.country} name="country" />
                <button className="Myprofile-btn"> Send </button>
            </form>

        </div>
    )
}
