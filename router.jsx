import React from "react";
import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import icons
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// import screens
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen.jsx";
import Home from "./screens/mainScreen/Home";
import CreatePostScreen from "./screens/mainScreen/CreatePostScreen";
import ProfileScreen from "./screens/mainScreen/ProfileScreen";

const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <Tab.Navigator
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
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ ...styles.iconsContainer, marginLeft: 81 }}>
              <Ionicons
                name="grid-outline"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            </View>
          ),
        }}
        name="Дом"
        component={Home}
      />
      <Tab.Screen
        options={({ navigation }) => ({
          tabBarIcon: ({ focused, color, size }) => (
            <View style={styles.buttonCreate}>
              <Feather name="plus" size={13} color="#fff" />
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
              color="rgba(33, 33, 33, 0.8)"
            />
          ),
        })}
        name="Створити публікацію"
        component={CreatePostScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ ...styles.iconsContainer, marginRight: 81 }}>
              <Feather name="user" size={24} color="rgba(33, 33, 33, 0.8)" />
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
    backgroundColor: "#FF6C00",
    borderRadius: 20,
  },
});
export default useRoute;
