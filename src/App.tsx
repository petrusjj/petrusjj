import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { useEffect } from "react";

import Download from "./components/Download";

import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable
} from "firebase/functions";

const functions = getFunctions();

connectFunctionsEmulator(functions, "localhost", 5001);

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      init();
    }, 2000);
  }, []);

  const init = async () => {
    const helloWorld = httpsCallable(functions, "helloWorld");
    const { data } = await helloWorld();
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Download />
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
