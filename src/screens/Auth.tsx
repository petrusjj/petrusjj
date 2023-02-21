import { FontAwesome } from "@expo/vector-icons";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { AuthContext } from "../providers/AuthProvider";

const Authentication = () => {
  const { googleSignIn } = useContext(AuthContext);

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
