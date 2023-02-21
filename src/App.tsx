import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, View } from "react-native";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential
} from "firebase/auth";
import * as React from "react";
import { useCallback, useEffect } from "react";

import { getFunctions, httpsCallable } from "firebase/functions";
import Download from "./components/Download";

import { FIREBASE_CLIENT_ID } from "@env";

const functions = getFunctions();

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: FIREBASE_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === "success") authenticate(response);
  }, [response]);

  const authenticate = useCallback(async (response: any) => {
    const { id_token } = response.params;
    const auth = getAuth();
    const credential = GoogleAuthProvider.credential(id_token);
    const user = await signInWithCredential(auth, credential);
    console.log(user);
  }, []);

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
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
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
