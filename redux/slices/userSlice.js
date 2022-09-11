import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  userInfo: {
    email: '',
    firstName: '',
    secondName: '',
    surName: '',
    tel: '',
    _id: '',
    cart: [],
    likes: [],
  },
  quantityCart: null,
  totalSumCart: 0,
  quantityLikes: null,
  loggedIn: false,
  pending: false,
  error: false,
}

export const updateUserInfo = createAsyncThunk('users/update', async (userData) => {
  const res = await axios.post(`/api/routes/users/${userData.id}`, userData);
  return res.data.data
}) 

export const setLike = createAsyncThunk('user/setlikes', async ({ userId, good }) => {
  if(!userId){
    return good
  } else {
    const { _id } = good;
    const resLikes = await axios.put(`/api/routes/users/${userId}/likes`, { likes: _id });
    return resLikes.data.data.find(item => item._id === good._id)
  }
}) 

export const removeLike = createAsyncThunk('user/removelikes', async ({ userId, good }) => {
  if(!userId){
    return good
  } else {
    const { _id } = good;
    const resLikes = await axios.delete(`/api/routes/users/${userId}/likes`, { data: { likes: [_id] } });
    return good
  }
}) 

export const addToCart = createAsyncThunk('users/addcart', async ({ userId, good }) => {
  if(!userId){
    return good
  } else {
    const { _id } = good;
    const resCart = await axios.put(`/api/routes/users/${userId}/cart`, { cart: _id });
    return resCart.data.data.find(item => item._id === good._id)
  }
}) 

export const removeFromCart = createAsyncThunk('users/removecart', async ({ userId, good }) => {
  if(!userId){
    return good
  } else {
    const { _id } = good;
    const resCart = await axios.delete(`/api/routes/users/${userId}/cart`, { data: { cart: [_id] } });
    return good
  }
}) 

export const resetCart = createAsyncThunk('users/removeFromCart', async ({ userId, goods }) => {
  if(!userId){
    return []
  } else {
    const Ids = goods.map(good => good._id);
    const cart = await axios.delete(`/api/routes/users/${userId}/cart`, { data: { cart: Ids } });
    return cart.data.data
  }
}) 



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload,
      state.quantityLikes = action.payload.likes.length === 0 ? null : action.payload.likes.length,
      state.quantityCart = action.payload.cart.length === 0 ? null : action.payload.cart.length,
      state.loggedIn = true
    },
    removeUser: () => initialState,
  },

  extraReducers: {
    [setLike.fulfilled]: (state, action) => {
      state.userInfo.likes.push(action.payload),
      state.quantityLikes = state.userInfo.likes.length
    },
    [removeLike.fulfilled]: (state, action) => {
      state.userInfo.likes = state.userInfo.likes.filter(item => item._id !== action.payload._id),
      state.quantityLikes = state.userInfo.likes.length === 0 ? null : state.userInfo.likes.length
    },
    [addToCart.fulfilled]: (state, action) => {
      state.userInfo.cart.push(action.payload),
      state.quantityCart = state.userInfo.cart.length,
      state.totalSumCart = state.userInfo.cart.reduce((acc, obj) => acc + obj.price, 0)
    },
    [removeFromCart.fulfilled]: (state, action) => {
      state.userInfo.cart = state.userInfo.cart.filter(item => item._id !== action.payload._id),
      state.quantityCart = state.userInfo.cart.length === 0 ? null : state.userInfo.cart.length,
      state.totalSumCart = state.userInfo.cart.reduce((acc, obj) => acc + obj.price, 0)
    },
    [resetCart.fulfilled]: (state, action) => {
      state.userInfo.cart = action.payload,
      state.quantityCart = null,
      state.totalSumCart = 0
    },
    [updateUserInfo.pending]: (state) => {
      state.pending = true,
      state.error = false
    },
    [updateUserInfo.fulfilled]: (state, action) => {
      state.userInfo = action.payload,
      state.pending = false,
      state.error = false
    },
    [updateUserInfo.rejected]: (state) => {
      state.pending = false,
      state.error = true
    },
  },
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
