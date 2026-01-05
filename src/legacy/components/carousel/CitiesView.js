import "../../styles/Carousel.css"
import { Link as LinkRouter } from 'react-router-dom'


export default function citiesView(props) {

    const cities = props.data

    return (
        <div className="Carousel-cities">
            <LinkRouter to={`/city/${cities._id}`} >
                <div className="Carousel-box">
                    <img className="Carousel-img" src={cities.photo} alt={cities.city} />
                </div>
                <p className="Carousel-citiesName">{cities.city}</p>
            </LinkRouter>
        </div>
    )
}
