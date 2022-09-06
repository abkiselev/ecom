import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: {},
  loggedIn: false,
}

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
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
