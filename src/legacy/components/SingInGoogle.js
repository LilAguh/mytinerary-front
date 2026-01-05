import * as jose from 'jose'
import { useEffect, useRef, useState } from 'react'
import { usePostUserSingInMutation, useSignInTokenMutation } from '../features/userApi'
import Alert from './alerts/Alert'
import checkIcon from '../assets/icons/check.png'
import errorIcon from '../assets/icons/exclamation.png'

export default function SingInGoogle() {

  const [user, setUser] = useState(0)

  const [list, setList] = useState([])
  let toastProperties = null

  const showAlert = type => {
    switch (type) {
      case 'success':
        toastProperties = {
          id: list.length + 1,
          title: 'Welcome',
          description: 'Successful SignIn',
          backgroundColor: '#5cb85c',
          icon: checkIcon
        }
        break;
      case 'error':
        toastProperties = {
          id: list.length + 1,
          title: 'Error',
          description: 'Wrong email or password',
          backgroundColor: '#d9534f',
          icon: errorIcon
        }
        break;
      default:
        toastProperties = [];
    }
    setList([...list, toastProperties])
  }

  // Mutation
  let [newUser] = usePostUserSingInMutation()
  let [signInToken] = useSignInTokenMutation()

  const buttonDiv = useRef(null)

  async function handleCredentialResponse(response) {
    let userObject = jose.decodeJwt(response.credential)

    const data = {
      mail: userObject.email,
      password: userObject.sub,
      from: 'google',
      id: userObject._id,
      role: userObject.role
    }

    newUser(data)
      .then(response => {
        if (response.data.success === true) {
          showAlert('success')
          let ls = localStorage.setItem('token', response.data.response.token)
          signInToken(ls)
          // .then(response => console.log(response))

          window.location.replace('/')
        }
        else {
          showAlert('error')
        }
      })
  }


  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: '303385633677-lof63srqjvlnlu87omsefc567ig7c2rg.apps.googleusercontent.com',
      callback: handleCredentialResponse,
      context: 'signup'
    });
    google.accounts.id.renderButton(
      buttonDiv.current,
      { theme: "filled_blue", size: "mediun", text: 'singup_with', shape: "circle", type: "standard" }  // customization attributes
    );
  }, [])


  return (
    <>
      <Alert toastlist={list} setList={setList} />
      <div ref={buttonDiv}></div>
    </>
  )
}
