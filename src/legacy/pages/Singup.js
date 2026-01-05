import SingUpGoogle from "../components/SingUpGoogle"
import SingUpInput from "../components/SingUpInput"

export default function singup() {

  return (
    <>
      <SingUpInput />
      <div className="Singup-google">
        <SingUpGoogle />
      </div>
    </>
  )
}