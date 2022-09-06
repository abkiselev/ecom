import { configureStore } from '@reduxjs/toolkit'
import popupsReduser from "./slices/popupsSlice";
import cartReduser from "./slices/cartSlice";
import userReduser from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        popups: popupsReduser,
        cart: cartReduser,
        user: userReduser,
      },
})
  
store.subscribe(() => console.log(store.getState()))

