import '../styles/Welcome.css'
import background from '../img/background.png';

export default function Welcome() {
  return (
    <div className="Welcome-conatiner">
      <img className='Welcome-background' src={background} alt='background' />
      <div className='Welcome-text'>
        <h1 className="Welcome-title">My Tinerary</h1>
        <p className='Welcome-slogan'>Find your perfect trip, designed by insiders who know and love their cities!</p>
      </div>
    </div>
  )
}
