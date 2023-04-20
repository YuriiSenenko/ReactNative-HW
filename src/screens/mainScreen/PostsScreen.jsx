import { isLoading } from "expo-font";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/auth/authReducer";

// import Firebase
import app from "../../firebase/config";
// import { getFirestore } from "firebase/firestore";
import {
  getFirestore,
  collection,
  onSnapshot,
  getCountFromServer,
} from "firebase/firestore";

import React, { useState, useEffect } from "react";
import { styles } from "./PostsScreen.styles";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import Post from "../../components/Post";
import { colors } from "../../styles/colors";
const { backgroundColor, acentColor } = colors;

export default function PostsScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { avatar, login, email } = useSelector(getUser);

  const firestoreCloud = getFirestore(app);

  useEffect(() => {
    getAllPosts();
  }, []);

  //! Отримання всіх постів
  const getAllPosts = async () => {
    const postsRef = collection(firestoreCloud, "posts");

    onSnapshot(postsRef, (collection) => {
      const allPosts = collection.docs.map((doc) => {
        commentsCount(doc.id);
        return {
          ...doc.data(),
          id: doc.id,
          countOfComments: 5,
          countOfLikes: 10,
        };
      });
      setPosts(allPosts);
    });

    setIsLoading(false);
  };

  //! Лічильний коментарів
  const commentsCount = async (id) => {
    const commentsRef = collection(firestoreCloud, "posts", id, "comments");
    const snapshot = await getCountFromServer(commentsRef);
    const commentCount = snapshot.data().count;

    // console.log(`Кількість коментарів: ${id}: ${commentCount}`);
    return commentCount;
  };

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={acentColor} />
        <Text style={styles.loaderTitle}>Завантаження...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.userCard}>
        <Image style={styles.avatarImage} source={{ uri: avatar }} />
        <View style={styles.userData}>
          <Text style={styles.userName}>{login}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View>
      <View style={styles.postsListContainer}>
        <FlatList
          style={styles.postsList}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={getAllPosts} />
          }
          data={posts}
          renderItem={({ item }) => (
            <Post
              goComment={() =>
                navigation.navigate("Коментарі", { photo: item })
              }
              goMap={() => navigation.navigate("Карта", { item })}
              photo={item.photo}
              title={item.title}
              // comments={item.countOfComments}
              // likes={item.countOfLikes}
              comments="10"
              likes="10"
              location={item.location}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}
