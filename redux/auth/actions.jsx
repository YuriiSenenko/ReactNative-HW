import { createAction } from "@reduxjs/toolkit";

export const addUser = (user) => {
  return {
    type: "users/addUser",
    payload: {
      user,
    },
  };
};

export const logOut = () => {
  return {
    type: "users/logOut",
    payload: {},
  };
};
