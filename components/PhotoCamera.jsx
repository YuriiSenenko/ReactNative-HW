import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function PhotoCamera({ newPhoto, camera }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            marginTop: 40,
            marginBottom: 30,
            fontSize: 20,
          }}
        >
          Отче, благословіть на використання камери!
        </Text>
        <Button onPress={requestPermission} title="Благословляю!" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={camera}>
        <TouchableOpacity style={styles.cameraIcon} onPress={newPhoto}>
          <Fontisto name="camera" size={24} color="#fff" />
        </TouchableOpacity>
      </Camera>
      <TouchableOpacity
        style={styles.toggleCameraType}
        onPress={toggleCameraType}
      >
        <FontAwesome name="refresh" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: " 100%",
    height: "100%",
    // flex: 1,
    // borderRadius: 8,
  },
  camera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  cameraIcon: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleCameraType: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
