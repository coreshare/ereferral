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
/*
    useEffect(() => {
        getMasterData("HomeContent")
              .then((data) => {
                dispatch(setConfigurations(data))
              })
    },[])*/
    const handleNext = () =>{
        dispatch(setReferralTypeStageStep(currentStep + 1))
    }

    return(
        <div>
            <div class="video-container">
                <div style={{marginTop: "100px", background: "#fff", borderRadius: "10px", padding: "30px"}}>
                        <div style={{display: "inline-block",width:"100%"}}>
                            <span style={{float:"left",fontSize:"32px",color: "#005cbb", fontWeight: "600"}}>Welcome to the Patient eReferral Portal</span>
                            <img src={configs.imageDataUri} style={{width:"100px",borderRadius:"100px",border:"2px solid #444", float: "right"}}/>
                        </div>
                    <div style={{marginTop: "20px",lineHeight:"1.5"}} dangerouslySetInnerHTML={{ __html: configs.value }}></div>
                </div>
                {/*<video controls>
                    <source src={videoSrc} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>*/}<br/>
                <button onClick={handleNext} class="rightbtn">Skip</button>
            </div>
        </div>
    )
}

export default HomeVideo