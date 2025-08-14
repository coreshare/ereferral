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
    const [testvar, setTestVar] = useState(1);

    useEffect(() => {
        setTestVar(2);
        getMasterData("HomeContent")
              .then((data) => {setTestVar(3);
                dispatch(setConfigurations(data))
              })
    },[])
    const handleNext = () =>{
        dispatch(setReferralTypeStageStep(currentStep + 1))
    }

    return(
        <div>
            <div class="video-container"><span>{testvar}</span>
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