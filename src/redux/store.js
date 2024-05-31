import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import accountReducer from "../redux/account/accountSlice";
import cartReducer from "../redux/cart/cartSlice";
import categoryReducer from "../redux/category/categorySlice";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["account", "category"], // account will not be persisted, tu dong luu
};

const rootReducer = combineReducers({
  account: accountReducer,
  cart: cartReducer,
  category: categoryReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);

export { store, persistor };
