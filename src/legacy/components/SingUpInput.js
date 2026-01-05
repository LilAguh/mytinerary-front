import { useState } from 'react'
import { usePostUserMutation } from '../features/userApi'
import '../styles/SingUpInput.css'
import checkIcon from '../assets/icons/check.png'
import warningIcon from '../assets/icons/warning.png'
import infoIcon from '../assets/icons/info.png'
import Alert from './alerts/Alert'

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

    const [list, setList] = useState([])
    let toastProperties = null

    const showAlert = type => {
        switch (type) {
            case 'success':
                toastProperties = {
                    id: list.length + 1,
                    title: 'Welcome',
                    description: 'User created Successfully',
                    backgroundColor: '#5cb85c',
                    icon: checkIcon
                }
                break;
            case 'info':
                toastProperties = {
                    id: list.length + 1,
                    title: 'Verify your account',
                    description: 'Check your email box',
                    backgroundColor: '#5bc0de',
                    icon: infoIcon
                }
                break;
            case 'warning':
                toastProperties = {
                    id: list.length + 1,
                    title: 'Warning',
                    description: 'User already exists',
                    backgroundColor: '#f0ad4e',
                    icon: warningIcon
                }
                break;
            default:
                toastProperties = [];
        }
        setList([...list, toastProperties])
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
            role: 'user',
            from: 'form'
        }

        newUser(userData)
            .then(response => {
                if (response.data.success === true) {
                    showAlert('success')
                    showAlert('info')
                    window.location.replace('/singin')
                }
                else {
                    showAlert('warning')
                    window.location.replace('/singin')
                }
            })

        event.target.reset()
    }

    return (
        <div className="Singup-container">
            <h2 className='signUp-h2'>Sign up now</h2>
            <form className="Singup-form" onSubmit={saveData}>
                <input onChange={captureData} name="name" type='text' className="Singup-input" placeholder="Name" required />
                <input onChange={captureData} name="lastName" type='text' className="Singup-input" placeholder="LastName" required />
                <input onChange={captureData} name="mail" type='text' className="Singup-input" placeholder="Mail" required />
                <input onChange={captureData} name="password" type='password' className="Singup-input" placeholder="Password" required />
                <input onChange={captureData} name="photo" type='text' className="Singup-input" placeholder="Photo URL" required />
                <input onChange={captureData} name="country" type='text' className="Singup-input" placeholder="Conuntry" required />
                <button className="Singup-btn">Sign Up</button>
            </form>
            <Alert toastlist={list} setList={setList} />
        </div>
    )
}
