import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import React, { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import { currentUserAtom } from "../store/jotai";

const Header = () => {
  const { navigate } = useNavigation();

  const { logout } = useAuth();

  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  const navigateToResume = useCallback(() => {
    navigate("public", { screen: "resume" });
  }, []);

  const navigateToFitness = useCallback(() => {
    if (!currentUser) return navigate("public", { screen: "auth" });
    return navigate("protected", { screen: "fitness" });
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
        {currentUser ? (
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
    alignItems: 'center',
    height: 80,
  },
  button: {
    marginRight: 32,
  },
  spacer: {
    flex: 1,
  },
});
