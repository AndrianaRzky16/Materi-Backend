import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = (key) => {
  return localStorage.getItem(key) !== null
    ? JSON.parse(localStorage.getItem(key))
    : key === "cartItems"
    ? []
    : 0;
};

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const initialState = {
  cartItems: loadFromLocalStorage("cartItems"),
  totalQuantity: loadFromLocalStorage("totalQuantity"),
  totalAmount: loadFromLocalStorage("totalAmount"),
};

const setCartDataToLocalStorage = (cartItems, totalAmount, totalQuantity) => {
  saveToLocalStorage("cartItems", cartItems);
  saveToLocalStorage("totalAmount", totalAmount);
  saveToLocalStorage("totalQuantity", totalQuantity);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const id = newItem.id;
      const extraIngredients = newItem.extraIngredients;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (!existingItem || (existingItem && JSON.stringify(existingItem.extraIngredients) === JSON.stringify(extraIngredients))) {
        state.totalQuantity += 1;
        if (!existingItem) {
          state.cartItems.push({
            ...newItem,
            quantity: 1,
            totalPrice: newItem.price,
          });
        } else {
          existingItem.quantity += 1;
        }
      } else {
        const index = state.cartItems.findIndex((item) => item.id === existingItem.id);
        const updatedItem = {
          ...existingItem,
          quantity: 1,
          totalPrice: existingItem.price,
          extraIngredients: extraIngredients,
        };
        state.cartItems.splice(index, 1, updatedItem);
        state.totalQuantity = state.cartItems.reduce((total, item) => total + Number(item.quantity), 0);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      setCartDataToLocalStorage(state.cartItems, state.totalAmount, state.totalQuantity);
    },

    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      state.totalQuantity -= 1;

      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        existingItem.quantity -= 1;
        existingItem.totalPrice = Number(existingItem.totalPrice) - Number(existingItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      setCartDataToLocalStorage(state.cartItems, state.totalAmount, state.totalQuantity);
    },

    deleteItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity -= existingItem.quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      setCartDataToLocalStorage(state.cartItems, state.totalAmount, state.totalQuantity);
    },

    clearCart(state) {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;

      setCartDataToLocalStorage(state.cartItems, state.totalAmount, state.totalQuantity);
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
