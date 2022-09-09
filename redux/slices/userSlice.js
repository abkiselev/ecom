import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userInfo: null,
  loggedIn: false,
  pending: null,
  error: false,
}

export const updateUser2 = createAsyncThunk('users/update', async (userData) => {
  const res = await axios.post(`/api/routes/users/${userData.id}`, userData);
  return res.data.data
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
    [updateUser2.pending]: (state) => {
      state.pending = true,
      state.error = false
    },
    [updateUser2.fulfilled]: (state, action) => {
      state.userInfo = action.payload,
      state.pending = null,
      state.error = false
    },
    [updateUser2.rejected]: (state) => {
      state.pending = null,
      state.error = true
    },
  }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
