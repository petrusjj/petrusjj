import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../providers/AuthProvider";

const Header = () => {
  const { navigate } = useNavigation();

  const { hydrating, currentUser, logout } = useContext(AuthContext);

  const navigateToResume = useCallback(() => {
    navigate("public", { screen: "resume" });
  }, []);

  const navigateToFitness = useCallback(() => {
    navigate(currentUser ? "protected" : "public", {
      screen: currentUser ? "fitness" : "auth",
    });
  }, [currentUser]);

  return (
    <View style={styles.header}>
      <SafeAreaView style={styles.safearea}>
        <TouchableOpacity style={styles.button} onPress={navigateToResume}>
          <Text>Resume</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToFitness}>
          <Text>Fitness</Text>
        </TouchableOpacity>
        <View style={styles.spacer} />
        {!hydrating && currentUser ? (
          <AntDesign.Button
            name="google"
            backgroundColor="#EE4B2B"
            onPress={logout}
          >
            Logout
          </AntDesign.Button>
        ) : null}
      </SafeAreaView>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    alignItems: "stretch",
  },
  safearea: {
    paddingHorizontal: 16,
    flexDirection: "row",
    backgroundColor: "#CCCCCC",
  },
  button: {
    marginRight: 32,
  },
  spacer: {
    flex: 1,
  },
});
