import {Link as LinkRouter} from 'react-router-dom'
import '../styles/CalltoAction.css'


export default function CalltoAction(props) {
    return (
        <div className='CalltoAction-container'>
            <img className='CalltoAction-img' src='https://i.ibb.co/rFGjXXy/travel-53.png' alt='plane'/>
            <div>
                <LinkRouter to={props.linkTo} className='CalltoAction-similbtn'>{props.btntext}</LinkRouter>
            </div>
            <p className='CallltoAction-phrase'>Once a year travel to a place you've never been before</p>
        </div>
    )
  }