import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
// import icons
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

const Post = ({
  photo,
  title,
  comments,
  likes,
  location,
  goComment,
  goMap,
}) => {
  return (
    <View style={styles.postContainer}>
      <Image style={styles.photo} source={{ uri: photo }} />

      <Text style={styles.photoName}>{title}</Text>
      <View style={styles.fotoDescription}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.message}
            onPress={goComment}
          >
            <Feather name="message-circle" size={24} color="#FF6C00" />
            <Text style={{ marginLeft: 6 }}>{comments}</Text>
          </TouchableOpacity>
          <View style={styles.likes}>
            <AntDesign name="like2" size={24} color="#FF6C00" />
            <Text style={{ marginLeft: 6 }}>{likes}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.location} onPress={goMap}>
          <SimpleLineIcons name="location-pin" size={24} color="#BDBDBD" />
          <Text style={{ marginLeft: 4 }}>{location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 32,
    marginHorizontal: 16,
  },
  photo: {
    height: 240,
    borderRadius: 8,
  },
  photoName: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 16,
  },
  fotoDescription: {
    flexDirection: "row",
    justifyContent: "space-between",
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
export default Post;
