import React, { useEffect, useState } from "react"
import videoSrc from "../../Images/NHSVideo.mp4"
import "./HomeVideo.css"
import { useDispatch, useSelector } from "react-redux"
import { setReferralTypeStageStep } from "../ReferralTypeSlice"
import { setConfigurations } from "../SharedStringsSlice"
import { getMasterData } from "../../Services/api"

const HomeVideo = () => {
    const dispatch = useDispatch()
    const currentStep = useSelector(state => state.referralTypeStageStep)
    const configs = useSelector(state => state.sharedStrings.configurations)

    useEffect(() => {
        getMasterData("HomeContent")
              .then((data) => {
                dispatch(setConfigurations(data))
              })
    },[])
    const handleNext = () =>{
        dispatch(setReferralTypeStageStep(currentStep + 1))
    }

    return(
        <div>
            <div class="video-container">
                <div style={{marginTop: "100px"}}>
                    <div style={{textAlign: "right"}}><img src={configs.imageDataUri} style={{width:"100px",borderRadius:"100px",border:"2px solid #444"}}/></div>
                    <div style={{marginTop: "20px"}} dangerouslySetInnerHTML={{ __html: configs.value }}></div>
                </div>
                {/*<video controls>
                    <source src={videoSrc} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>*/}<br/>
                <button onClick={handleNext} class="rightbtn">Skip {'>'}{'>'}</button>
            </div>
        </div>
    )
}

export default HomeVideo