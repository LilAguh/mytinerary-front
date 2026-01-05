import { Link as LinkRouter } from "react-router-dom";
import "../styles/Header.css";
import acceso from "../img/acceso.png";
import logo3 from "../img/logo3.png";
import lista from "../img/lista.png";
import { useState } from "react";
import { usePostUserSingOutMutation } from "../features/userApi";
import { useSelector } from 'react-redux';


export default function Header() {

  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [singOut] = usePostUserSingOutMutation()


  const toggleMenu = () => {
    setMenu(!menu);
  };
  const link = (page) => (
    <li onClick={toggleMenu}>
      <LinkRouter className="Header-link" to={page.to}>{page.name}</LinkRouter>
    </li>
  );

  const HandleOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);

    }
  };

  let user = useSelector(state => state.userr)

  const userlogged = (logged) => {
    if (!logged) {
      return (
        <div>
          <div className="Header-menu">
            {open ? (
              <ul className="Header-profileMenu">
                <LinkRouter to="/singup"><li className="Header-li" onClick={HandleOpen}>Sign up</li></LinkRouter>

                <LinkRouter to="/singin"><li className="Header-li" onClick={HandleOpen}>Sign in</li></LinkRouter>
              </ul>
            ) : null}
          </div>
          <button className="Header-button" onClick={HandleOpen}>
            <img className="Header-login" src={acceso} alt="acceso" />
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <div className="Header-menu">
            {open && user.role === 'admin' ? (
              <ul className="Header-profileMenu">
                <LinkRouter to={'/myprofile'}> <li className="Header-li" onClick={HandleOpen}>My Profile</li> </LinkRouter>
                <LinkRouter to={'/mytineraries'}> <li className="Header-li" onClick={HandleOpen}>My Tineraries</li> </LinkRouter>
                <LinkRouter to={'/newadmin'}> <li className="Header-li" onClick={HandleOpen}>New Admin</li> </LinkRouter>
                <LinkRouter to={'/newcity'}> <li className="Header-li" onClick={HandleOpen}>New City</li> </LinkRouter>
                <button onClick={clearlocal} className="Header-signOut">
                  <li className="Header-li" onClick={HandleOpen}>Sign Out</li>
                </button>
              </ul>
            ) : open && user.role === 'user' ? (
              <ul className="Header-profileMenu">
                <LinkRouter to={'/myprofile'}> <li className="Header-li" onClick={HandleOpen}>My Profile</li> </LinkRouter>
                <LinkRouter to={'/mytineraries'}> <li className="Header-li" onClick={HandleOpen}>My Tineraries</li> </LinkRouter>
                <button onClick={clearlocal} className="Header-signOut">
                  <li className="Header-li" onClick={HandleOpen}>Sign Out</li>
                </button>
              </ul>
            ) : null}
          </div>
          <button className="Header-button" onClick={HandleOpen}>
            <img className="Header-loginphoto" src={user.photo} alt="acceso" />
            <p>{user.name}</p>
          </button>
        </div>
      );
    }
  };

  const clearlocal = () => {
    singOut(user.mail)
    localStorage.removeItem("token");
    window.location.reload(true)
  };

  return (
    <header className={`${menu ? "HeaderisActive" : ""} `}>

      <LinkRouter to="/"><img className="Header-logo" src={logo3} alt="logo" /></LinkRouter>

      <div className="Header-NavContainer">
        <nav className={`Header-nav ${menu ? "isActive" : ""} `}>
          <div className="Header-Backgound">&nbsp;</div>
          <ul className="Header-LinksContainer">
            <LinkRouter className="Header-link" to="/">Home</LinkRouter>
            <LinkRouter className="Header-link" to="/cities">Cities</LinkRouter>
          </ul>
        </nav>
        {userlogged(user.logged)}
        <button className="Header-NavMenuButton" onClick={toggleMenu}>
          <img className="Header-NavMenuIcon" src={lista} alt="logo" />
        </button>
      </div>
    </header>
  );
}
