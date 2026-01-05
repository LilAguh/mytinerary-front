import "../../styles/PrintCity.css"
import { Link as LinkRouter } from 'react-router-dom'

export default function City(props) {
    let cities = props.data

    return (
        <>
            <div className="cityContainerCard">
                <LinkRouter className="PrintCity-link" to={`/city/${cities._id}`} >
                    <div className="cityCard">
                        <img className="cityImg" src={cities.photo} alt={cities.city} />
                        <div className="cardImgOverlay">
                            <h3>{cities.city}</h3>
                            <p className="">{cities.country}</p>
                            {/* <p className="">Population: {cities.population}</p> */}
                            <p className="">{cities.information}</p>
                        </div>
                    </div>
                </LinkRouter>
            </div>
        </>
    )
}
