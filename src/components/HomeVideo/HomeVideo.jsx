import React from "react"
import videoSrc from "../../Images/NHSVideo.mp4"
import "./HomeVideo.css"

const HomeVideo = ({onNext}) => {

    const handleNext = () =>{
        onNext();
    }

    return(
        <div>
            <div class="video-container">
                <video controls>
                    <source src={videoSrc} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video><br/>
                <button onClick={handleNext} class="rightbtn">Skip {'>'}{'>'}</button>
            </div>
        </div>
    )
}

export default HomeVideo