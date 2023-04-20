// import { useSelector } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  avatar: null,
  login: null,
  email: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    addUser: {
      reducer(state, action) {
        state.user = action.payload;
      },
    },

    // Екшен де додаємо дані до User
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      avatar: payload.avatar,
      login: payload.login,
      email: payload.email,
    }),

    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),

    authSignOut: () => state,
  },
});

// Selectors
export const getUser = (state) => state.auth.auth;
