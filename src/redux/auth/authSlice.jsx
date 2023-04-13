import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "users",
  initialState: { user: null },
  reducers: {
    addUser: {
      reducer(state, action) {
        state.user = action.payload;
      },
    },

    logOut: {
      reducer(state, action) {
        state.user = null;
      },
    },
  },
});
