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
  orderBy,
  query,
  doc,
  updateDoc,
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
  SafeAreaView,
} from "react-native";

import Post from "../../components/Post";
import { colors } from "../../styles/colors";
const { backgroundColor, acentColor } = colors;

export default function PostsScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const { avatar, login, email, userId } = useSelector(getUser);

  const firestoreCloud = getFirestore(app);

  useEffect(() => {
    getAllPosts();
  }, []);

  //! Отримання всіх постів
  const getAllPosts = async () => {
    const postsRef = query(
      collection(firestoreCloud, "posts"),
      orderBy("date", "desc")
    );
    onSnapshot(postsRef, (collection) => {
      const allPosts = collection.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setPosts(allPosts);
    });

    setIsLoading(false);
  };

  // //! Лічильник лайків
  const likesCounter = (postId, likesUsers) => {
    let arr = likesUsers;
    const index = arr.findIndex((element, index) => element.userId === userId);
    if (index === -1) {
      arr.push({ login, userId });
    } else {
      arr.splice(index, 1);
    }
    const postForUpdate = doc(firestoreCloud, "posts", postId);
    updateDoc(postForUpdate, {
      likesUsers: arr,
      likesCounter: arr.length,
    });
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
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.userCard}>
        <Image style={styles.avatarImage} source={{ uri: avatar }} />
        <View style={styles.userData}>
          <Text style={styles.userName}>{login}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View> */}
      <View style={styles.postsListContainer}>
        <FlatList
          style={styles.postsList}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={getAllPosts} />
          }
          data={posts}
          ListHeaderComponent={
            <View style={styles.userCard}>
              <Image style={styles.avatarImage} source={{ uri: avatar }} />
              <View style={styles.userData}>
                <Text style={styles.userName}>{login}</Text>
                <Text style={styles.userEmail}>{email}</Text>
              </View>
            </View>
          }
          renderItem={({ item }) => (
            <Post
              goComment={() =>
                navigation.navigate("Коментарі", { photo: item })
              }
              goMap={() => navigation.navigate("Карта", { item })}
              likeCounter={() => likesCounter(item.id, item.likesUsers)}
              photo={item.photo}
              title={item.title}
              comments={item.commentsCounter}
              likes={item.likesCounter}
              location={item.location}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}
