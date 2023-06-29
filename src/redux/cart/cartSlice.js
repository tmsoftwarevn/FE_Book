import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  listCart: [],
};

export const getIdUser = createAsyncThunk(
  "cart/getIdUser",
  async (a, { getState }) => {
    return getState().account?.user?.id;
  }
);
export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    doAddBookAction: (state, action) => {
      const book = action.payload;
      let isBookExist = state.listCart.findIndex((i) => i.id === book.id);
      if (isBookExist > -1) {
        state.listCart[isBookExist].quantity =
          +state.listCart[isBookExist].quantity + +book.quantity;
        // neu vuot qua so luong hien co
        if (+state.listCart[isBookExist].quantity > +book.detail.total) {
          state.listCart[isBookExist].quantity = book.detail.total;
        }
      } else state.listCart.push(action.payload);
    },
    doSetListCartLogin: (state, action) => {
      state.listCart = action.payload;
    },
    doRemoveCartLogout: (state, action) => {
      state.listCart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getIdUser.fulfilled, (state, action) => {
      const json = JSON.stringify(state.listCart);
      localStorage.setItem(`cart${action.payload}`, json);
    });
  },
});

export const { doAddBookAction, doSetListCartLogin, doRemoveCartLogout } =
  cartSlice.actions;

export default cartSlice.reducer;
