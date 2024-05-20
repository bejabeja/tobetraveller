import React from "react";
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate } from 'react-router-dom';
import './Fav.css'

const Fav = ({ id }) => {
    const { isAuthenticated, addFav } = useAuth()
    const navigate = useNavigate()

    const handleClick = () => {
        if (!isAuthenticated) {
            return navigate("/login")
        }
        addFav({ city_id: parseInt(id, 10) })
    }

    return <button onClick={handleClick} className="fav-button">
        <span aria-label="Fav city" role="img"> ❤️ </span>
    </button>;
};

export default Fav;
