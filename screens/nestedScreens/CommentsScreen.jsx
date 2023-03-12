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

// import icons
import { AntDesign } from "@expo/vector-icons";

export default CommentsScreen = ({ route }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image style={styles.photo} source={{ uri: route.params.item.photo }} />
        <View style={styles.commentsList}>
          <View style={{ ...styles.comment, flexDirection: "row" }}>
            <Image
              style={styles.userAvatar}
              source={{ uri: route.params.item.photo }}
            />
            <View style={styles.commentText}>
              <Text>
                Коментар власника аккаунта Коментар власника аккаунта Коментар
                власника аккаунта
              </Text>
              <Text>10 Червня 2023 | 09: 15</Text>
            </View>
          </View>
          <View style={styles.commentGuest}>
            <Image
              style={styles.userAvatar}
              source={{ uri: "https://loremflickr.com/640/480/people" }}
            />
            <View style={styles.commentTextGuest}>
              <Text>
                Коментар гостя Коментар гостя Коментар гостя Коментар гостя
                Коментар гостя
              </Text>
              <Text>10 Червня 2023 | 09: 15</Text>
            </View>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            inputMode={"text"}
            placeholder={"Коментувати..."}
            placeholderTextColor={"#BDBDBD"}
            cursorColor={"#FF6C00"}
            // value={}
          ></TextInput>
          <TouchableOpacity
            style={styles.sendBTN}
            activeOpacity={0.6}
            // onPress={() => navigation.navigate("Login")}
          >
            <AntDesign name="arrowup" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
  },
  photo: {
    marginTop: 32,
    marginBottom: 32,
    height: 240,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  commentsList: {},

  comment: {
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
  commentText: {
    flex: 1,
    marginLeft: 16,
    padding: 16,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  commentTextGuest: {
    flex: 1,
    marginRight: 16,
    padding: 16,
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  inputContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    paddingLeft: 16,
    height: 50,
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
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
    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },
});
