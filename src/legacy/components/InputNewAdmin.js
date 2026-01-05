import { useState } from 'react'
import { usePostUserMutation } from '../features/userApi'
import '../styles/SingUpInput.css'

export default function SingUpInput() {

    const [newUser] = usePostUserMutation()

    const [form, setForm] = useState({
        name: "",
        lastName: "",
        mail: "",
        password: "",
        photo: "",
        country: "",
        role: 'user',
        from: 'form'
    })

    const captureData = (event) => {
        const { name, value } = event.target
        setForm({ ...form, [name]: value })
    }

    const saveData = (event) => {
        event.preventDefault()

        const userData = {
            name: form.name,
            lastName: form.lastName,
            mail: form.mail,
            password: form.password,
            photo: form.photo,
            country: form.country,
            role: 'admin',
            from: 'form'
        }

        newUser(userData)
        event.target.reset()
    }


    return (
        <div className="Singup-container">
            <h2 className='Singup-h2'>New Admin</h2>
            <form className="Singup-form" onSubmit={saveData}>
                <input onChange={captureData} name="name" type='text' className="Singup-input" placeholder="Name" required />
                <input onChange={captureData} name="lastName" type='text' className="Singup-input" placeholder="LastName" required />
                <input onChange={captureData} name="mail" type='text' className="Singup-input" placeholder="Mail" required />
                <input onChange={captureData} name="password" type='password' className="Singup-input" placeholder="Password" required />
                <input onChange={captureData} name="photo" type='text' className="Singup-input" placeholder="Photo URL" required />
                <input onChange={captureData} name="country" type='text' className="Singup-input" placeholder="Conuntry" required />
                <button className="Singup-btn">Sign Up</button>
            </form>
        </div>
    )
}
