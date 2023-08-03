import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  listCategory: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    doAddCategoryAction: (state, action) => {
      state.listCategory = action.payload;
    },
  },
});

export const { doAddCategoryAction } = categorySlice.actions;

export default categorySlice.reducer;
