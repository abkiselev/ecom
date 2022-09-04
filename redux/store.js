import { configureStore } from '@reduxjs/toolkit'
import popupsReduser from "./slices/popupsSlice";
import cartReduser from "./slices/cartSlice";

export const store = configureStore({
    reducer: {
        popups: popupsReduser,
        cart: cartReduser,
      },
})
  
store.subscribe(() => console.log(store.getState()))

