import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interface";

const initialState: IUser = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  countryCode: "",
  mobileNumber: "",
  password: "",
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
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
      //console.log(`state.password ${state.password}`)
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    resetUser(state) {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.gender = "";
      state.countryCode = "";
      state.mobileNumber = "";
      state.password = "";
      state.error = "";
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
  setPassword,
  resetUser,
  setError,
} = userSlice.actions;
export default userSlice.reducer;
