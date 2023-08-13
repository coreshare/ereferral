import React from "react";
import './Home.css';

const Home = ({onNext}) =>{

    const handleNext = () =>{
        onNext();
    }

    return(
        <div className="container home-container">
            <h1 className="home-title">Welcome to E-Referral</h1>
            <button className="home-button" onClick={handleNext}>Enter</button>
        </div>
    )
}
export default Home