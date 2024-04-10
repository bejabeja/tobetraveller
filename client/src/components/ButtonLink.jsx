import React from "react";
import { Link } from "react-router-dom";

const ButtonLink = ({ href, text, className, onClick, children }) => {
    return (
        <Link to={href} className={className} onClick={onClick}>{text}{children} </Link>
    );
};

export default ButtonLink