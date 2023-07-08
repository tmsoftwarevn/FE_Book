import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: {
    email: "",
    phone: "",
    fullName: "",
    role: "",
    //avatar: "",
    id: "",
    address: "",
  },
};

// export const incrementAsync = createAsyncThunk(
//   "counter/fetchCount",
//   async (amount) => {
//     const response = await fetchCount(amount);
//     return response.data;
//   }
// );

export const accountSlice = createSlice({
  name: "account",
  initialState,

  reducers: {
    doLoginAction: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
    },
    doGetAccountAction: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
    },
    doLogoutAction: (state, action) => {
      localStorage.removeItem("access_token");
      state.isAuthenticated = false;
      state.isLoading = true;
      state.user = {
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
      };
    },
    doUpdateAddressUser: (state, action) => {
      let info = action.payload;
      state.user.address = info;
    },
  },
});

export const {
  doLoginAction,
  doGetAccountAction,
  doLogoutAction,
  doUpdateAddressUser,
} = accountSlice.actions;

export default accountSlice.reducer;
