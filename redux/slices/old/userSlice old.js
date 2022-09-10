import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from './cartSlice';
import { setLike } from './likeSlice';



const initialState = {
  userInfo: null,
  loggedIn: false,
  pending: false,
  error: false,
}

export const updateUserInfo = createAsyncThunk('users/update', async (userData) => {
  const res = await axios.post(`/api/routes/users/${userData.id}`, userData);
  return res.data.data
}) 

export const syncUserCartAndLikes = createAsyncThunk('users/sync', async (userData) => {
  // const currentCartGoodsIds = useSelector((state) => state.cart.goods).map(good => good._id);
  // const currentLikesGoodsIds = useSelector((state) => state.likes.likes).map(good => good._id);

  await axios.post(`/api/routes/users/${userData.id}/likes`, { likes: currentLikesGoodsIds });
  const res = await axios.post(`/api/routes/users/${userData.id}/cart`, { cart: currentCartGoodsIds });
  console.log(res.data);

  res.data.cart.forEach(item => {
    !currentCartGoodsIds.includes(item._id) && dispatch(addToCart(item))
  })
  res.data.likes.forEach(item => {
    !currentLikesGoodsIds.includes(item._id) && dispatch(setLike(item))
  })  

  // return res.data.data
}) 

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload,
      state.loggedIn = true
    },
    removeUser: () => initialState,
  },
  extraReducers: {
    [updateUserInfo.pending]: (state) => {
      state.pending = true,
      state.error = false
    },
    [updateUserInfo.fulfilled]: (state, action) => {
      state.userInfo = action.payload,
      state.pending = null,
      state.error = false
    },
    [updateUserInfo.rejected]: (state) => {
      state.pending = null,
      state.error = true
    },
  },
  extraReducers: {
    [syncUserCartAndLikes.fulfilled]: (state, action) => {
      state.userInfo = action.payload,
      state.pending = null,
      state.error = false
    },
    [syncUserCartAndLikes.rejected]: (state, action) => {
      state.pending = null,
      state.error = action.error
    },
  }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
