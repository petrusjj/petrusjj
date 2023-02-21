import { FontAwesome } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, View } from "react-native";
import useAuth from "../hooks/useAuth";

WebBrowser.maybeCompleteAuthSession();

const Authentication = () => {
  const { googleSignIn } = useAuth();

  return (
    <View style={styles.container}>
      <FontAwesome.Button
        name="google"
        backgroundColor="#4285F4"
        onPress={googleSignIn}
      >
        Login with Google
      </FontAwesome.Button>
    </View>
  );
};

export default Authentication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
