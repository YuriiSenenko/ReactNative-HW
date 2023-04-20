import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
const {
  backgroundColor,
  acentColor,
  inputBackgroundColor,
  borderColor,
  placeholderColor,
} = colors;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  photo: {
    marginTop: 32,
    marginBottom: 32,
    height: 240,
    borderRadius: 8,
    marginHorizontal: 16,
  },

  inputContainer: {
    height: 50,
    marginHorizontal: 16,

    paddingLeft: 16,
    paddingRight: 45,
    marginBottom: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: borderColor,
    backgroundColor: inputBackgroundColor,

    justifyContent: "center",
  },
  input: {
    paddingTop: 0,
    fontFamily: "Inter-500",
    fontSize: 16,
  },
  sendBTN: {
    position: "absolute",
    top: 8,
    end: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    backgroundColor: acentColor,
    borderRadius: 50,
  },
});
