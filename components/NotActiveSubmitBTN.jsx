import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { globalStyle } from "../styles/globalStyle";

export default function NotActiveSubmitBTN({ children, submit }) {
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
    backgroundColor: "#F6F6F6",
  },
  btnTitle: {
    fontSize: 16,
    color: "#BDBDBD",
  },
});
