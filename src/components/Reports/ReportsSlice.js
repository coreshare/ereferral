import { createSlice } from "@reduxjs/toolkit";

const reportsSlice = createSlice({
  name: "reports",
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
  },
});

export const { updateFiles, updateReportsList } = reportsSlice.actions;
export default reportsSlice.reducer;