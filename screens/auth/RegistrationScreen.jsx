import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
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
  avatar: "",
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [image, setImage] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);
  const [passwordIsHide, setPasswordIsHide] = useState(true);
  const [inputLoginActive, setInputLoginActive] = useState(false);
  const [inputEmailActive, setInputEmailActive] = useState(false);
  const [inputPasswordActive, setInputPasswordActive] = useState(false);

  const getImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setState((prevstate) => ({ ...prevstate, avatar: result.assets[0].uri }));
    }
  };

  const deleteAvatar = () => {
    setImage(null);
  };

  const keboardHide = () => {
    console.log(state);

    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
    setImage(null);
    setPasswordIsHide(true);
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
                  backgroundColor: inputEmailActive
                    ? backgroundColor
                    : imputBackgroundColor,
                  borderColor: inputEmailActive ? acentColor : borderColor,
                }}
                inputMode={"email"}
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
                  inputMode={"text"}
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
                    setState((prevstate) => ({
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
                submit={keboardHide}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    justifyContent: "center",
  },
  backgroundImg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: backgroundColor,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,
  },
  avatarView: {
    position: "absolute",
    top: -60,
    borderRadius: 16,
    backgroundColor: imputBackgroundColor,
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
    backgroundColor: backgroundColor,
    borderRadius: 50,
  },
  title: {
    marginTop: 92,
  },

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
    color: linkColor,
  },
});
