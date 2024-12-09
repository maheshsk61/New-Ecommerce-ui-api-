import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { isOpen: boolean; imageToOpen: string } = {
  isOpen: false,
  imageToOpen: "",
};
export const DialogSlice = createSlice({
  name: "dialog-box",
  initialState,
  reducers: {
    setIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    setImageToOpen(state, action: PayloadAction<string>) {
      state.imageToOpen = action.payload;
    },
  },
});
export default DialogSlice.reducer;
export const { setIsOpen, setImageToOpen } = DialogSlice.actions;
