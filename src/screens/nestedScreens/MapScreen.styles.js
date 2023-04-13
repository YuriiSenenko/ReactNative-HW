import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
const { iconCameraColor } = colors;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: iconCameraColor,
  },
  mapView: {
    flex: 1,
  },
});
