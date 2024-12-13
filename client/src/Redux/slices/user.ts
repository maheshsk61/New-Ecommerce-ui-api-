import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interface";
const initialState: IUser = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  countryCode: "",
  mobileNumber: "",
  address: "",
  password: "",
  error: null,
  success: null,
  user: {
    firstName: "",
    lastName: "",
    address: "",
    mobileNumber: "",
    countryCode: "",
    email: "",
  },
  // user: {
  //   firstName: storedUser.firstName,
  //   lastName: storedUser.lastName,
  //   address: storedUser.address,
  //   mobileNumber: storedUser.mobileNumber,
  //   countryCode: storedUser.countryCode,
  //   email: storedUser.email,
  // },
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
    setAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
      //console.log(`state.password ${state.password}`)
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      //console.log(`state.error ${state.error}`);
    },
    setSuccess(state, action: PayloadAction<string | null>) {
      state.success = action.payload;
      //console.log(`state.success ${state.success}`);
    },
    resetUser(state) {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.gender = "";
      state.countryCode = "";
      state.mobileNumber = "";
      state.address = "";
      state.password = "";
      state.error = null;
    },
    setUser(state, action: PayloadAction<IUser>) {
      const { firstName, lastName, address, mobileNumber, countryCode, email } =
        action.payload;
      state.user.firstName = firstName;
      state.user.lastName = lastName;
      state.user.address = address;
      state.user.mobileNumber = mobileNumber;
      state.user.countryCode = countryCode;
      state.user.email = email;
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
  setSuccess,
  setAddress,
  setUser,
} = userSlice.actions;
export default userSlice.reducer;
