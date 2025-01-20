import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAmount } from "../../interface";

const initialState: IAmount = {
  subTotal: 0,
  taxPercentage: 0.18,
  taxPrice: 0,
  grandTotal: 0,
};
export const handleAmount = createSlice({
  name: "handle-amount",
  initialState,
  reducers: {
    setSubTotal(state, action: PayloadAction<number>) {
      state.subTotal = action.payload;
    },
    setTaxPrice(state, action: PayloadAction<number>) {
      state.taxPrice = action.payload;
    },
    setGrandTotal(state, action: PayloadAction<number>) {
      state.grandTotal = action.payload;
    },
    resetAmounts(state) {
      state.subTotal = 0;
      state.taxPrice = 0;
      state.grandTotal = 0;
    },
  },
});
export default handleAmount.reducer;
export const { setSubTotal, setTaxPrice, setGrandTotal, resetAmounts } =
  handleAmount.actions;
