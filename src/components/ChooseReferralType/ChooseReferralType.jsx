import React from "react";
import Breast from "../../Images/Breast.png";
import Lung from "../../Images/Lung.png";
import "./ChooseReferralType.css"

const transparentPixel =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/5+AAwAB/4DaaNvTAAAAAElFTkSuQmCC";

const imageNames = ["Breast", "Lung", "", "", "", "", "", "", "", "", "", "", "", ""];


const ChooseReferralType = ({ onNext, getReferralType }) => {
  const imageUrls = [Breast, Lung, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel];

  const handleImageClick = (e) => {
    if(e.target.title != ""){
      getReferralType(e.target.title);
      onNext();
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
