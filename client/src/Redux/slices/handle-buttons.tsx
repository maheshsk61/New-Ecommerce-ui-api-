import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHandleButtons, IProductsData } from "../../interface";
const initialState: IHandleButtons = {
  count: 0,
  cartItems: [],
};
export const handleButtonsSlice = createSlice({
  name: "handle-buttons",
  initialState,
  reducers: {
    setAddToCart(state) {
      state.count = state.count + 1;
    },
    setRemoveFromCart(state, action: PayloadAction<number>) {
      state.count = state.count - 1;
      //console.log(`state.count ${state.count}`);
      const productIndex = state.cartItems.findIndex(
        (product) => product.id === action.payload
      );
      //console.log(`productIndex ${productIndex}`);
      if (productIndex !== -1) {
        state.cartItems.splice(productIndex, 1);
      }
    },
    setCartItems(state, action: PayloadAction<IProductsData>) {
      state.cartItems = [...state.cartItems, action.payload];
      //console.log(`cart ${JSON.stringify(state.cartItems)}`);
    },
  },
});
export default handleButtonsSlice.reducer;
export const { setAddToCart, setRemoveFromCart, setCartItems } =
  handleButtonsSlice.actions;
