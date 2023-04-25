// import { useSelector } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";

const state = {
  token: null,
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
      // token: payload.token,
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
export const getUser = (state) => state.auth;
