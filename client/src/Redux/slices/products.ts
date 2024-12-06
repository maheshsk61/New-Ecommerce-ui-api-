import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProducts, IProductsData } from "./../../interface";
const initialState: IProducts = {
  products: [],
  loading: true
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProductsData[]>) => {
      state.products = action.payload;
    },
    setLoading: (state,action: PayloadAction<boolean>)=>{
        state.loading=action.payload
    }
  },
});
export default productsSlice.reducer;
export const { setProducts,setLoading } = productsSlice.actions;
