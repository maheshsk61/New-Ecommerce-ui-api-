import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHandleButtons, IProductsData } from "../../interface";
const initialState: IHandleButtons = {
  count: Number(localStorage.getItem("count")),
  cartItems: [],
  isDisabledForCredentials: false,
  buyNow: [],
};
export const handleButtonsSlice = createSlice({
  name: "handle-buttons",
  initialState,
  reducers: {
    setAddToCart(state) {
      state.count = state.count + 1;
      localStorage.setItem("count", state.count.toString());
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
        localStorage.setItem("count", state.count.toString());
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
    setIsDisabledForCredentials(state, action: PayloadAction<boolean>) {
      state.isDisabledForCredentials = action.payload;
      //console.log(state.isDisabled);
    },
    setRemoveFromBuyNow(state, action: PayloadAction<number>) {
      const productIndex = state.buyNow.findIndex((product) => {
        //console.log(product.id, action.payload);
        return product.id === action.payload;
      });
      //console.log(productIndex);
      if (productIndex !== -1) {
        //state.isDisabled = true;
        state.buyNow.splice(productIndex, 1);
        localStorage.setItem("buyNow", JSON.stringify(state.buyNow));
      }
      // state.buyNow = action.payload;
      // console.log(state.buyNow)
    },
    setShiftProductsFromCartToBuyNow(state) {
      if (state.buyNow.length > 0) {
        state.buyNow = [...state.buyNow, ...state.cartItems];
      } else {
        state.buyNow = [...state.cartItems];
      }
      state.cartItems = [];
      state.count = 0;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      localStorage.setItem("buyNow", JSON.stringify(state.buyNow));
      localStorage.setItem("count", state.count.toString());
    },
  },
});
export default handleButtonsSlice.reducer;
export const {
  setAddToCart,
  setRemoveFromCart,
  setCartItems,
  setBuyNow,
  setIsDisabledForCredentials,
  setRemoveFromBuyNow,
  setBuyNowFromLocalStoage,
  setCartItemsFromLocalStorage,
  setShiftProductsFromCartToBuyNow,
} = handleButtonsSlice.actions;
