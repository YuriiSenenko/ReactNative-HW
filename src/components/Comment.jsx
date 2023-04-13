import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { commentsGlobalStyle } from "../styles/globalStyle";

const OwnComment = ({ avatar, comment, date }) => {
  return (
    <View
      style={[commentsGlobalStyle.commentSection, styles.commentOwnSection]}
    >
      <Image style={styles.userAvatar} source={{ uri: avatar }} />
      <View style={[commentsGlobalStyle.commentView, styles.commentView]}>
        <Text style={commentsGlobalStyle.commentText}>{comment}</Text>
        <Text style={[commentsGlobalStyle.commentDate, styles.commentDate]}>
          {date}
        </Text>
      </View>
    </View>
  );
};

const GuestComment = ({ avatar, comment, date }) => {
  return (
    <View
      style={[commentsGlobalStyle.commentSection, styles.commentGuestSection]}
    >
      <Image style={styles.userAvatar} source={{ uri: avatar }} />
      <View style={[commentsGlobalStyle.commentView, styles.commentGuestView]}>
        <Text style={commentsGlobalStyle.commentText}>{comment}</Text>
        <Text
          style={[commentsGlobalStyle.commentDate, styles.commentGuestDate]}
        >
          {date}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentOwnSection: {
    flexDirection: "row",
  },

  userAvatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  commentView: {
    marginLeft: 16,
    borderTopRightRadius: 6,
  },

  commentDate: {
    alignSelf: "flex-end",
  },
  commentGuestSection: {
    flexDirection: "row-reverse",
  },
  commentGuestView: {
    marginRight: 16,
    borderTopLeftRadius: 6,
  },
  commentGuestDate: {
    alignSelf: "flex-start",
  },
});

export { OwnComment, GuestComment };
