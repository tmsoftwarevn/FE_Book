import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  current: 1,
  keyTabHome: 1,
  querySort: "&field=&sort=",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,

  reducers: {
    doSetCurrentPageAction: (state, action) => {
      state.current = action.payload;
    },
    doSetKeyTabHomeAction: (state, action) => {
      state.keyTabHome = action.payload;
    },
    doSetQuerySortHomeAction: (state, action) => {
      state.querySort = action.payload;
    },
  },
});

export const {
  doSetCurrentPageAction,
  doSetKeyTabHomeAction,
  doSetQuerySortHomeAction,
} = categorySlice.actions;

export default categorySlice.reducer;
