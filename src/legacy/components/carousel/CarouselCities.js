import Carousel from "./Carousel"
import { useGetAllCitiesQuery } from '../../features/citiesApi'


export default function CarouselCities() {

  const initialCity = 0
  const endCity = 12

  const { data: cities, isLoading } = useGetAllCitiesQuery([])

  if(isLoading){
    return(
      <div className="Cities-Loader">
        <span className="loader"></span>
      </div>
    )
  }
  
  return (
    <div>
      <Carousel data={cities?.slice(initialCity, endCity)} range={4} interval={5} slides={3} />
    </div>
  )
}
