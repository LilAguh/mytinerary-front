import "../../styles/Carousel.css"
import Arrow from "./Arrow"
import { useEffect, useState } from "react"
import CitiesView from "./CitiesView"

export default function Carousel(props) {

    const range = props.range
    const cities = props.data
    const limitSlides = (props.slides * range)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(start + range)
    const [intervalId, setIntervalId] = useState(null)
    const interval = props.interval * 1000

    useEffect(() => {
        let id = setInterval(() => {
            next()
        }, interval)

        setIntervalId(id)

        return () => clearInterval(intervalId)
    }, [start])

    const previous = () => {
        if (start >= range) {
            setStart(start - range)
            setEnd(end - range)
        } else {
            setStart(limitSlides - range)
            setEnd(limitSlides)
        }
        clearInterval(intervalId)
    }

    const next = () => {
        if (end < limitSlides) {
            setStart(start + range)
            setEnd(end + range)
        } else {
            setStart(0)
            setEnd(range)
        }
        clearInterval(intervalId)
    }

    return (
        <>
            <div className="Carousel-h2">
                <h2>Popular MYtineraries</h2>
            </div>
            <div className="Caorusel">
                <Arrow icon={<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
                    <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
                </svg>} click={previous} />
                <div className="Carousel-container">
                    {cities?.slice(start, end).map(cities => <CitiesView key={cities.city} name={cities.city} data={cities} />)}
                </div>
                <Arrow icon={<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                    <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                </svg>} click={next} />
            </div>
        </>
    )
}


