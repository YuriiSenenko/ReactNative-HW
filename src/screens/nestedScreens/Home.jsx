import React from "react";
import { useDispatch } from "react-redux";

import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import icons
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// import screens
import { CreatePostScreen } from "../mainScreen/CreatePostScreen";
import { ProfileScreen } from "../mainScreen/ProfileScreen";
import PostsScreen from "../mainScreen/PostsScreen";
import { authSignOutUser } from "../../redux/auth/authOperations";

import { colors } from "../../styles/colors";
const {
  iconCameraColor,
  acentColor,
  textColor,
  goBackIconColor,
  placeholderColor,
} = colors;

const Tab = createBottomTabNavigator();

const Home = () => {
  const dispatch = useDispatch();
  const logOutUser = () => {
    dispatch(authSignOutUser());
  };
  return (
    <Tab.Navigator
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
      <Tab.Screen
        options={{
          headerShown: true,
          headerRight: () => (
            <Feather
              style={{ marginRight: 16 }}
              onPress={logOutUser}
              name="log-out"
              size={24}
              color={placeholderColor}
            />
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ ...styles.iconsContainer, marginLeft: 81 }}>
              <Ionicons name="grid-outline" size={24} color={goBackIconColor} />
            </View>
          ),
        }}
        name="Публікації"
        component={PostsScreen}
      />
      <Tab.Screen
        options={({ navigation }) => ({
          tabBarIcon: ({ focused, color, size }) => (
            <View style={styles.buttonCreate}>
              <Feather name="plus" size={13} color={iconCameraColor} />
            </View>
          ),
          headerLeft: () => (
            <AntDesign
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.navigate("Публікації");
              }}
              name="arrowleft"
              size={24}
              color={goBackIconColor}
            />
          ),
          tabBarStyle: { display: "none" },
        })}
        name="Створити публікацію"
        component={CreatePostScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ ...styles.iconsContainer, marginRight: 81 }}>
              <Feather name="user" size={24} color={goBackIconColor} />
            </View>
          ),
        }}
        name="Профіль"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconsContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
  },

  buttonCreate: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: acentColor,
    borderRadius: 20,
  },
});
export default Home;
