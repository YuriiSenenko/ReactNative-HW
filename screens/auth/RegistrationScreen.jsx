import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/auth/actions";
import { v4 as uuidv4 } from "uuid";

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
} from "react-native";
import { SubmitBtn } from "../../components/SubmitBtn";
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

// import icons
import { AntDesign } from "@expo/vector-icons";

const initialState = {
  id: "",
  avatar: "",
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [user, setUser] = useState(initialState);
  const [image, setImage] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);
  const [passwordIsHide, setPasswordIsHide] = useState(true);
  const [inputLoginActive, setInputLoginActive] = useState(false);
  const [inputEmailActive, setInputEmailActive] = useState(false);
  const [inputPasswordActive, setInputPasswordActive] = useState(false);

  const dispatch = useDispatch();

  // const email = useSelector((state) => state.auth);
  // console.log(email);

  // Завантаження аватарки
  const getImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setUser((prevstate) => ({
        ...prevstate,
        avatar: result.assets[0].uri,
      }));
    }
  };

  // Видалення аватарки
  const deleteAvatar = () => {
    setImage(null);
  };

  // Закриття клавіатури
  const keboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  // Відправка і очистка форми
  const submit = () => {
    console.log(user);

    dispatch(addUser(user));
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setUser(initialState);
    setImage(null);
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
                marginBottom: isShowKeyboard ? -180 : 0,
              }}
            >
              <View
                style={{
                  ...styles.avatarView,
                  left: dimensions / 2 - 60,
                }}
              >
                <Image style={styles.avatarImage} source={{ uri: image }} />
                {!image ? (
                  <TouchableOpacity
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
                  backgroundColor: inputLoginActive
                    ? backgroundColor
                    : imputBackgroundColor,
                  borderColor: inputLoginActive ? acentColor : borderColor,
                }}
                inputMode={"text"}
                placeholder={"Логін"}
                placeholderTextColor={placeholderColor}
                cursorColor={acentColor}
                value={user.login}
                onFocus={() => {
                  setInputLoginActive(true);
                  setIsShowKeyboard(true);
                }}
                onBlur={() => {
                  setInputLoginActive(false);
                }}
                onChangeText={(value) =>
                  setUser((prevstate) => ({ ...prevstate, login: value }))
                }
                onSubmitEditing={() => {
                  keboardHide();
                }}
              ></TextInput>
              <TextInput
                style={{
                  ...globalStyle.input,
                  marginTop: 16,
                  backgroundColor: inputEmailActive
                    ? backgroundColor
                    : imputBackgroundColor,
                  borderColor: inputEmailActive ? acentColor : borderColor,
                }}
                inputMode={"email"}
                placeholder={"Адреса електронної пошти"}
                placeholderTextColor={placeholderColor}
                cursorColor={acentColor}
                value={user.email}
                onFocus={() => {
                  setInputEmailActive(true);
                  setIsShowKeyboard(true);
                }}
                onBlur={() => {
                  setInputEmailActive(false);
                }}
                onChangeText={(value) =>
                  setUser((prevstate) => ({ ...prevstate, email: value }))
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
                  inputMode={"text"}
                  placeholder={"Пароль"}
                  placeholderTextColor={placeholderColor}
                  cursorColor={acentColor}
                  value={user.password}
                  secureTextEntry={passwordIsHide}
                  onFocus={() => {
                    setInputPasswordActive(true);
                    setIsShowKeyboard(true);
                  }}
                  onBlur={() => {
                    setInputPasswordActive(false);
                  }}
                  onChangeText={(value) =>
                    setUser((prevstate) => ({
                      ...prevstate,
                      password: value,
                    }))
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
                submit={submit}
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
          </KeyboardAvoidingView>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}
