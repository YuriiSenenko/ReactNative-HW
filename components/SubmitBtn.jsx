import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../styles/colors";

export const SubmitBtn = ({ submit, title, bgColor, titleColor }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.btn, backgroundColor: bgColor }}
      activeOpacity={0.7}
      onPress={submit}
    >
      <Text style={{ ...styles.btnTitle, color: titleColor }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    height: 51,
    borderRadius: 100,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    fontFamily: "Roboto-400",
    fontSize: 16,
    lineHeight: 18.75,
  },
});
