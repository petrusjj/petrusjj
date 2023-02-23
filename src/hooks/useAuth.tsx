import {
  FIREBASE_CLIENT_ID_ANDROID,
  FIREBASE_CLIENT_ID_IOS,
  FIREBASE_CLIENT_ID_WEB
} from "@env";
import * as Google from "expo-auth-session/providers/google";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential
} from "firebase/auth";
import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";

import * as WebBrowser from "expo-web-browser";
import { navigationRef } from "../navigation/NavigationRef";
import { currentUserAtom } from "../store/jotai";

WebBrowser.maybeCompleteAuthSession();

type IUseAuth = {
  googleSignIn: () => void;
  logout: () => void;
  currentUser: any;
  setCurrentUser: (_: any) => void;
};

export default (): IUseAuth => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: FIREBASE_CLIENT_ID_WEB,
    iosClientId: FIREBASE_CLIENT_ID_IOS,
    androidClientId: FIREBASE_CLIENT_ID_ANDROID,
  });

  const googleSignIn = useCallback(() => {
    promptAsync();
  }, [promptAsync]);

  const logout = useCallback(async () => {
    setCurrentUser(null);
    navigationRef?.navigate("public");
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      authenticate(response);
    }
  }, [response]);

  const authenticate = useCallback(
    async (response: any) => {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      const user = await signInWithCredential(auth, credential);
      if (!user) return; // TODO: show error modal
      setCurrentUser(user);
    },
    [navigationRef]
  );

  return { googleSignIn, logout, currentUser, setCurrentUser };
};
