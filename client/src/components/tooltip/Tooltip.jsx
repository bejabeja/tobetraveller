import React from "react";
import './Tooltip.css'

const Tooltip = ({ tooltipText }) => {
    return (<div className="tooltip">
        <span className="tooltip-icon"><i className="fas fa-exclamation-circle"></i></span>
        <span className="tooltip-text">{tooltipText}</span>
    </div>)
}

export default Tooltip;
