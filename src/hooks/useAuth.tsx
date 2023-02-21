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

WebBrowser.maybeCompleteAuthSession();

type IUseAuth = {
  googleSignIn: () => void;
  logout: () => void;
  currentUser: any;
  setCurrentUser: (_: any) => void;
};

export default (): IUseAuth => {
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
  }, []);

  const checkIfLoggedIn = useCallback(async () => {
    if (currentUser) return;
    const raw = await AsyncStorage.getItem("currentUser");
    if (!raw) return;
    const user = JSON.parse(raw);
    setCurrentUser(user);
  }, [currentUser]);

  useEffect(() => {
    if (response?.type === "success") {
      authenticate(response);
    }
  }, [response]);

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const authenticate = useCallback(async (response: any) => {
    const { id_token } = response.params;
    const auth = getAuth();
    const credential = GoogleAuthProvider.credential(id_token);
    const user = await signInWithCredential(auth, credential);
    if (!user) return; // TODO: show error modal
    await AsyncStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);
  }, []);

  return { googleSignIn, logout, currentUser, setCurrentUser };
};
