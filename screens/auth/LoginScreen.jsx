import React, { useState } from "react";
import { styles } from "./LoginScreen.styles";
import { SubmitBtn } from "../../components/SubmitBtn";
import { StatusBar } from "expo-status-bar";
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { globalStyle } from "../../styles/globalStyle";
import { colors } from "../../styles/colors";
const {
  backgroundColor,
  acentColor,
  imputBackgroundColor,
  borderColor,
  placeholderColor,
  linkColor,
} = colors;

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [passwordIsHide, setPasswordIsHide] = useState(true);
  const [inputEmailActive, setInputEmailActive] = useState(false);
  const [inputPasswordActive, setInputPasswordActive] = useState(false);

  // Закриття клавіатури
  const keboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  // Відправка і очистка форми
  const submit = () => {
    console.log(state);

    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
    setPasswordIsHide(true);
  };

  return (
    <TouchableWithoutFeedback onPress={keboardHide}>
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
                  backgroundColor: inputEmailActive
                    ? backgroundColor
                    : imputBackgroundColor,
                  borderColor: inputEmailActive ? acentColor : borderColor,
                }}
                placeholder={"Адреса електронної пошти"}
                placeholderTextColor={placeholderColor}
                cursorColor={acentColor}
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
                    backgroundColor: inputPasswordActive
                      ? backgroundColor
                      : imputBackgroundColor,
                    borderColor: inputPasswordActive ? acentColor : borderColor,
                  }}
                  placeholder={"Пароль"}
                  placeholderTextColor={placeholderColor}
                  cursorColor={acentColor}
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
                  <Text style={{ fontSize: 16, color: linkColor }}>
                    {passwordIsHide ? "Показати" : "Приховати"}
                  </Text>
                </TouchableOpacity>
              </View>
              <SubmitBtn
                // style={{ disabled: true }}
                submit={submit}
                bgColor={acentColor}
                titleColor={backgroundColor}
                title="Ввійти"
              />

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
