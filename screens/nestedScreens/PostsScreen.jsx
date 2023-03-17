import { isLoading } from "expo-font";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
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

const initialState = {
  photo: "https://loremflickr.com/640/480/city",
  name: "Photo",
  location: "Chercasy",
  coords: {
    accuracy: 14.286999702453613,
    altitude: 124.9000015258789,
    altitudeAccuracy: 1,
    heading: 0,
    latitude: 49.4323244,
    longitude: 32.0763013,
    speed: 0,
  },
  comments: 50,
  likes: 524,
};

export default function PostsScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  // console.log(route.params);
  // const fetchPosts = () => {
  //   fetch("https://6404410580d9c5c7bac3f01d.mockapi.io/userPosts")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((posts) => {
  //       setPosts(posts);
  //     })
  //     .catch((error) => {
  //       Alert.alert("Помилка", "Помилка завантаження");
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  useEffect(() => {
    // fetchPosts();
    if (route.params) {
      setPosts((prevstate) => [...prevstate, route.params.state]);
    }

    if (posts) {
      setIsLoading(false);
    }
  }, [route.params]);

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
        <Image
          style={styles.avatarImage}
          source={{ uri: "https://loremflickr.com/640/480/abstract" }}
        />
        <View style={styles.userData}>
          <Text style={styles.userName}>Yurii Senenko</Text>
          <Text style={styles.userEmail}>yuriisenenko@mail.com</Text>
        </View>
      </View>
      <View style={styles.postsListContainer}>
        <FlatList
          style={styles.postsList}
          refreshControl={
            <RefreshControl refreshing={isLoading} />
            // <RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />
          }
          data={posts}
          renderItem={({ item }) => (
            <Post
              goComment={() => navigation.navigate("Коментарі", { item })}
              goMap={() => navigation.navigate("Карта", { item })}
              photo={item.photo}
              name={item.name}
              comments={35}
              likes={540}
              location={item.location}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: backgroundColor,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderTitle: {
    marginTop: 15,
    fontSize: 20,
  },
  userCard: {
    flexDirection: "row",
    height: 60,
    width: "50%",
    marginTop: 32,
    marginBottom: 32,
    marginLeft: 16,
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  userData: {
    justifyContent: "center",
  },
  userName: {
    fontFamily: "Roboto-700",

    fontSize: 13,
  },
  userEmail: {
    fontFamily: "Roboto-400",

    fontSize: 11,
  },
  postsListContainer: {
    // marginHorizontal: 16,
    // paddingLeft: 16,
    // paddingRight: 16,
  },
  postsList: {
    // paddingLeft: 16,
    // paddingRight: 16,
  },
});
