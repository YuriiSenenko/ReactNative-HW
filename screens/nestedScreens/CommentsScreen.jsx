import React from "react";
import { styles } from "./CommentsScreen.styles";
import {
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
