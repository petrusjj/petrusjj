import React, { createContext } from "react";
import useAuth from "../hooks/useAuth";
import Auth from "../screens/Auth";

type IAuthProvider = {
  children: React.ReactNode;
};

export const AuthContext = createContext({
  googleSignIn: () => {},
  logout: () => {},
  currentUser: null,
  setCurrentUser: (_: any) => {},
});

const AuthProvider = (props: IAuthProvider) => {
  const { children } = props;

  const { googleSignIn, logout, currentUser, setCurrentUser } = useAuth();

  return (
    <AuthContext.Provider
      value={{ googleSignIn, logout, currentUser, setCurrentUser }}
    >
      {currentUser ? children : <Auth />}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
