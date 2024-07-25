import React from "react";
import './SpinnerLoader.css'
import spinnerImg from '../../logos/spinnerWorld.gif'

const SpinnerLoader = () => {
    return <div className="spinner-loader-container">
        <div className="spinner-loader">
            <img src={spinnerImg} alt="Loading..." />
        </div>
    </div>
};

export default SpinnerLoader;
