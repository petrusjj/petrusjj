import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import AuthProvider from "./providers/AuthProvider";
import Resume from "./screens/Resume";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AuthProvider>
        <Resume />
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
