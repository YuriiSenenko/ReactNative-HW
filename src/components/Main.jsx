import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import useRoute from "../router";
import { authStateChangeUser } from "../redux/auth/authOperations";
import { getUser } from "../redux/auth/authReducer";

const Main = () => {
  const { stateChange } = useSelector(getUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
