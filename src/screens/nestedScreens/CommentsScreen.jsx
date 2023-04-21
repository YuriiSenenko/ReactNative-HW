import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { styles } from "./CommentsScreen.styles";
import {
  TouchableWithoutFeedback,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import { colors } from "../../styles/colors";
const {
  backgroundColor,
  acentColor,
  inputBackgroundColor,
  borderColor,
  placeholderColor,
} = colors;
import { getUser } from "../../redux/auth/authReducer";
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
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [comment, setComment] = useState();
  const [allComments, setAllComments] = useState([]);
  const { photo, id } = route.params.photo;
  const { userId, avatar } = useSelector(getUser);

  const firestoreCloud = getFirestore(); // ініціалізація firestore

  useEffect(() => {
    getAllComments();
  }, []);

  //! Закриття клавіатури
  const keboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  //! Створюємо і відправляємо на сервер новий коментар
  const createComment = async () => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const currentDate = new Date();
    const commentDate = `${currentDate.toLocaleDateString(
      "uk-uk",
      options
    )} | ${currentDate.toLocaleTimeString("uk-uk")}`;

    if (!comment) {
      Alert.alert("Напиши пару слів в коментар");
      return;
    }
    const newComment = {
      date: commentDate,
      postId: id,
      comment: comment,
      owner: userId,
    };
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
      <TouchableWithoutFeedback onPress={keboardHide}>
        <Image
          style={{ ...styles.photo, marginLeft: 16 }}
          source={{ uri: photo }}
        />
      </TouchableWithoutFeedback>
      <FlatList
        style={styles.postsList}
        data={allComments}
        renderItem={({ item }) =>
          item.owner === userId ? (
            <OwnComment
              avatar={avatar}
              comment={item.comment}
              date={item.date}
            />
          ) : (
            <GuestComment
              avatar={"https://loremflickr.com/640/480/people"}
              comment={item.comment}
              date={item.date}
            />
          )
        }
        keyExtractor={(item) => item.id}
      />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
        <View
          style={{
            ...styles.inputContainer,
            marginBottom: isShowKeyboard ? 100 : 16,
          }}
        >
          <TextInput
            style={styles.input}
            multiline={true}
            inputMode={"text"}
            placeholder={"Коментувати..."}
            placeholderTextColor={placeholderColor}
            cursorColor={acentColor}
            value={comment}
            onChangeText={(value) => setComment(value)}
            onFocus={() => {
              setIsShowKeyboard(true);
            }}
            onBlur={() => {
              setIsShowKeyboard(false);
            }}
          ></TextInput>
          <TouchableOpacity
            style={styles.sendBTN}
            activeOpacity={0.6}
            onPress={() => {
              createComment();
              keboardHide();
            }}
          >
            <AntDesign name="arrowup" size={24} color={backgroundColor} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
