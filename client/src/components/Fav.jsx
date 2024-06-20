import React from "react";
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate } from 'react-router-dom';
import './Fav.css'

const Fav = ({ id }) => {
    const { isAuthenticated, addFav, deleteFav, favsInfo } = useAuth()
    const navigate = useNavigate()
    const isFaved = favsInfo?.some(fav => fav.id === id)

    const handleClick = () => {
        if (!isAuthenticated) {
            return navigate("/login")
        }
        if (isFaved) {
            deleteFav({ city_id: parseInt(id, 10) });
        } else {
            addFav({ city_id: parseInt(id, 10) });
        }
    }

    const [label, emoji] = isFaved ? ['Remove city from favorites', '💔'] : ['Add city to favorites', '❤️']


    return <button onClick={handleClick} className="fav-button">
        <span aria-label={label} role="img"> {emoji} </span>
    </button>;
};

export default Fav;
