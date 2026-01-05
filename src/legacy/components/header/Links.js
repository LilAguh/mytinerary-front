import "../../styles/Header.css";
import { Link as LinkRouter } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Links(props) {
    const page = props.data

    const [menu, setMenu] = useState(false);
    const toggleMenu = () => {
        setMenu(!menu);
    };
    return (
        <li onClick={toggleMenu}>
            <LinkRouter className="Header-link" to={page.to}>{page.name}</LinkRouter>
        </li>
    )
}