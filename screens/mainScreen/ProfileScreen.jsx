import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
        <ActivityIndicator size="large" color={acentColor} />
        <Text style={styles.loaderTitle}>Завантаження...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/sea.jpg")}
        style={styles.backgroundImg}
      >
        <View>
          <View style={styles.profile}>
            <Feather
              style={styles.logoutIcon}
              name="log-out"
              size={24}
              color={placeholderColor}
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
                <Feather name="x-circle" size={25} color={borderColor} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={[globalStyle.title, styles.title]}>Name</Text>
            </View>
            <View>
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
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default ProfileScreen;
