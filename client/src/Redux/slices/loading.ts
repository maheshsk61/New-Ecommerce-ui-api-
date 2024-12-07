import { createSlice } from "@reduxjs/toolkit";
import { ILoading } from "../../interface";
const initialState: ILoading = {
  loading: true,
};
const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
      //console.log(state.loading);
    },
  },
});
export default loadingSlice.reducer;
export const { setLoading } = loadingSlice.actions;
