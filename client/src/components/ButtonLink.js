import React from "react";

const ButtonLink = ({ href, text, className }) => {
    return (
        <a href={href} className={className}>{text} </a>
    );
};

export default ButtonLink