import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  goods: [],
  quantity: null,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.goods.push(action.payload),
      state.quantity = state.goods.length
    },
    removeFromCart: (state, action) => {
      state.goods = state.goods.filter(item => item._id !== action.payload._id),
      state.quantity = state.goods.length === 0 ? null : state.goods.length
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
