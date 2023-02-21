import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useEffect, useState } from "react";
import Auth from "../screens/Auth";

type IAuthProvider = {
  children: React.ReactNode;
};

export interface IAuthContext {
  currentUser: any;
  setCurrentUser: (user: any) => void;
}

export const AuthContext = createContext({
  currentUser: null,
  setCurrentUser: (user: any) => {},
});

const AuthProvider = (props: IAuthProvider) => {
  const { children } = props;

  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = useCallback(async () => {
    if (currentUser) return;
    const raw = await AsyncStorage.getItem("currentUser");
    if (!raw) return;
    const user = JSON.parse(raw);
    setCurrentUser(user);
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {currentUser ? children : <Auth />}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
