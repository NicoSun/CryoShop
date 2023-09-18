import { configureStore } from "@reduxjs/toolkit";
import {combineReducers} from "redux"; 
import { cartReducer } from "./cartSlice.js";
import { productReducer, orderReducer } from "./productSlice.js";
import { userReducerGPT } from "./userslice.js";



import storage from 'redux-persist/lib/storage';

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

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
  userGPT: userReducerGPT,
  products: productReducer,
  order: orderReducer,
  cart: cartReducer,
 });

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)