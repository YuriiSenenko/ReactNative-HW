import React from "react";
import PostsScreen from "../nestedScreens/PostsScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../../styles/colors";
const { textColor, placeholderColor, goBackIconColor } = colors;

// import icons
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const NestedScreen = createNativeStackNavigator();

const Home = () => {
  return (
    <NestedScreen.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Roboto-500",
          fontSize: 17,
          color: textColor,
        },
        tabBarShowLabel: false,
      }}
    >
      <NestedScreen.Screen
        // options={{ headerShown: false }}
        name="Публікації"
        component={PostsScreen}
        options={{
          headerRight: () => (
            <Feather
              onPress={() => alert("This is a button!")}
              name="log-out"
              size={24}
              color={placeholderColor}
            />
          ),
          headerShadowVisible: true,
        }}
      />
      <NestedScreen.Group
        screenOptions={({ navigation }) => ({
          presentation: "modal",
          headerLeft: () => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={24}
              color={goBackIconColor}
            />
          ),
        })}
      >
        <NestedScreen.Screen
          // options={{ headerShown: false }}
          name="Коментарі"
          component={CommentsScreen}
        />
        <NestedScreen.Screen
          // options={{ headerShown: false }}
          name="Карта"
          component={MapScreen}
        />
      </NestedScreen.Group>
    </NestedScreen.Navigator>
  );
};

export default Home;
