import { FIREBASE_CLIENT_ID } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithCredential
} from "firebase/auth";
import { useCallback, useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";

type IUseAuth = {
  googleSignIn: () => void;
  logout: () => void;
};

export default (): IUseAuth => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

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

  useEffect(() => {
    console.log("effect response", currentUser, response);
    if (!currentUser && response?.type === "success") {
      console.log("effect response inside", currentUser, response);
      authenticate(response);
    }
  }, [response]);

  const authenticate = useCallback(async (response: any) => {
    const { id_token } = response.params;
    const auth = getAuth();
    const credential = GoogleAuthProvider.credential(id_token);
    const user = await signInWithCredential(auth, credential);
    if (!user) return; // TODO: show error modal
    await AsyncStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);
  }, []);

  return { googleSignIn, logout };
};
