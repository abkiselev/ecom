import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  likes: [],
  quantity: null,
}

const likeSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    setLike: (state, action) => {
      state.likes.push(action.payload),
      state.quantity = state.likes.length
    },
    removeLike: (state, action) => {
      state.likes = state.likes.filter(item => item._id !== action.payload._id),
      state.quantity = state.likes.length === 0 ? null : state.likes.length
    },
  },
})

export const { setLike, removeLike } = likeSlice.actions;
export default likeSlice.reducer;
