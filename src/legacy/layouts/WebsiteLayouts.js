import Footer from "../components/Footer"
import Header from "../components/Header"
import '../styles/WebsiteLayouts.css'

export default function WebsiteLayouts(props) {

  return (
    <>
      <Header />
      <main>
        {props.children}
      </main>
      <Footer />
    </>
  )
}
