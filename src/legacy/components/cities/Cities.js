import City from "./City"
import { useState, useRef } from "react"
import '../../styles/Allcity.css'
import { useGetAllCitiesQuery } from '../../features/citiesApi'

export default function Allcity() {

  const searchInput = useRef()
  const [value, setValue] = useState("")
  const searchValue = () => {
    setValue(searchInput.current.value)
  }

  const { data: cities, isLoading } = useGetAllCitiesQuery(value)

  if(isLoading){
    return(
      <div className="Cities-Loader">
        <span className="loader"></span>
      </div>
    )
  }

  return (
    <>
      <div className="Allcity-container">
        <div className="Allcity-divInput">
          <input className="Allcity-input" name="text" type="text" placeholder="Find city" ref={searchInput} onChange={searchValue} />
        </div>
        <div className="Allcity-Printcity">
          {cities?.map(cities => <City key={cities.city} name={cities.city} data={cities} />)}
        </div>
      </div>
    </>
  )
}
