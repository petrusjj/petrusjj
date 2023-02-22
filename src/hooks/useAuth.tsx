import { FIREBASE_CLIENT_ID } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential
} from "firebase/auth";
import { useCallback, useEffect, useState } from "react";

import * as WebBrowser from "expo-web-browser";
import { navigationRef } from "../navigation/NavigationRef";

WebBrowser.maybeCompleteAuthSession();

type IUseAuth = {
  hydrating: boolean;
  googleSignIn: () => void;
  logout: () => void;
  currentUser: any;
  setCurrentUser: (_: any) => void;
};

export default (): IUseAuth => {
  const [hydrating, setHydrating] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: FIREBASE_CLIENT_ID,
  });

  const googleSignIn = useCallback(() => {
    promptAsync();
  }, [promptAsync]);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigationRef?.navigate("public");
  }, []);

  const proceed = useCallback((user: any) => {
    setCurrentUser(user);
    setTimeout(() => {
      setHydrating(false);
    }, 1000);
  }, []);

  const checkIfLoggedIn = useCallback(async () => {
    setHydrating(true);
    let user: any = false;
    if (currentUser) return proceed(user);
    const raw = await AsyncStorage.getItem("currentUser");
    if (!raw) return proceed(user);
    user = JSON.parse(raw);
    proceed(user);
  }, [currentUser]);

  useEffect(() => {
    if (response?.type === "success") {
      authenticate(response);
    }
  }, [response]);

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const authenticate = useCallback(
    async (response: any) => {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      const user = await signInWithCredential(auth, credential);
      if (!user) return; // TODO: show error modal
      await AsyncStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(user);
      setTimeout(() => {
        navigationRef?.navigate("protected", { screen: "fitness" });
      }, 0);
    },
    [navigationRef]
  );

  return { hydrating, googleSignIn, logout, currentUser, setCurrentUser };
};
