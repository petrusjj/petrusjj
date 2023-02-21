import { AntDesign } from "@expo/vector-icons";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Download from "../components/Download";
import useAuth from "../hooks/useAuth";
import { AuthContext } from "../providers/AuthProvider";

const Resume = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const { logout } = useAuth();

  const {
    user: { displayName },
  } = currentUser;

  return (
    <View style={styles.container}>
      <Text>{displayName}</Text>
      <AntDesign.Button
        name="google"
        backgroundColor="#EE4B2B"
        onPress={logout}
      >
        Logout
      </AntDesign.Button>
      <Download />
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
