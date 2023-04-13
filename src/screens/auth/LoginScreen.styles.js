import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
const { backgroundColor, linkColor } = colors;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    // justifyContent: "center",
  },
  backgroundImg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  form: {
    backgroundColor: backgroundColor,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },

  title: {
    marginTop: 32,
  },

  showPasswordBtn: {
    position: "absolute",
    top: 28,
    right: 16,
  },

  loginBtn: {
    fontSize: 16,

    fontWeight: "400",
    textAlign: "center",
    color: linkColor,
  },
});
