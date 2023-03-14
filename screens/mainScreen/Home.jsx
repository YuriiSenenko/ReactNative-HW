import React from "react";
import PostsScreen from "../nestedScreens/PostsScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
          color: "#212121",
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
              color="#BDBDBD"
            />
          ),
          headerShadowVisible: true,
        }}
      />
      <NestedScreen.Screen
        // options={{ headerShown: false }}
        name="Коментарі"
        component={CommentsScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={24}
              color="rgba(33, 33, 33, 0.8)"
            />
          ),
        })}
      />
      <NestedScreen.Screen
        // options={{ headerShown: false }}
        name="Карта"
        component={MapScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={24}
              color="rgba(33, 33, 33, 0.8)"
            />
          ),
        })}
      />
    </NestedScreen.Navigator>
  );
};

export default Home;
