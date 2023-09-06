// rootReducer.js

import { combineReducers } from "@reduxjs/toolkit";
import referralTypeReducer from "./ChooseReferralType/ChooseReferralTypeSlice";
import stagesReducer from "./ChooseStages/StagesSlice";
import detailsReducer from "./DetailsSlice"
import reportsReducer from "./Reports/ReportsSlice"
import appReducer from "./AppSlice"
import referralTypeStageReducer from "./ReferralTypeSlice"
import referralSubmissionReducer from "./ReferralSubmissionSlice"

const rootReducer = combineReducers({
  referralType: referralTypeReducer,
  stage: stagesReducer,
  details: detailsReducer,
  reports: reportsReducer,
  appStep: appReducer,
  referralTypeStageStep: referralTypeStageReducer,
  referralSubmissionStep: referralSubmissionReducer
});

export default rootReducer;
