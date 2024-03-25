import React from "react";
import { Link } from "react-router-dom";

const ButtonLink = ({ href, text, className }) => {
    return (
        <Link to={href} className={className}>{text} </Link>
    );
};

export default ButtonLink