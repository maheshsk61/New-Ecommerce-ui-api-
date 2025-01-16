import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHandleButtons, IProductsData } from "../../interface";
const initialState: IHandleButtons = {
  count: 0,
  cartItems: [],
  isDisabled: false,
  buyNow: [],
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
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      }
    },
    setCartItems(state, action: PayloadAction<IProductsData>) {
      state.cartItems = [...state.cartItems, action.payload];
      //console.log(`cart ${JSON.stringify(state.cartItems)}`);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setCartItemsFromLocalStorage(
      state,
      action: PayloadAction<IProductsData[]>
    ) {
      state.cartItems = action.payload;
    },
    setBuyNow(state, action: PayloadAction<IProductsData[]>) {
      state.buyNow = [...state.buyNow, ...action.payload];
      //console.log(`state.buyNow ${JSON.stringify(state.buyNow)}`)
      localStorage.setItem("buyNow", JSON.stringify(state.buyNow));
    },
    setBuyNowFromLocalStoage(state, action: PayloadAction<IProductsData[]>) {
      state.buyNow = action.payload;
    },
    setIsDisabled(state, action: PayloadAction<boolean>) {
      state.isDisabled = action.payload;
      //console.log(state.isDisabled);
    },
    setRemoveFromBuyNow(state, action: PayloadAction<number>) {
      const productIndex = state.buyNow.findIndex((product) => {
        //console.log(product.id, action.payload);
        return product.id === action.payload;
      });
      //console.log(productIndex);
      if (productIndex !== -1) {
        state.isDisabled = true;
        state.buyNow.splice(productIndex, 1);
        localStorage.setItem("buyNow", JSON.stringify(state.buyNow));
      }
      // state.buyNow = action.payload;
      // console.log(state.buyNow)
    },
  },
});
export default handleButtonsSlice.reducer;
export const {
  setAddToCart,
  setRemoveFromCart,
  setCartItems,
  setBuyNow,
  setRemoveFromBuyNow,
  setIsDisabled,
  setBuyNowFromLocalStoage,
  setCartItemsFromLocalStorage,
} = handleButtonsSlice.actions;
