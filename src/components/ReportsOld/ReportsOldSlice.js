import { createSlice } from "@reduxjs/toolkit";

const reportsOldSlice = createSlice({
  name: "reportsold",
  initialState: {
    files: [],
    reportsList: [],
  },
  reducers: {
    updateFiles: (state, action) => {
      state.files = action.payload;
    },
    updateReportsList: (state, action) => {
      state.reportsList = action.payload;
    },
    resetReports: (state) => {
      return {
        files: [],
        reportsList: [],
      }; // Reset the state to its initial value
    },
  },
});

export const { updateFiles, updateReportsList, resetReports } = reportsOldSlice.actions;
export default reportsOldSlice.reducer;