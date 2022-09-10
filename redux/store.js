import { configureStore } from '@reduxjs/toolkit'
import popupsReduser from "./slices/popupsSlice";
// import cartReduser from "./slices/cartSlice";
import userReduser from "./slices/userSlice";
// import likesReduser from "./slices/likeSlice";

import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import thunk from 'redux-thunk';

const reducers = combineReducers({
  popups: popupsReduser,
  // cart: cartReduser,
  user: userReduser,
  // likes: likesReduser,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['cart', 'user', 'likes'],
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