import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Resume = () => {
  return (
    <View style={styles.container}>
      <Text>Resume</Text>
    </View>
  );
};

export default Resume;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
