import '../styles/SingInForm.css'
import { useState } from 'react'
import { usePostUserSingInMutation, useSignInTokenMutation } from '../features/userApi'
import checkIcon from '../assets/icons/check.png'
import errorIcon from '../assets/icons/exclamation.png'
import toast, { Toaster } from 'react-hot-toast';

export default function SingInForm() {
  const [userLogin] = usePostUserSingInMutation()
  const [signInToken] = useSignInTokenMutation()

  const [login, setLogin] = useState({
    mail: "",
    password: "",
    form: "form",
    role: ""
  })

  const captureData = (event) => {
    const { name, value } = event.target
    setLogin({ ...login, [name]: value })
  }

  const saveData = (event) => {
    event.preventDefault()

    const userData = {
      mail: login.mail,
      password: login.password,
      form: login.form,
      role: login.role
    }
    userLogin(userData)
      .then(Response => {
        if (Response.data?.success === true) {
          toast.success("you have successfully logged in")

          let ls = localStorage.setItem('token', Response.data.response.token)
          signInToken(ls)
          window.location.replace('/')
        }
        else {
          toast.error("wrong email or password")
        }
      })

    event.target.reset()
  }


  return (
    <div className='SingInForm-container'>
      <form onSubmit={saveData} className='SingInForm-form'>
        <input onChange={captureData} name='mail' className='SingInForm-input' placeholder='Email' type='text' required />
        <input onChange={captureData} name='password' className='SingInForm-input' placeholder='Password' type='password' required />
        <button className='SingInFor-btn'>Sing In</button>
        <Toaster />
      </form>
    </div>
  )
}
