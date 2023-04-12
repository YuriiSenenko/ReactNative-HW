import { isLoading } from "expo-font";
import { useSelector } from "react-redux";

import { getUser } from "../../redux/auth/selectors";
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
  const state = useSelector((state) => state);
  const { avatar, login, email } = state.auth;

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
