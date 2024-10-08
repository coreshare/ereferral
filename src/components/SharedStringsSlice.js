import { createSlice } from "@reduxjs/toolkit";

const sharedStringsSlice = createSlice({
    name: "sharedStrings",
    initialState: {
        leftNavClearLinkText: "Patient",
        ReferrerEmail: "",
        enablePatientMandatory: false,
        enableNOKMandatory: false,
        enableReferMandatory: false,
        enableTTCMandatory: false,
        pdsAPICallsCount: 0
    },
    reducers: {
        setLeftNavClearLinkText: (state, action) => {
            state.leftNavClearLinkText = action.payload;
        },
        setReferrerEmail: (state, action) => {
            state.ReferrerEmail = action.payload;
        },
        setPatientMandatory: (state, action) => {
            state.enablePatientMandatory = action.payload;
        },
        setNOKMandatory: (state, action) => {
            state.enableNOKMandatory = action.payload;
        },
        setReferMandatory: (state, action) => {
            state.enableReferMandatory = action.payload;
        },
        setTTCMandatory: (state, action) => {
            state.enableTTCMandatory = action.payload;
        },
        setPDSAPICallsCount: (state, action) => {
            state.pdsAPICallsCount = action.payload;
        },
        resetMandatory: (state) => {
            state.enablePatientMandatory = false
            state.enableNOKMandatory = false
            state.enableReferMandatory = false
            state.enableTTCMandatory = false
        }
    },
});  

export const { setLeftNavClearLinkText, setReferrerEmail, setPatientMandatory, setNOKMandatory,
    setReferMandatory, setTTCMandatory, resetMandatory, setPDSAPICallsCount } = sharedStringsSlice.actions;
export default sharedStringsSlice.reducer;
