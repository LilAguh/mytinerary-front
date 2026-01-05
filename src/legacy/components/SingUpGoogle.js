import * as jose from 'jose'
import { useEffect, useRef, useState } from 'react'
import { usePostUserMutation } from '../features/userApi'
import Alert from './alerts/Alert'
import checkIcon from '../assets/icons/check.png'
import warningIcon from '../assets/icons/warning.png'

export default function SingUpGoogle() {

  let [newUser] = usePostUserMutation()

  const buttonDiv = useRef(null)

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


  async function handleCredentialResponse(response) {
    let userObject = jose.decodeJwt(response.credential)

    const data = {
      name: userObject.given_name,
      lastName: userObject.family_name,
      mail: userObject.email,
      password: userObject.sub,
      photo: userObject.picture,
      country: 'Argentina',
      role: 'user',
      from: 'google'
    }

    newUser(data)
      .then(response => {
        if (response.data.success === true) {
          showAlert('success')
          window.location.replace('/singin')
        }
        else {
          showAlert('warning')
          window.location.replace('/singin')
        }
      })

  }


  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: '858987294668-ujt6gjb9nmuhec61k7kavpnmva2lunt5.apps.googleusercontent.com',
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
