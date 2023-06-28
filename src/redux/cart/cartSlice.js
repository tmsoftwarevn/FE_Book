import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  listCart: [],
};

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
      message.success("Dã thêm vào giỏ hàng");
    },
  },
});

export const { doAddBookAction } = cartSlice.actions;

export default cartSlice.reducer;
