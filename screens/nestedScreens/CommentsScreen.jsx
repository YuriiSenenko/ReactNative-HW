import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { colors } from "../../styles/colors";
const {
  backgroundColor,
  acentColor,
  imputBackgroundColor,
  borderColor,
  placeholderColor,
} = colors;

import { OwnComment, GuestComment } from "../../components/Comment";

// import icons
import { AntDesign } from "@expo/vector-icons";

export default CommentsScreen = ({ navigation, route }) => {
  const user = {};

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          style={{ ...styles.photo, marginLeft: 16 }}
          source={{ uri: route.params.item.photo }}
        />
        <View style={styles.commentsList}>
          <OwnComment
            avatar={"https://loremflickr.com/640/480/people"}
            comment="vjdvfbjdfvbhksdfhvbksdfhvbkdfhvb"
            date="10 Червня 2023 | 09: 15"
          />
          <GuestComment
            avatar={"https://loremflickr.com/640/480/people"}
            comment="vjdvfbjdfvbhksdfhvbksdfhvbkdfhvb"
            date="10 Червня 2023 | 09: 25"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            multiline={true}
            inputMode={"text"}
            placeholder={"Коментувати..."}
            placeholderTextColor={placeholderColor}
            cursorColor={acentColor}
            // value={}
          ></TextInput>
          <TouchableOpacity
            style={styles.sendBTN}
            activeOpacity={0.6}
            // onPress={() => navigation.navigate("Login")}
          >
            <AntDesign name="arrowup" size={24} color={backgroundColor} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
