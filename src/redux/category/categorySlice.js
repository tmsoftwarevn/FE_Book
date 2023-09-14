import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  current: 1,
  keyTabHome: 1,
  querySort: "&field=&sort=",
  priceRedux: "",
  rateRedux: 0,
  searchPrice: 0,
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
    doSetPriceAction: (state, action) => {
      state.priceRedux = action.payload;
    },
    doSetRateReduxAction: (state, action) => {
      state.rateRedux = action.payload;
    },
    doSetSearchPriceAction: (state, action) => {
      state.searchPrice = action.payload;
    },
  },
});

export const {
  doSetCurrentPageAction,
  doSetKeyTabHomeAction,
  doSetQuerySortHomeAction,
  doSetPriceAction,
  doSetRateReduxAction,
  doSetSearchPriceAction,
} = categorySlice.actions;

export default categorySlice.reducer;
