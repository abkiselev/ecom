import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  goods: [],
  quantity: null,
  totalSum: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.goods.push(action.payload),
      state.quantity = state.goods.length,
      state.totalSum = state.goods.reduce((acc, obj) => acc + obj.price, 0)
    },
    removeFromCart: (state, action) => {
      state.goods = state.goods.filter(item => item._id !== action.payload._id),
      state.quantity = state.goods.length === 0 ? null : state.goods.length,
      state.totalSum = state.goods.reduce((acc, obj) => acc + obj.price, 0)
    },
    resetCart: () => initialState,
  },
})

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
