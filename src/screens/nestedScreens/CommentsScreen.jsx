import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { styles } from "./CommentsScreen.styles";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { colors } from "../../styles/colors";
const {
  backgroundColor,
  acentColor,
  inputBackgroundColor,
  borderColor,
  placeholderColor,
} = colors;

import { OwnComment, GuestComment } from "../../components/Comment";

// import Firebase
import app from "../../firebase/config";
import {
  onSnapshot,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";

// import icons
import { AntDesign } from "@expo/vector-icons";

export default CommentsScreen = ({ navigation, route }) => {
  const [comment, setComment] = useState();
  const [allComments, setAllComments] = useState([]);
  const { photo, id } = route.params.photo;
  const { userId, avatar } = useSelector((state) => state.auth);

  const firestoreCloud = getFirestore(); // ініціалізація firestore

  useEffect(() => {
    getAllComments();
  }, []);

  //! Створюємо і відправляємо на сервер новий коментар
  const createComment = async () => {
    if (!comment) {
      Alert.alert("Напиши пару слів в коментар");
      return;
    }
    const newComment = { postId: id, comment: comment, owner: userId };
    await addDoc(
      collection(firestoreCloud, "posts", id, "comments"),
      newComment
    );
    setComment(null);
  };

  //! Отримуємо всі коментарі
  const getAllComments = async () => {
    const connentsRef = collection(firestoreCloud, "posts", id, "comments");
    onSnapshot(connentsRef, (collection) => {
      setAllComments(
        collection.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ ...styles.photo, marginLeft: 16 }}
        source={{ uri: photo }}
      />
      <FlatList
        style={styles.postsList}
        data={allComments}
        renderItem={({ item }) =>
          item.owner === userId ? (
            <OwnComment
              avatar={avatar}
              comment={item.comment}
              date="10 Червня 2023 | 09: 15"
            />
          ) : (
            <GuestComment
              avatar={"https://loremflickr.com/640/480/people"}
              comment={item.comment}
              date="10 Червня 2023 | 09: 25"
            />
          )
        }
        keyExtractor={(item) => item.id}
      />
      {/* <ScrollView>
        <View style={styles.commentsList}>
          <OwnComment
            avatar={avatar}
            comment="vjdvfbjdfvbhksdfhvbksdfhvbkdfhvb"
            date="10 Червня 2023 | 09: 15"
          />
          <GuestComment
            avatar={"https://loremflickr.com/640/480/people"}
            comment="vjdvfbjdfvbhksdfhvbksdfhvbkdfhvb"
            date="10 Червня 2023 | 09: 25"
          />
        </View>
      </ScrollView> */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          multiline={true}
          inputMode={"text"}
          placeholder={"Коментувати..."}
          placeholderTextColor={placeholderColor}
          cursorColor={acentColor}
          value={comment}
          onChangeText={(value) => setComment(value)}
        ></TextInput>
        <TouchableOpacity
          style={styles.sendBTN}
          activeOpacity={0.6}
          onPress={createComment}
        >
          <AntDesign name="arrowup" size={24} color={backgroundColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
