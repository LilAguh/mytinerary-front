import '../styles/Footer.css'
import { Link as LinkRouter } from 'react-router-dom'
import { useState, useEffect } from 'react'


export default function Footer() {

  const [year, setYear] = useState(null)

  useEffect(() => {
    let today = new Date()
    let year = today.getFullYear()
    setYear(year)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  return (
    <footer className='Footer-container'>
      <div className='Footer-web'>
        <p>Our social networks</p>
        <div className='Footer-redes'>
          <a rel='noopener noreferrer' href="https://www.facebook.com/" target="_blank" className='Footer-link'><img className='Footer-icon' src="https://i.ibb.co/SN2Wsgx/facebook.png" alt='facebook' /></a>
          <a rel='noopener noreferrer' href="https://www.instagram.com/" target="_blank" className='Footer-link'><img className='Footer-icon' src="https://i.ibb.co/7ghYMbs/instagram.png" alt='instagram' /></a>
          <a rel='noopener noreferrer' href="https://web.telegram.org/" target="_blank" className='Footer-link'><img className='Footer-icon' src="https://i.ibb.co/X7X4Xyx/telegram.png" alt='telegram' /></a>
        </div>
      </div>
      <div className='Footer-copyright'>
        <p>  Mytinerary | © {year}</p>
      </div>
      <div className='Footer-box'>
        <div className='Footer-nav'>
          <LinkRouter className="Footer-navLink" to="/cities">Cities</LinkRouter>
          <LinkRouter className="Footer-navLink" to="/newcity">New City</LinkRouter>
        </div>
        <button onClick={scrollToTop} className="Footer-scroll">
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" /></svg>
        </button>
      </div>

    </footer>
  )
}
