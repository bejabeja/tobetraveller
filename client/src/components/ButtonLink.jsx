import React from "react";
import { Link } from "react-router-dom";

const ButtonLink = ({ href, text, className, onClick }) => {
    return (
        <Link to={href} className={className} onClick={onClick}>{text} </Link>
    );
};

export default ButtonLink