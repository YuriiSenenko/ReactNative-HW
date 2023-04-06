import { StyleSheet } from "react-native";
import { colors } from "./colors";
const {
  backgroundColor,
  borderColor,
  acentColor,
  textColor,
  placeholderColor,
  inputBackgroundColor,
} = colors;

const globalStyle = StyleSheet.create({
  title: {
    marginBottom: 32,
    fontSize: 30,
    textAlign: "center",
    color: textColor,
    fontFamily: "Roboto-500",
  },
  input: {
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 8,
    height: 50,
    borderWidth: 1,
    color: textColor,
    borderColor: borderColor,
    backgroundColor: inputBackgroundColor,
  },
  // inputActive: {
  //   borderColor: acentColor,
  //   backgroundColor: backgroundColor,
  // },
});

const commentsGlobalStyle = StyleSheet.create({
  commentSection: { marginHorizontal: 16, marginBottom: 24 },
  commentView: {
    flex: 1,
    padding: 16,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    backgroundColor: inputBackgroundColor,
  },
  commentText: {
    fontFamily: "Roboto-400",
    fontSize: 13,
    lineHeight: 18,
    color: textColor,
  },
  commentDate: {
    fontFamily: "Roboto-400",
    fontSize: 10,
    lineHeight: 11.72,
    color: placeholderColor,
    marginTop: 8,
  },
});

export { globalStyle, commentsGlobalStyle };
