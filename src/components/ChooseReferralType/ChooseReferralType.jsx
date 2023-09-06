import React from "react";
import Breast from "../../Images/Breast.png";
import Lung from "../../Images/Lung.png";
import "./ChooseReferralType.css"
import { useDispatch, useSelector } from "react-redux";
import { setReferralType } from "./ChooseReferralTypeSlice";
import { updateDetails } from "../DetailsSlice";
import { setReferralTypeStageStep } from "../ReferralTypeSlice";
import { setStage } from "../ChooseStages/StagesSlice";

const transparentPixel =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/5+AAwAB/4DaaNvTAAAAAElFTkSuQmCC";

const imageNames = ["Breast", "Lung", "", "", "", "", "", "", "", "", "", "", "", ""];

const ChooseReferralType = () => {
  const imageUrls = [Breast, Lung, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel];
  const dispatch = useDispatch();
  const currentStep = useSelector(state => state.referralTypeStageStep)
  const selectedReferralType = useSelector(state => state.referralType)
  
  const handleImageClick = (e) => {
    if(e.target.title != ""){
      dispatch(setReferralType(e.target.title));
      let title = "ReferralType"
      let value = e.target.title
      dispatch(updateDetails({title, value}));
      dispatch(setReferralTypeStageStep(currentStep + 1))
      
      if(e.target.title != selectedReferralType){
        dispatch(setStage(null))//add confirmation
      }
    }
    else
    {
      alert("This Referral Type not configured.")
    }
  };

  return (
    <div>
        <div className="image-container">
            <div className="image-header">Please choose a referral type</div>
            <div className="image-gallery">
                {imageUrls.map((imageUrl, index) => (
                    <a
                        key={index}
                        href="javascript:void(0)"
                        className="image-tile-link"
                        onClick={(event) => handleImageClick(event, imageUrl)}
                        title={imageNames[index]}
                        >
                        <div key={index} className="image-tile" title={imageNames[index]}>
                            <img src={imageUrl} alt={`Image ${index}`} title={imageNames[index]}/>
                            <div className="image-name" title={imageNames[index]}>{imageNames[index]}</div>
                        </div>
                    </a>
                ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseReferralType;
