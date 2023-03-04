import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import React, { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import { currentUserAtom } from "../store/jotai";
import { spacer } from "../theme/spacing";
import { heading } from "../theme/typography";
import { RootStackParamList } from "../types/navigation";

const Header = () => {
  const { navigate } = useNavigation<RootStackParamList>();

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
          <Text style={styles.buttonText}>Resume</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToFitness}>
          <Text style={styles.buttonText}>Fitness</Text>
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
    paddingTop: spacer.spacer4,
    paddingHorizontal: spacer.spacer4,
  },
  safearea: {
    borderRadius: 2,
    paddingHorizontal: spacer.spacer4,
    flexDirection: "row",
    alignItems: "center",
    height: 80,
  },
  button: {
    marginRight: 32,
  },
  buttonText: {
    ...heading.title1,
  },
  spacer: {
    flex: 1,
  },
});
