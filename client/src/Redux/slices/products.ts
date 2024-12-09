import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProducts, IProductsData } from "./../../interface";
const initialState: IProducts = {
  products: [],
  clickedProduct: [],
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProductsData[]>) => {
      state.products = action.payload;
      //console.log(state.products)
    },
    setClickedProduct: (state, action: PayloadAction<IProductsData[]>) => {
      state.clickedProduct = action.payload;
      //console.log(state.clickedProduct)
    },
  },
});
export default productsSlice.reducer;
export const { setProducts, setClickedProduct } = productsSlice.actions;
