import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  zakazPopup: false,
  writeUsPopup: false
}

const popupsSlice = createSlice({
  name: 'popups',
  initialState,
  reducers: {
    openPopup: (state, action) => {
      state[action.payload] = true
    },
    closePopup: () => initialState,
  },
})

export const { openPopup, closePopup } = popupsSlice.actions;
export default popupsSlice.reducer;
