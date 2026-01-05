import './App.css';
// Import of pages
import Home from './pages/Home';
import Cities from './pages/Cities';
import UnderConstruction from './pages/UnderConstruction';
import NewCity from './pages/NewCity';
import WebsiteLayouts from './layouts/WebsiteLayouts';
import ScrollToTop from './components/ScrollToTop';
import EditCity from './pages/EditCity';
import City from './pages/City'
import MyTineraries from './pages/MyTineraries'
import Singup from './pages/Singup';
import SingIn from './pages/SingIn';
import EditInerary from './pages/EditInerary';
import NewAdmin from './pages/NewAdmin';
import UserAdmin from './pages/UserAdmin';
import MyProfile from './pages/MyProfile';
import NewItinerary from './pages/NewItinerary';
// Import of hook 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { setCredentials, deleteCredentials } from './features/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useSignInTokenMutation } from './features/userApi';


function App() {
  // all new with redux
  const dispatch = useDispatch()

  const [signInToken] = useSignInTokenMutation()

  const user = useSelector(state => state.userr)
  const logged = useSelector(state => state.userr.logged)


  useEffect(() => {
    if (localStorage.getItem('token')) {
      verifyToken()
    }
  }, [])

  const verifyToken = async () => {
    try {
      await signInToken()
        .then(response => {
          if (response.data.succes)
            dispatch(setCredentials(response.data.response.user))
          else {
            dispatch(deleteCredentials())
            localStorage.removeItem('token')
          }
        })
    } catch (error) {
      console.log(error)
      dispatch(deleteCredentials())
      localStorage.removeItem('token')
    }
  }



  return (
    <BrowserRouter>
      <ScrollToTop />
      <WebsiteLayouts>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/singup' element={logged ? <Home /> : <Singup />} />
          <Route path='/singin' element={logged ? <Home /> : <SingIn />} />
          <Route path='/newadmin' element={logged && user.role === 'admin' ? <NewAdmin /> : <Home />} />
          <Route path='/itineraries/:id' element={<EditInerary />} />
          {/* <Route path='' element={<UnderConstruction />} */}
          <Route path='/cities' element={<Cities />} />
          <Route path='/city/:id' element={<City />} />
          <Route path='/newcity' element={logged && user.role === 'admin' ? <NewCity /> : <UserAdmin />} />
          <Route path='/editcity/:id' element={logged && user.role === 'admin' ? <EditCity /> : <UserAdmin />} />
          <Route path='/mytineraries' element={logged ? <MyTineraries /> : <Singup />} />
          <Route path='/newitinerary/:id' element={logged ? <NewItinerary /> : <Singup />} />
          <Route path='/myprofile' element={logged ? <MyProfile /> : <Singup />} />
        </Routes>
      </WebsiteLayouts>
    </BrowserRouter>
  );
}

export default App;



