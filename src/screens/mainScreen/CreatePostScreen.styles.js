import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
const {
  backgroundColor,
  acentColor,
  inputBackgroundColor,
  borderColor,
  textColor,
  placeholderColor,
} = colors;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: backgroundColor,
  },
  form: {
    // marginTop: 32,
    marginHorizontal: 16,
  },
  photoContainer: {
    height: 267,
  },

  preView: {
    height: 240,
    backgroundColor: inputBackgroundColor,
    borderColor: borderColor,
    borderRadius: 8,
    marginBottom: 8,
    // justifyContent: "center",
    // alignItems: "center",
  },
  photo: {
    flex: 1,
    borderRadius: 8,
  },
  photoText: {
    color: placeholderColor,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: borderColor,
    color: textColor,
    fontSize: 16,
  },
  locationIcon: {
    position: "absolute",
    top: 27,
  },
  buttonDeleteContainer: {
    marginBottom: 34,
    alignItems: "center",
  },
  buttonDelete: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: inputBackgroundColor,
    borderRadius: 20,
  },
});
