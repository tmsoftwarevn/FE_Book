import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: {
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
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
      state.user = action.payload.user;
    },
    doGetAccountAction: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload.user;
    },
  },

  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(incrementAsync.pending, (state) => {
  //         state.status = "loading";
  //       })
  //       .addCase(incrementAsync.fulfilled, (state, action) => {
  //         state.status = "idle";
  //         state.value += action.payload;
  //       });
  //   },
});

export const { doLoginAction, doGetAccountAction } = accountSlice.actions;

export default accountSlice.reducer;
