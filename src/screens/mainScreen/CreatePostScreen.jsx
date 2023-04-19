import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";

import * as Location from "expo-location";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from "react-native";

// import Firebase
import app from "../../firebase/config";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import { styles } from "./CreatePostScreen.styles";
import { colors } from "../../styles/colors";
const {
  backgroundColor,
  acentColor,
  inputBackgroundColor,
  borderColor,
  textColor,
  placeholderColor,
} = colors;

// import NotActiveSubmitBTN from "../../components/NotActiveSubmitBTN";
import { SubmitBtn } from "../../components/SubmitBtn";
import PhotoCamera from "../../components/PhotoCamera";

//import icons
import { Fontisto } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// import { Header } from "@rneui/themed";
// // import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

const initialState = {
  photo: null,
  title: null,
  location: null,
  coords: null,
};

// Get a reference to the storage service, which is used to create references in your storage bucket
// const storage = getStorage();

// Create a storage reference from our storage service
// const storageRef = ref(storage);

export const CreatePostScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [cameraIsActive, setCameraIsActive] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);

  const storage = getStorage();
  const firestoreCloud = getFirestore(app);

  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const keboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
  };

  const touchableWithout = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  //! отримую фото і координати, записую в State
  const takePhoto = async () => {
    const result = await camera.takePictureAsync();
    setPhoto(result.uri);

    const currentlocation = await Location.getCurrentPositionAsync();
    setState((prevstate) => ({
      ...prevstate,

      photo: result.uri,

      coords: currentlocation.coords,
    }));
  };

  //! При кліку на кнопку відпраки, якщо немає фото, виводить Alert
  const alert = () => {
    Alert.alert("Зробіть фото");
    return;
  };

  //! Загрузка фото в БД
  const uploadPhotoToServer = async () => {
    const response = await fetch(photo); //* Асинхронне завантаження фото
    const file = await response.blob(); //* Перетворення фото
    const uniquePostId = Date.now().toString(); //* Створення унікальної назви файла
    const storageRef = ref(storage, `postImages/${uniquePostId}`); //* Створення ссилки на картинку в БД

    //todo -- Завантаження фото на Firebase
    await uploadBytes(storageRef, file).then((snapshot) => {
      // console.log(snapshot);
    });

    //todo -- Отримання посилання на фото з Firebase
    const pathReference = await getDownloadURL(storageRef);
    // console.log(pathReference);
    return pathReference;
  };

  //! Загрузка публікації на сервер
  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const docRef = await addDoc(collection(firestoreCloud, "posts"), {
      photo,
      title: state.title,
      location: state.location,
      coords: state.coords,
      owner: userId,
      login,
    });
  };

  //! Виклик запису фото і поста, перехід на сторінку постів
  const submit = async () => {
    uploadPhotoToServer();
    uploadPostToServer();
    navigation.navigate("Home");
    clearForm();
  };

  //! Очистка форми
  const clearForm = () => {
    setPhoto(null);
    setState(initialState);
  };

  return (
    // <TouchableWithoutFeedback onPress={touchableWithout}>
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
        <View style={{ ...styles.form, marginTop: isShowKeyboard ? -10 : 32 }}>
          <View style={styles.photoContainer}>
            <View style={styles.preView}>
              {photo ? (
                <Image
                  onPress={touchableWithout}
                  style={styles.photo}
                  source={{ uri: photo }}
                ></Image>
              ) : (
                <PhotoCamera newPhoto={takePhoto} camera={setCamera} />
              )}
            </View>
            <TouchableOpacity>
              {photo ? (
                <View>
                  <Text
                    onPress={() => {
                      setPhoto(null);
                    }}
                    style={styles.photoText}
                  >
                    Змінити фото
                  </Text>
                </View>
              ) : (
                <View>
                  <Text onPress={() => {}} style={styles.photoText}>
                    Завантажити фото
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            inputMode={"text"}
            placeholder={"Назва..."}
            placeholderTextColor={placeholderColor}
            cursorColor={acentColor}
            value={state.title}
            onFocus={() => {
              setIsShowKeyboard(true);
            }}
            onChangeText={(value) =>
              setState((prevstate) => ({ ...prevstate, title: value }))
            }
            onSubmitEditing={() => {
              touchableWithout();
            }}
          ></TextInput>
          <View>
            <SimpleLineIcons
              style={styles.locationIcon}
              name="location-pin"
              size={24}
              color={placeholderColor}
            />
            <TextInput
              style={{ ...styles.input, marginTop: 16, paddingLeft: 28 }}
              inputMode={"text"}
              placeholder={"Локація..."}
              placeholderTextColor={placeholderColor}
              cursorColor={acentColor}
              value={state.location}
              onFocus={() => {
                setIsShowKeyboard(true);
              }}
              onChangeText={(value) =>
                setState((prevstate) => ({
                  ...prevstate,
                  location: value,
                }))
              }
              onSubmitEditing={() => {
                touchableWithout();
              }}
            ></TextInput>
          </View>
          {!photo ? (
            <SubmitBtn
              submit={alert}
              bgColor={inputBackgroundColor}
              titleColor={placeholderColor}
              title="Опублікувати"
            />
          ) : (
            <SubmitBtn
              submit={submit}
              bgColor={acentColor}
              titleColor={backgroundColor}
              title="Опублікувати"
            />
          )}
        </View>
      </KeyboardAvoidingView>
      <View style={styles.buttonDeleteContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.buttonDelete}
          onPress={clearForm}
        >
          <AntDesign name="delete" size={24} color={placeholderColor} />
        </TouchableOpacity>
      </View>
    </View>
    // </TouchableWithoutFeedback>
  );
};
