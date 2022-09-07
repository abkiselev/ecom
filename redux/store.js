import { configureStore } from '@reduxjs/toolkit'
import popupsReduser from "./slices/popupsSlice";
import cartReduser from "./slices/cartSlice";
import userReduser from "./slices/userSlice";

import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import thunk from 'redux-thunk';

// export const store = configureStore({
//     reducer: {
//         popups: popupsReduser,
//         cart: cartReduser,
//         user: userReduser,
//       },
// })


const reducers = combineReducers({
  popups: popupsReduser,
  cart: cartReduser,
  user: userReduser,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['cart', 'user'],
  blacklist: ['popups'],
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

store.subscribe(() => console.log(store.getState()))

export default store;