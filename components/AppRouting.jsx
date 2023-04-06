import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "../router";
import { useSelector } from "react-redux";
import { getUser } from "../redux/auth/selectors";

export default function AppRouting() {
  const user = useSelector(getUser);
  const routing = useRoute(user);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
