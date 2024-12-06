import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISearchQuery } from "../../interface";
const initialState: ISearchQuery = {
  query: "",
};
export const searchQuerySlice = createSlice({
  name: "search-query",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});
export default searchQuerySlice.reducer;
export const { setSearchQuery } = searchQuerySlice.actions;
