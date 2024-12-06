import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, IProductList } from "../../interface";

const initialState: IProductList = {
  list: [],
  length: 0,
  loading: true,
};
export const productListsSlice = createSlice({
  name: "Product-lists",
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<IProduct[]>) => {
      state.list = action.payload;
      state.length = action.payload.length;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});
export default productListsSlice.reducer;
export const { setList,setLoading } = productListsSlice.actions;
