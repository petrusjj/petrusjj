import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import useAuth from "../hooks/useAuth";
import { currentUserAtom } from "../store/jotai";

const Authentication = () => {
  const { navigate } = useNavigation();
  const { googleSignIn } = useAuth();

  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  useEffect(() => {
    if (currentUser) {
      navigate("protected", { screen: "fitness" });
    }
  }, [currentUser]);

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
