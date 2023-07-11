import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  listCart: [],
  isLoginSocial: false, // der redux persirt save value
};

export const saveInfoCartUser = createAsyncThunk(
  "cart/saveInfoCartUser",
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
    doUpdateBookPageCart: (state, action) => {
      const book = action.payload;
      let isBookExist = state.listCart.findIndex((i) => i.id === book.id);
      if (isBookExist > -1) {
        state.listCart[isBookExist] = action.payload;
      }
    },
    doDeleteBook: (state, action) => {
      let id = action.payload.id;
      state.listCart = state.listCart.filter((item) => item.id != id);
    },
    doRemoveAfterOrder: (state, action) => {
      let arr = action.payload;
      state.listCart = state.listCart.filter((item) => {
        return !arr.includes(item.id);
      });
    },
    doLoginSocialFalse: (state, action) => {
      state.isLoginSocial = false;
    },
    resetCart: () => initialState,
    doLoginSocialTrue: (state, action) => {
      state.isLoginSocial = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveInfoCartUser.fulfilled, (state, action) => {
      const json = JSON.stringify(state.listCart);
      localStorage.setItem(`cart${action.payload}`, json);
    });
  },
});

export const {
  doAddBookAction,
  doSetListCartLogin,
  doUpdateBookPageCart,
  doRemoveCartLogout,
  doDeleteBook,
  doRemoveAfterOrder,
  doLoginSocialFalse,
  resetCart,
  doLoginSocialTrue,
} = cartSlice.actions;

export default cartSlice.reducer;
