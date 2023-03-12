import React, { useState, useEffect } from "react";
import ActiveSubmitBtn from "../../components/ActiveSubmitBtn";
import { StatusBar } from "expo-status-bar";
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { globalStyle } from "../../styles/globalStyle";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [passwordIsHide, setPasswordIsHide] = useState(true);
  const [inputLoginActive, setInputLoginActive] = useState(false);
  const [inputEmailActive, setInputEmailActive] = useState(false);
  const [inputPasswordActive, setInputPasswordActive] = useState(false);
  // const [dimensions, setDimensions] = useState(Dimensions.get("window").width);

  // useEffect(() => {
  //   const onChange = () => {
  //     const width = Dimensions.get("window").width;
  //     console.log(width);
  //   };
  //   Dimensions.addEventListener("change", onChange);
  // }, []);

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
                marginBottom: isShowKeyboard ? -250 : 0,
              }}
            >
              <Text style={{ ...globalStyle.title, ...styles.title }}>
                Вхід
              </Text>

              <TextInput
                style={{
                  ...globalStyle.input,
                  backgroundColor: inputLoginActive ? "#fff" : "#F6F6F6",
                  borderColor: inputLoginActive ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder={"Адреса електронної пошти"}
                placeholderTextColor={"#BDBDBD"}
                cursorColor={"#FF6C00"}
                value={state.email}
                onFocus={() => {
                  setInputLoginActive(true);
                  setIsShowKeyboard(true);
                }}
                onBlur={() => {
                  setInputLoginActive(false);
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
                    backgroundColor: inputEmailActive ? "#fff" : "#F6F6F6",
                    borderColor: inputEmailActive ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder={"Пароль"}
                  placeholderTextColor={"#BDBDBD"}
                  cursorColor={"#FF6C00"}
                  value={state.password}
                  secureTextEntry={passwordIsHide}
                  onFocus={() => {
                    setInputEmailActive(true);
                    setIsShowKeyboard(true);
                  }}
                  onBlur={() => {
                    setInputEmailActive(false);
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
              <ActiveSubmitBtn submit={keboardHide}>Війти</ActiveSubmitBtn>

              <TouchableOpacity
                style={{ marginTop: 16, marginBottom: 144 }}
                activeOpacity={0.6}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={styles.loginBtn}>
                  Немає аккаунта? Зареєструватися
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
        <StatusBar style="auto" />
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },

  title: {
    marginTop: 32,
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

  loginBtn: {
    fontSize: 16,

    fontWeight: "400",
    textAlign: "center",
    color: "#1B4371",
  },
});
