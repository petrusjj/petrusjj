import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useFirestore from "../hooks/useFirestore";

const Resume = () => {
  const { listEmployments, addDocument } = useFirestore();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={listEmployments}>
        <Text>Test</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={addDocument}>
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Resume;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
