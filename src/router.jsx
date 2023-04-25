import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import icons
import { AntDesign } from "@expo/vector-icons";

// import screens
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen.jsx";
import Home from "./screens/nestedScreens/Home";
import CommentsScreen from "./screens/nestedScreens/CommentsScreen";
import MapScreen from "./screens/nestedScreens/MapScreen";

import { colors } from "./styles/colors";
const { textColor, goBackIconColor } = colors;

const AuthStack = createNativeStackNavigator();
const NestedScreen = createNativeStackNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <NestedScreen.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Roboto-500",
          fontSize: 17,
          color: textColor,
        },
      }}
    >
      <NestedScreen.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
      <NestedScreen.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <AntDesign
              onPress={navigation.goBack}
              name="arrowleft"
              size={24}
              color={goBackIconColor}
            />
          ),
        })}
        name="Коментарі"
        component={CommentsScreen}
      />
      <NestedScreen.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <AntDesign
              onPress={navigation.goBack}
              name="arrowleft"
              size={24}
              color={goBackIconColor}
            />
          ),
        })}
        name="Карта"
        component={MapScreen}
      />
    </NestedScreen.Navigator>
  );
};

export default useRoute;
