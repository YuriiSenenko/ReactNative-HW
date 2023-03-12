import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import ActiveSubmitBtn from "../../components/ActiveSubmitBtn";
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Dimensions,
} from "react-native";
import { globalStyle } from "../../styles/globalStyle";

// import icons
import { Feather } from "@expo/vector-icons";

const initialState = {
  avatar: "",
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);
  const [passwordIsHide, setPasswordIsHide] = useState(true);
  const [inputLoginActive, setInputLoginActive] = useState(false);
  const [inputEmailActive, setInputEmailActive] = useState(false);
  const [inputPasswordActive, setInputPasswordActive] = useState(false);

  // useEffect(() => {}, [isShowKeyboard]);

  const keboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
    setPasswordIsHide(true);
    navigation.navigate("Дом");
    console.log(state);
  };

  const touchableWithout = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={touchableWithout}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/sea.jpg")}
          style={styles.backgroundImg}
        >
          <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? -180 : 0,
              }}
            >
              <View
                style={{
                  ...styles.avatarView,
                  left: dimensions / 2 - 60,
                }}
              >
                {/* <Image
                  style={styles.avatarImage}
                  source={require("../assets/images/avatar_img.jpg")}
                /> */}
                <TouchableOpacity
                  style={styles.addIcon}
                  activeOpacity={0.6}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Feather name="plus-circle" size={24} color="#FF6C00" />
                </TouchableOpacity>
              </View>
              <Text style={{ ...globalStyle.title, ...styles.title }}>
                Реєстрація
              </Text>
              <TextInput
                style={{
                  ...globalStyle.input,
                  backgroundColor: inputLoginActive ? "#fff" : "#F6F6F6",
                  borderColor: inputLoginActive ? "#FF6C00" : "#E8E8E8",
                }}
                inputMode={"text"}
                placeholder={"Логін"}
                placeholderTextColor={"#BDBDBD"}
                cursorColor={"#FF6C00"}
                value={state.login}
                onFocus={() => {
                  setInputLoginActive(true);
                  setIsShowKeyboard(true);
                }}
                onBlur={() => {
                  setInputLoginActive(false);
                }}
                onChangeText={(value) =>
                  setState((prevstate) => ({ ...prevstate, login: value }))
                }
                onSubmitEditing={() => {
                  keboardHide();
                }}
              ></TextInput>
              <TextInput
                style={{
                  ...globalStyle.input,
                  marginTop: 16,
                  backgroundColor: inputEmailActive ? "#fff" : "#F6F6F6",
                  borderColor: inputEmailActive ? "#FF6C00" : "#E8E8E8",
                }}
                inputMode={"email"}
                placeholder={"Адреса електронної пошти"}
                placeholderTextColor={"#BDBDBD"}
                cursorColor={"#FF6C00"}
                value={state.email}
                onFocus={() => {
                  setInputEmailActive(true);
                  setIsShowKeyboard(true);
                }}
                onBlur={() => {
                  setInputEmailActive(false);
                }}
                onChangeText={(value) =>
                  setState((prevstate) => ({ ...prevstate, email: value }))
                }
                onSubmitEditing={() => {
                  keboardHide();
                }}
              ></TextInput>
              <View>
                <TextInput
                  style={{
                    ...globalStyle.input,
                    marginTop: 16,
                    backgroundColor: inputPasswordActive ? "#fff" : "#F6F6F6",
                    borderColor: inputPasswordActive ? "#FF6C00" : "#E8E8E8",
                  }}
                  inputMode={"text"}
                  placeholder={"Пароль"}
                  placeholderTextColor={"#BDBDBD"}
                  cursorColor={"#FF6C00"}
                  value={state.password}
                  secureTextEntry={passwordIsHide}
                  onFocus={() => {
                    setInputPasswordActive(true);
                    setIsShowKeyboard(true);
                  }}
                  onBlur={() => {
                    setInputPasswordActive(false);
                  }}
                  onChangeText={(value) =>
                    setState((prevstate) => ({ ...prevstate, password: value }))
                  }
                  onSubmitEditing={() => {
                    keboardHide();
                  }}
                ></TextInput>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.showPasswordBtn}
                  onPress={() =>
                    passwordIsHide
                      ? setPasswordIsHide(false)
                      : setPasswordIsHide(true)
                  }
                >
                  <Text style={{ fontSize: 16, color: "#1B4371" }}>
                    {passwordIsHide ? "Показати" : "Приховати"}
                  </Text>
                </TouchableOpacity>
              </View>
              <ActiveSubmitBtn submit={keboardHide}>
                Зареєструватися
              </ActiveSubmitBtn>
              <TouchableOpacity
                style={styles.goLogin}
                activeOpacity={0.6}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.goLoginTitle}>Уже є аккаунт? Війти</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
        {/* <StatusBar style="auto" /> */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  backgroundImg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "#FEFEFE",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,
  },
  avatarView: {
    position: "absolute",
    top: -60,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    width: 120,
    height: 120,
  },
  avatarImage: {
    height: 120,
    width: 120,
    borderRadius: 16,
  },
  addIcon: {
    position: "absolute",
    top: 80,
    right: -12,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  title: {
    marginTop: 92,
  },
  // input: {
  //   paddingLeft: 16,
  //   paddingRight: 16,
  //   borderRadius: 8,
  //   height: 50,
  //   borderWidth: 1,
  //   color: "#212121",
  // },
  showPasswordBtn: {
    position: "absolute",
    top: 28,
    right: 16,
  },

  goLogin: {
    marginTop: 16,
    marginBottom: 78,
  },
  goLoginTitle: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    color: "#1B4371",
  },
});
