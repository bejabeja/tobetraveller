import React from "react";
import './SpinnerLoader.css'
import spinnerImg from '../../logos/loaderSpinner.gif'



const SpinnerLoader = () => {
    return <div className="spinner-loader-container">
        <div className="spinner-loader">
            <img src={spinnerImg} alt="Loading..." />
            <p>LOADING...</p>
        </div>
    </div>
}

export default SpinnerLoader;
