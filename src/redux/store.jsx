import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authReducer";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["email"],
// };

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: rootReducer });

// export const persistor = persistStore(store);
