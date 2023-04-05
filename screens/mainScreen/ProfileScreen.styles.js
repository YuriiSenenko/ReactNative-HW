import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
const { backgroundColor, acentColor, borderColor, placeholderColor } = colors;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  backgroundImg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderTitle: {
    marginTop: 15,
    fontSize: 20,
  },
  profile: {
    marginTop: 147,
    backgroundColor: backgroundColor,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatarView: {
    position: "absolute",
    top: -60,
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
  },
  logoutIcon: {
    position: "absolute",
    right: 16,
    top: 22,
  },
  title: {
    marginTop: 92,
  },
  // postsListContainer: { marginHorizontal: 16 },
  postContainer: { marginBottom: 32 },
  photo: {
    height: 240,
    borderRadius: 8,
  },
  photoName: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 16,
  },
  message: {
    flexDirection: "row",
    alignItems: "center",
  },
  likes: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 24,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
});
