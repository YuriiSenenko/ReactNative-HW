import * as React from "react";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Main from "./components/Main";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-700": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-500": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-400": require("./assets/fonts/Roboto-Regular.ttf"),
    "Inter-500": require("./assets/fonts/Inter-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
