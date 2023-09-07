import React from "react"
import { useDispatch } from "react-redux"
import { setReferralTypeStageStep } from "../ReferralTypeSlice"
import { setAppStep } from "../AppSlice"

const SuccessView = () => {
    const dispatch = useDispatch()

    const handleAddReferral = () => {
        dispatch(setAppStep(1))
        dispatch(setReferralTypeStageStep(1))
    }

    return(
        <div style={{textAlign:"center"}}>
            Your referral has been submitted successfully.<br/><br/>
            <button className="buttonCtrl" style={{float:'none'}} onClick={handleAddReferral}>Add another referral</button>
        </div>
    )
}

export default SuccessView