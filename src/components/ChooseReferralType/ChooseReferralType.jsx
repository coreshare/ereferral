import React, { useEffect } from "react";
import Breast from "../../Images/Breast.png";
import Lung from "../../Images/Lung.png";
import "./ChooseReferralType.css"
import { useDispatch, useSelector } from "react-redux";
import { setReferralType } from "./ChooseReferralTypeSlice";
import { resetDetails, updateDetails } from "../DetailsSlice";
import { setReferralTypeStageStep } from "../ReferralTypeSlice";
import { setStage } from "../ChooseStages/StagesSlice";
import { resetReports } from "../Reports/ReportsSlice";
import { getMasterData } from "../../Services/api";
import { setClinicalOncologistList, setCommunicationRequirementList, setCovidList, setEthnicity, setMaritalStatuses, 
  setMedicalOncologistList, setNHSNumbers, setReferringOrgs, setRelationshiptoPatientList, setReligions, setSexOptionsList, setSpecialRequirementsList, 
  setSRGList, 
  setTargetCategoriesList, 
  setTitlesList} from "../MasterDataSlice";
import ModalDialog from "../ModalDialog/ModalDialog";

const transparentPixel =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/5+AAwAB/4DaaNvTAAAAAElFTkSuQmCC";

//const imageNames = ["Bladder", "Breast", "CNS", "Gynaecology", "Head & Neck", "HpB", "LEC", "Lower GI", "Lung", "MDS", "Prostate", "Renal", "Sarcoma", "Skin", "Testicular/Germ", "", "", ""];

const ChooseReferralType = () => {
  const imageUrls = [Breast, Lung, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel, transparentPixel];
  const dispatch = useDispatch();
  const currentStep = useSelector(state => state.referralTypeStageStep)
  const selectedReferralType = useSelector(state => state.referralType)
  const listData = useSelector(state => state.masterData)
  const referrerEmail = useSelector(state => state.sharedStrings.ReferrerEmail)

  const modalText = "Getting SRGs... Please wait.";
  //const imageNames = useSelector(state => state.SRGList)
  
  //Load master data asynchronously. 
  useEffect(() => {
    if(listData.Religions && listData.Religions.length == 0){
      fetchData("SRGList")
      fetchData("NHSNumbers")//checkonce
      fetchData("Religions")
      fetchData("MaritalStatuses")
      fetchData("Ethnicity")
      fetchData("MedicalOncologists")
      fetchData("ClinicalOncologists")
      fetchData("TargetCategories")
      fetchData("SpecialRequirements")
      fetchData("SexOptions")
      fetchData("RelationshiptoPatient")
      fetchData("Titles")
      fetchData("ReferringOrgs")
    }
  },[])

  const fetchData = (type_name) => {
    try{
    getMasterData(type_name)
      .then((data) => {
        switch (type_name) {
          case "NHSNumbers":
            dispatch(setNHSNumbers(data));
            break;
          case "Religions":
            dispatch(setReligions(data));
            break;
          case "Ethnicity":
            dispatch(setEthnicity(data));
            break;
          case "MaritalStatuses":
            dispatch(setMaritalStatuses(data));
            break;
          case "MedicalOncologists":
            dispatch(setMedicalOncologistList(data));
            break;
          case "ClinicalOncologists":
            dispatch(setClinicalOncologistList(data));
            break;
          case "TargetCategories":
            dispatch(setTargetCategoriesList(data));
            break;
          case "Covid":
            dispatch(setCovidList(data));
            break;
          case "SpecialRequirements":
            dispatch(setSpecialRequirementsList(data));
            break;
          case "CommunicationRequirement":
            dispatch(setCommunicationRequirementList(data));
            break;
          case "SexOptions":
            dispatch(setSexOptionsList(data));
            break;
          case "RelationshiptoPatient":
            dispatch(setRelationshiptoPatientList(data));
            break;
          case "Titles":
            dispatch(setTitlesList(data));
            break;
          case "ReferringOrgs":
            dispatch(setReferringOrgs(data));
            break;
          case "SRGList":
            dispatch(setSRGList(data));
            break;
          default:
            console.error(`Unsupported type_name: ${type_name}`);
        }
      })
    }
    catch (error) {
      if (error.message.includes('400')) {
        alert(error.message)
      } else if (error.message.includes('500')) {
        alert(error.message)
      } else {
        alert(error.message)
      }
    }
  };

  const handleSRGClick = (e) => {
    if(e.target.title != ""){
      dispatch(setReferralType(e.target.title));
      let title = "ReferralType"
      let value = e.target.title
      dispatch(resetDetails())
      dispatch(resetReports())
      dispatch(updateDetails({title, value}))
      title = "ReferrerEmail"
      value = referrerEmail
      dispatch(updateDetails({title, value}))
      dispatch(setReferralTypeStageStep(currentStep + 1))
      dispatch(setStage(null))
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
            {listData.SRGList && listData.SRGList.length > 0 // Check if the array exists and has items
                ? [...listData.SRGList]
                    .sort((a, b) => a.title.localeCompare(b.title))
                    .map((imageName, index) => (
                        <a key={index}
                            href="javascript:void(0)"
                            className="image-tile image-tile-link"
                            onClick={(event) => handleSRGClick(event, imageUrls[index])}
                            title={imageName.title}>
                            <div className="image-name" title={imageName.title}>
                                {imageName.title}
                            </div>
                        </a>
                    ))
                : <div>No items to display</div> // Optional: Display a message if no items
            }
        </div>
          {listData.SRGList.length == 0 && 
          <ModalDialog isOpen={true} showCloseButton={false} isConfirmation={false}>
              {modalText}
          </ModalDialog>}
      </div>
    </div>
  );
};

export default ChooseReferralType;
