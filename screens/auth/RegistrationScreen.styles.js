import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
const { backgroundColor, imputBackgroundColor, linkColor } = colors;

export const styles = StyleSheet.create({
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
