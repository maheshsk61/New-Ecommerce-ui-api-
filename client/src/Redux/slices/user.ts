import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  countryCode: "",
  mobileNumber: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFirstName(state, action: PayloadAction<string>) {
      state.firstName = action.payload;
    },
    setLastName(state, action: PayloadAction<string>) {
      state.lastName = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setGender(state, action: PayloadAction<string>) {
      state.gender = action.payload;
    },
    setCountryCode(state, action: PayloadAction<string>) {
      state.countryCode = action.payload;
    },
    setMobileNumber(state, action: PayloadAction<string>) {
      state.mobileNumber = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    // Optionally, you can also create a reset or clear method if needed
    resetUser(state) {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.gender = "";
      state.countryCode = "";
      state.mobileNumber = "";
      state.error= ""
    },
  },
});

export const {
  setFirstName,
  setLastName,
  setEmail,
  setGender,
  setCountryCode,
  setMobileNumber,
  resetUser,
  setError
} = userSlice.actions;
export default userSlice.reducer;
