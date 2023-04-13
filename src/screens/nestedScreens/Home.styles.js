import { StyleSheet } from "react-native";
import { colors } from "../../src/styles/colors";
const { backgroundColor, acentColor } = colors;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: backgroundColor,
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
  userCard: {
    flexDirection: "row",
    height: 60,
    width: "50%",
    marginTop: 32,
    marginBottom: 32,
    marginLeft: 16,
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  userData: {
    justifyContent: "center",
  },
  userName: {
    fontFamily: "Roboto-700",

    fontSize: 13,
  },
  userEmail: {
    fontFamily: "Roboto-400",

    fontSize: 11,
  },
  postsListContainer: {
    // marginHorizontal: 16,
    // paddingLeft: 16,
    // paddingRight: 16,
  },
  postsList: {
    // paddingLeft: 16,
    // paddingRight: 16,
  },
});
