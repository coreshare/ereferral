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
    resetReports: () => {
      return {
        files: [],
        reportsList: [],
        mandatoryReportsList: []
      };
    },
    resetFiles: (state) => {
      state.files = [];
    }
  },
});

export const { updateFiles, updateReportsList, updateMandatoryReportsList, resetReports, resetFiles } = reportsSlice.actions;
export default reportsSlice.reducer;