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
import { colors } from "./styles/colors";
const { iconCameraColor, acentColor, textColor, goBackIconColor } = colors;

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
      initialRouteName="Публікації"
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
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ ...styles.iconsContainer, marginLeft: 81 }}>
              <Ionicons name="grid-outline" size={24} color={goBackIconColor} />
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
export default useRoute;
