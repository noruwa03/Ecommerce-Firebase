import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Cart } from "@/models/cart.types";

const initialState = {
  cartItem: [] as Cart[],
  message: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Cart>) {
      if (state.cartItem.length === 0) {
        state.cartItem.push(action.payload);
        state.message = `${action.payload.name} successfully added to cart`;
      } else {
        const checkProductName = state.cartItem.find(
          (res) => res.name === action.payload.name
        );
        if (checkProductName == undefined) {
          state.cartItem.push(action.payload);
          state.message = `${action.payload.name} successfully added to cart`;
        } else {
          state.message = `${action.payload.name} is already in the cart`;
        }
      }
    },
    increaseQuantity(state, action: PayloadAction<any>) {
      const checkQty = state.cartItem.find((res) => res.id === action.payload);

      if (checkQty!.quantity < 10) {
         checkQty!.quantity++;
      } 
    },
    decreaseQuantity(state, action: PayloadAction<any>) {
      const checkQty = state.cartItem.find((res) => res.id === action.payload);
      if (checkQty!.quantity > 1) {
        checkQty!.quantity--;
      } 
    },
    removeItemFromCart(state, action: PayloadAction<any>) {
      state.cartItem = state.cartItem.filter(
        (res) => res.id !== action.payload
      );
      state.message = `Item successfully removed with id ${action.payload}`;
    },
    resetCart(state) {
      state.cartItem = [];
      state.message = "Cart cleared successfully";
    },
    closeModal(state) {
      state.message = "";
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  removeItemFromCart,
  increaseQuantity,
  decreaseQuantity,
  resetCart,
  closeModal,
} = cartSlice.actions;
