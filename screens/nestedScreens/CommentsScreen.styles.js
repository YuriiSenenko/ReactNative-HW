import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
const {
  backgroundColor,
  acentColor,
  imputBackgroundColor,
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
  commentsList: {},

  commentContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 24,
  },
  commentGuest: {
    flexDirection: "row-reverse",
    marginHorizontal: 16,
    marginBottom: 24,
  },

  userAvatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  commentView: {
    flex: 1,
    padding: 16,
    marginLeft: 16,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    backgroundColor: imputBackgroundColor,
  },
  commentText: {},
  commentData: {
    marginTop: 8,
    color: placeholderColor,
    alignSelf: "flex-end",
  },
  commentGuestView: {
    flex: 1,
    marginRight: 16,
    padding: 16,
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    backgroundColor: imputBackgroundColor,
  },
  commentGuestText: {},
  commentGuestData: {
    marginTop: 8,
    color: placeholderColor,
    alignSelf: "flex-start",
  },
  inputContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    paddingLeft: 16,
    paddingRight: 45,
    height: 50,
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: imputBackgroundColor,
    borderColor: borderColor,
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
