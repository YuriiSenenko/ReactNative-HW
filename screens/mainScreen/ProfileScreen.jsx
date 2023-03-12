import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { globalStyle } from "../../styles/globalStyle";

import Post from "../../components/Post";

// import icons
import { Feather } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
// import { SimpleLineIcons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState(null);

  const fetchPosts = () => {
    fetch("https://6404410580d9c5c7bac3f01d.mockapi.io/userPosts")
      .then((response) => {
        return response.json();
      })
      .then((posts) => {
        setPosts(posts);
      })
      .catch((error) => {
        Alert.alert("Помилка", "Помилка завантаження");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
    // setPosts(post.params.state);
    if (posts) {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FF6C00" />
        <Text style={styles.loaderTitle}>Завантаження...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/sea.jpg")}
        style={styles.backgroundImg}
      >
        <View style={styles.profile}>
          <Feather
            style={styles.logoutIcon}
            name="log-out"
            size={24}
            color="#BDBDBD"
          />
          <View
            style={{
              ...styles.avatarView,
              left: dimensions / 2 - 60,
            }}
          >
            <Image
              style={styles.avatarImage}
              source={require("../../assets/images/avatar_img.jpg")}
            />
            <TouchableOpacity
              style={styles.addIcon}
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Feather name="x-circle" size={25} color="#E8E8E8" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ ...globalStyle.title, ...styles.title }}>Name</Text>
          </View>

          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Коментарі", { item })}
              >
                <Post
                  photo={item.photo}
                  decription={item.decription}
                  comments={item.comments}
                  likes={item.likes}
                  location={item.location}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#FEFEFE",
  },
  backgroundImg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
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
  profile: {
    marginTop: 147,
    backgroundColor: "#FEFEFE",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatarView: {
    position: "absolute",
    top: -60,
    // borderRadius: 16,
    width: 120,
    height: 120,
  },
  avatarImage: {
    height: 120,
    width: 120,
    borderRadius: 16,
  },
  addIcon: {
    position: "absolute",
    top: 80,
    right: -12,
    // backgroundColor: "#fff",
    // borderRadius: 50,
  },
  logoutIcon: {
    position: "absolute",
    right: 16,
    top: 22,
  },
  title: {
    marginTop: 92,
  },
  // postsListContainer: { marginHorizontal: 16 },
  postContainer: { marginBottom: 32 },
  photo: {
    height: 240,
    borderRadius: 8,
  },
  photoName: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 500,
  },
  message: {
    flexDirection: "row",
    alignItems: "center",
  },
  likes: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 24,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default ProfileScreen;
