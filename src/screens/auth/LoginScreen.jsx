import React, { useState } from "react";
import { useFormik, Formik } from "formik";
import { loginSchema } from "../../components/shemas/Shemas";

import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";

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
  inputBackgroundColor,
  borderColor,
  placeholderColor,
  linkColor,
  successColor,
} = colors;

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [passwordIsHide, setPasswordIsHide] = useState(true);
  const [inputEmailActive, setInputEmailActive] = useState(false);
  const [inputPasswordActive, setInputPasswordActive] = useState(false);

  const dispatch = useDispatch();

  //! Зміна кольору input
  const inpuBorderColor = (inputActive, hasValue, error) => {
    if (!inputActive && !error && !hasValue) {
      borderInput = borderColor;
    } else if (inputActive && !error && !hasValue) {
      borderInput = acentColor;
    } else if (inputActive && error) {
      borderInput = acentColor;
    } else if (inputActive && !error) {
      borderInput = successColor;
    } else if (!inputActive && !error) {
      borderInput = successColor;
    } else if (!inputActive && error) {
      borderInput = acentColor;
    }
    return borderInput;
  };
  const inputBackground = (inputActive) => {
    return !inputActive ? inputBackgroundColor : backgroundColor;
  };

  //! Закриття клавіатури
  const keboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  //! Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,

    onSubmit: (values) => {
      dispatch(authSignInUser(values));
      setIsShowKeyboard(false);
      Keyboard.dismiss();
      setPasswordIsHide(true);
      formik.resetForm();
    },
  });

  return (
    <TouchableWithoutFeedback onPress={keboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/images/sea.jpg")}
          style={styles.backgroundImg}
        >
          <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
            <Formik validationSchema={loginSchema}>
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
                    marginTop: 16,
                    backgroundColor: inputBackground(inputEmailActive),
                    borderColor: inpuBorderColor(
                      inputEmailActive,
                      formik.values.email,
                      formik.errors.email
                    ),
                  }}
                  inputMode={"email"}
                  autoCapitalize={"none"}
                  autoComplete={"email"}
                  placeholder={"Адреса електронної пошти"}
                  placeholderTextColor={placeholderColor}
                  cursorColor={acentColor}
                  value={
                    !inputEmailActive && formik.errors.email
                      ? formik.errors.email
                      : formik.values.email
                  }
                  validate={loginSchema.email}
                  onChangeText={formik.handleChange("email")}
                  onFocus={() => {
                    setInputEmailActive(true);
                    setIsShowKeyboard(true);
                  }}
                  onBlur={() => {
                    formik.handleBlur("email"), setInputEmailActive(false);
                  }}
                  onSubmitEditing={() => {
                    keboardHide();
                  }}
                ></TextInput>
                <View>
                  <TextInput
                    style={{
                      ...globalStyle.input,
                      marginTop: 16,
                      backgroundColor: inputBackground(inputPasswordActive),
                      borderColor: inpuBorderColor(
                        inputPasswordActive,
                        formik.values.password,
                        formik.errors.password
                      ),
                    }}
                    placeholder={"Пароль"}
                    placeholderTextColor={placeholderColor}
                    cursorColor={acentColor}
                    secureTextEntry={
                      !inputPasswordActive && formik.errors.password
                        ? false
                        : passwordIsHide
                    }
                    value={
                      !inputPasswordActive && formik.errors.password
                        ? formik.errors.password
                        : formik.values.password
                    }
                    validate={loginSchema.password}
                    onChangeText={formik.handleChange("password")}
                    onFocus={() => {
                      setInputPasswordActive(true);
                      setIsShowKeyboard(true);
                    }}
                    onBlur={() => {
                      formik.handleBlur("password"),
                        setInputPasswordActive(false);
                    }}
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
                  type="submit"
                  submit={formik.handleSubmit}
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
            </Formik>
          </KeyboardAvoidingView>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}
