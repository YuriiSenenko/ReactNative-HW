import { React } from "react";
import { useDispatch } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../nestedScreens/Home";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import { colors } from "../../styles/colors";
const { textColor, placeholderColor, goBackIconColor } = colors;
// import icons
import { Feather } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";
import { getAuth, signOut } from "firebase/auth";
import { authSignOutUser } from "../../redux/auth/authOperations";

const NestedScreen = createNativeStackNavigator();

export const PostsScreen = () => {
  const dispatch = useDispatch();
  const logOutUser = () => {
    dispatch(authSignOutUser());
  };
  return (
    <NestedScreen.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Roboto-500",
          fontSize: 17,
          color: textColor,
        },
        // tabBarShowLabel: false,
      }}
    >
      <NestedScreen.Screen
        options={{
          headerRight: () => (
            <Feather
              onPress={logOutUser}
              name="log-out"
              size={24}
              color={placeholderColor}
            />
          ),
          headerShadowVisible: true,
          headerShown: true,
        }}
        name="Публікації"
        component={Home}
      />
      <NestedScreen.Screen name="Коментарі" component={CommentsScreen} />
      <NestedScreen.Screen name="Карта" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};
