import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { globalStyle } from "../styles/globalStyle";

export default function ActiveSubmitBtn({ children, submit }) {
  return (
    <TouchableOpacity
      style={{ ...globalStyle.btn, ...styles.btn }}
      activeOpacity={0.7}
      onPress={submit}
    >
      <Text style={styles.btnTitle}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#FF6C00",
  },
  btnTitle: {
    fontSize: 16,
    color: "#fff",
  },
});
