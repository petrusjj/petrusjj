import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigator from "./navigation/Navigator";
import AuthProvider from "./providers/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar style="auto" />
        <Navigator />
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
});
