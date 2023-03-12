import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

// import SubmitBtn from "../elements/ActiveSubmitBtn";
import NotActiveSubmitBTN from "../../components/NotActiveSubmitBTN";
import ActiveSubmitBtn from "../../components/ActiveSubmitBtn";
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
  name: "",
  location: "",
  coords: null,
};

export const CreatePostScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [cameraIsActive, setCameraIsActive] = useState(false);

  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);

  // useEffect(() => {
  //   setCameraIsActive(false);
  // }, [photo]);
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

  const takePhoto = async () => {
    const result = await camera.takePictureAsync();
    const currentlocation = await Location.getCurrentPositionAsync();
    setPhoto(result.uri);
    setState((prevstate) => ({
      ...prevstate,
      photo: result.uri,
      coords: currentlocation.coords,
    }));
  };

  const submit = async () => {
    // const currentlocation = await Location.getCurrentPositionAsync();
    // setLocation(currentlocation);
    // setState((prevstate) => ({
    //   ...prevstate,
    //   coords: currentlocation.coords,
    // }));

    navigation.navigate("Публікації", { state }); // Передаю стейт на сторінку публікації
    clearForm();
  };

  const clearForm = () => {
    setPhoto(null);
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={touchableWithout}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.form}>
            <View style={styles.photoContainer}>
              <View style={styles.preView}>
                <PhotoCamera newPhoto={takePhoto} camera={setCamera} />
                {photo && (
                  <Image
                    onPress={touchableWithout}
                    style={styles.photo}
                    source={{ uri: photo }}
                  ></Image>
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
              placeholderTextColor={"#BDBDBD"}
              cursorColor={"#FF6C00"}
              value={state.name}
              onFocus={() => {
                setIsShowKeyboard(true);
              }}
              onChangeText={(value) =>
                setState((prevstate) => ({ ...prevstate, name: value }))
              }
            ></TextInput>
            <View>
              <SimpleLineIcons
                style={styles.locationIcon}
                name="location-pin"
                size={24}
                color="#BDBDBD"
              />
              <TextInput
                style={{ ...styles.input, marginTop: 16, paddingLeft: 28 }}
                inputMode={"text"}
                placeholder={"Локація..."}
                placeholderTextColor={"#BDBDBD"}
                cursorColor={"#FF6C00"}
                value={state.location}
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                onChangeText={(value) =>
                  setState((prevstate) => ({ ...prevstate, location: value }))
                }
              ></TextInput>
            </View>
            <NotActiveSubmitBTN submit={submit}>
              Опублікувати
            </NotActiveSubmitBTN>
          </View>
          <View style={styles.buttonDeleteContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.buttonDelete}
              onPress={clearForm}
            >
              <AntDesign name="delete" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "center",
    // alignItems: "center",
  },
  form: {
    marginTop: 32,
    marginHorizontal: 16,
  },
  photoContainer: {
    height: 267,
  },
  preView: {
    height: 240,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  cameraIcon: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  photoText: {
    color: "#BDBDBD",
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    color: "#212121",
    fontSize: 16,
  },
  locationIcon: {
    position: "absolute",
    top: 27,
  },
  buttonDeleteContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDelete: {
    marginBottom: 34,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
});
export default CreatePostScreen;
