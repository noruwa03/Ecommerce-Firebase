import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Cart } from "@/models/cart.types";

const initialState = {
  cartItem: [] as Cart[],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Cart>) {
      state.cartItem.push(action.payload);
    },
  },
});

export default cartSlice.reducer;
export const { addToCart } = cartSlice.actions;
