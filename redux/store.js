import { configureStore } from '@reduxjs/toolkit';
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
} from 'redux-persist';
import userReduser from './slices/userSlice';
import popupsReduser from './slices/popupsSlice';

const reducers = combineReducers({
  popups: popupsReduser,
  user: userReduser,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user'],
  blacklist: ['popups'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

store.subscribe(() => console.log(store.getState()));

export default store;
