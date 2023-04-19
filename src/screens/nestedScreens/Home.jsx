import { isLoading } from "expo-font";
import { useSelector } from "react-redux";

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
import { styles } from "./Home.styles";
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
  const { avatar, login, email } = useSelector((state) => state.auth);

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

    console.log(`Кількість коментарів: ${id}: ${commentCount}`);
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

//! *************************
// import React from "react";
// import { useDispatch } from "react-redux";
// import { logOut } from "../../redux/auth/actions";

// import PostsScreen from "../mainScreen/PostsScreen";
// import CommentsScreen from "./CommentsScreen";
// import MapScreen from "./MapScreen";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { colors } from "../../styles/colors";
// const { textColor, placeholderColor, goBackIconColor } = colors;

// // import icons
// import { Feather } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";

// const NestedScreen = createNativeStackNavigator();

// export const Home = () => {
//   const dispatch = useDispatch();
//   const logOutUser = () => {
//     dispatch(logOut());
//   };

//   return (
//     <NestedScreen.Navigator
//       screenOptions={{
//         headerTitleAlign: "center",
//         headerTitleStyle: {
//           fontFamily: "Roboto-500",
//           fontSize: 17,
//           color: textColor,
//         },
//         tabBarShowLabel: false,
//       }}
//     >
//       <NestedScreen.Screen
//         // options={{ headerShown: false }}
//         name="Публікації"
//         component={PostsScreen}
//         options={{
//           headerRight: () => (
//             <Feather
//               onPress={logOutUser}
//               name="log-out"
//               size={24}
//               color={placeholderColor}
//             />
//           ),
//           headerShadowVisible: true,
//         }}
//       />
//       <NestedScreen.Group
//         screenOptions={({ navigation }) => ({
//           presentation: "modal",
//           tabBarStyle: { display: "none" },
//           headerLeft: () => (
//             <AntDesign
//               onPress={() => navigation.goBack()}
//               name="arrowleft"
//               size={24}
//               color={goBackIconColor}
//             />
//           ),
//         })}
//       >
//         <NestedScreen.Screen
//           // options={{ barStyle: { display: "none" } }}
//           name="Коментарі"
//           component={CommentsScreen}
//         />
//         <NestedScreen.Screen
//           // options={{ barStyle: { display: "none" } }}
//           name="Карта"
//           component={MapScreen}
//         />
//       </NestedScreen.Group>
//     </NestedScreen.Navigator>
//   );
// };
