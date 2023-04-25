import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "./ProfileScreen.styles";
import {
  ImageBackground,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  SectionList,
} from "react-native";
import { globalStyle } from "../../styles/globalStyle";
import { colors } from "../../styles/colors";
const { acentColor, borderColor, placeholderColor } = colors;

import Post from "../../components/Post";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { getUser } from "../../redux/auth/authReducer";

// import Firebase
import app from "../../firebase/config";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  query,
  onSnapshot,
  where,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";

// import icons
import { Feather } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
// import { SimpleLineIcons } from "@expo/vector-icons";

export const ProfileScreen = ({ navigation, route }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { avatar, login, userId, email } = useSelector(getUser);

  const dispatch = useDispatch();
  const firestoreCloud = getFirestore(app);

  useEffect(() => {
    getAllPostsByOwner();
  }, []);

  const logOutUser = () => {
    // alert("Exit");
    dispatch(authSignOutUser());
  };

  //! Отримання всіх постів власника
  const getAllPostsByOwner = async () => {
    // Посилання на каталог "posts" в БД і умову фільтрації
    const postsRef = query(
      collection(firestoreCloud, "posts"),
      orderBy("date", "desc"),
      where("owner", "==", userId)
    );

    // const q = query(postsRef, orderBy("date", "desc"));
    // Отримання колекції і обробка даних
    onSnapshot(postsRef, (collection) => {
      const allPosts = collection.docs.map((doc) => {
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
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require("../../../assets/images/sea.jpg")}
        style={styles.backgroundImg}
      >
        <View>
          <View style={styles.profile}>
            <TouchableOpacity
              style={styles.logoutButton}
              activeOpacity={0.2}
              onPress={logOutUser}
            >
              <Feather name="log-out" size={24} color={placeholderColor} />
            </TouchableOpacity>

            <View
              style={{
                ...styles.avatarView,
                left: dimensions / 2 - 60,
              }}
            >
              <Image style={styles.avatarImage} source={{ uri: avatar }} />
              <TouchableOpacity
                style={styles.deleteIcon}
                activeOpacity={0.2}
                onPress={() => console.log("Зм")}
              >
                <Feather name="x-circle" size={25} color={borderColor} />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={[globalStyle.title, styles.title]}>{login}</Text>
            </View>
            <View>
              <FlatList
                data={posts}
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
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};
