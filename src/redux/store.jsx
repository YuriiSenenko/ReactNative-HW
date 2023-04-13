import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authReducer";
import { persistStore } from "redux-persist";
// import { authSlice } from "./auth/authSlice";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

export const store = configureStore({ reducer: rootReducer });
// export const persistor = persistStore(store);
// export const store = configureStore({ reducer: { auth: authSlice.reducer } });
