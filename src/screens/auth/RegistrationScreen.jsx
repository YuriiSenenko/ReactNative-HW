import React, { useState, useEffect } from "react";
import { useFormik, Formik } from "formik";
import { registerSchema } from "../../components/shemas/Shemas";

import { useDispatch } from "react-redux";

import { styles } from "./RegistrationScreen.styles";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Image,
  Platform,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  Alert,
} from "react-native";

import { authSignUpUser } from "../../redux/auth/authOperations";
import { userAuth } from "../../redux/auth/authOperations";

import { SubmitBtn } from "../../components/SubmitBtn";
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

// import icons
import { AntDesign } from "@expo/vector-icons";

// import Firebase
import db from "../../firebase/config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const initialState = {
  avatar: "",
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [avatar, setAvatar] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);
  const [passwordIsHide, setPasswordIsHide] = useState(true);

  const [inputLoginActive, setInputLoginActive] = useState(false);
  const [inputEmailActive, setInputEmailActive] = useState(false);
  const [inputPasswordActive, setInputPasswordActive] = useState(false);

  const dispatch = useDispatch();
  const storage = getStorage();

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

  //! Завантаження аватарки
  const getImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      // const urlAvatar = await uploadPhotoToServer(result.assets[0].uri);
    }
  };

  //! Видалення аватарки
  const deleteAvatar = () => {
    setAvatar(null);
  };

  //! Закриття клавіатури
  const keboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  //! Загрузка фото в БД
  const uploadPhotoToServer = async (photo) => {
    const response = await fetch(photo); //* Асинхронне завантаження фото
    const file = await response.blob(); //* Перетворення фото
    const uniquePostId = Date.now().toString(); //* Створення унікальної назви файла
    const storageRef = ref(storage, `userAvatar/${uniquePostId}`); //* Створення ссилки на картинку в БД

    //todo -- Завантаження фото на Firebase
    await uploadBytes(storageRef, file).then((snapshot) => {
      // console.log(snapshot);
    });

    //todo -- Отримання посилання на фото з Firebase
    const pathReference = await getDownloadURL(storageRef);
    // setAvatar(pathReference);
    return pathReference;
  };

  //! Formik
  const formik = useFormik({
    initialValues: {
      login: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const { login, email, password } = values;
      if (!avatar) {
        Alert.alert(
          "Помилка в формі реєстрації:",
          "Ну що поробиш, фотка теж обов'язкова!"
        );
        return;
      }
      const urlAvatar = await uploadPhotoToServer(avatar);
      const newUser = { urlAvatar, login, email, password };
      dispatch(authSignUpUser(newUser));
      setIsShowKeyboard(false);
      Keyboard.dismiss();
      setAvatar(null);
      setPasswordIsHide(true);
      formik.resetForm();
    },
  });

  return (
    <TouchableWithoutFeedback onPress={keboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/sea.jpg")}
          style={styles.backgroundImg}
        >
          <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
            <Formik validationSchema={registerSchema}>
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
                  <Image style={styles.avatarImage} source={{ uri: avatar }} />
                  {!avatar ? (
                    <TouchableOpacity
                      name="avatar"
                      style={styles.addIcon}
                      activeOpacity={0.6}
                      onPress={getImage}
                    >
                      <AntDesign
                        name="pluscircleo"
                        size={24}
                        color={acentColor}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.addIcon}
                      activeOpacity={0.6}
                      onPress={deleteAvatar}
                    >
                      <AntDesign
                        name="closecircleo"
                        size={24}
                        color={placeholderColor}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <Text style={{ ...globalStyle.title, ...styles.title }}>
                  Реєстрація
                </Text>
                <TextInput
                  style={{
                    ...globalStyle.input,
                    backgroundColor: inputBackground(inputLoginActive),
                    borderColor: inpuBorderColor(
                      inputLoginActive,
                      formik.values.login,
                      formik.errors.login
                    ),
                  }}
                  inputMode={"text"}
                  maxLength={30}
                  placeholder={"Логін"}
                  placeholderTextColor={placeholderColor}
                  cursorColor={acentColor}
                  value={
                    !inputLoginActive && formik.errors.login
                      ? formik.errors.login
                      : formik.values.login
                  }
                  validate={registerSchema.login}
                  onChangeText={formik.handleChange("login")}
                  onFocus={() => {
                    setInputLoginActive(true);
                    setIsShowKeyboard(true);
                  }}
                  onBlur={() => {
                    formik.handleBlur("login");
                    setInputLoginActive(false);
                  }}
                  onSubmitEditing={() => {
                    keboardHide();
                  }}
                ></TextInput>
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
                  placeholder={"Адреса електронної пошти"}
                  autoComplete={"email"}
                  placeholderTextColor={placeholderColor}
                  cursorColor={acentColor}
                  value={
                    !inputEmailActive && formik.errors.email
                      ? formik.errors.email
                      : formik.values.email
                  }
                  validate={registerSchema.email}
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
                    inputMode={"text"}
                    placeholder={"Пароль"}
                    autoComplete={"new-password"}
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
                    validate={registerSchema.password}
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
                  title="Зареєструватися"
                />
                <TouchableOpacity
                  style={styles.goLogin}
                  activeOpacity={0.6}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={styles.goLoginTitle}>Уже є аккаунт? Ввійти</Text>
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
