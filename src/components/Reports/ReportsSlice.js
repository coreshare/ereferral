import { createSlice } from "@reduxjs/toolkit";

const reportsSlice = createSlice({
  name: "reports",
  initialState: {
    files: [],
    reportsList: [],
    mandatoryReportsList: []
  },
  reducers: {
    updateFiles: (state, action) => {
      state.files = action.payload;
    },
    updateReportsList: (state, action) => {
      state.reportsList = action.payload;
    },
    updateMandatoryReportsList: (state, action) => {
      state.mandatoryReportsList = action.payload;
    },
    resetReports: (state) => {
      return {
        files: [],
        reportsList: [],
        mandatoryReportsList: []
      }; // Reset the state to its initial value
    },
  },
});

export const { updateFiles, updateReportsList, updateMandatoryReportsList, resetReports } = reportsSlice.actions;
export default reportsSlice.reducer;