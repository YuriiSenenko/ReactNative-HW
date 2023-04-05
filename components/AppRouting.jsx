import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "../router";
import { useSelector } from "react-redux";

export default function AppRouting() {
  const user = useSelector((state) => state.auth.user);
  const routing = useRoute(user);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
