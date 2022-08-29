import { configureStore } from '@reduxjs/toolkit'
import popupsReduser from "./popupsSlice";

export const store = configureStore({
    reducer: {
        popups: popupsReduser,
      },
})
  
store.subscribe(() => console.log(store.getState()))

