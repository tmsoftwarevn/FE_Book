import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: {
    email: "",
    fullName: "",
    role: "",
    type: "",
    id: "",
  },
  delivery: {
    fullName: "",
    phone: "",
    address: "",
    id: "",
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
        fullName: "",
        role: "",
        type: "",
        id: "",
      };
      state.delivery = {
        fullName: "",
        phone: "",
        address: "",
        id: "",
      };
    },
    doUpdateAddressUser: (state, action) => {
      state.delivery = action.payload;
    },
    doUpdateFullname: (state, action) => {
      state.user.fullName = action.payload;
    },
  },
});

export const {
  doLoginAction,
  doGetAccountAction,
  doLogoutAction,
  doUpdateAddressUser,
  doUpdateFullname,
} = accountSlice.actions;

export default accountSlice.reducer;
