import React, { createContext } from "react";
import useAuth from "../hooks/useAuth";

type IAuthProvider = {
  children: React.ReactNode;
};

export const AuthContext = createContext({
  hydrating: false,
  googleSignIn: () => {},
  logout: () => {},
  currentUser: null,
  setCurrentUser: (_: any) => {},
});

const AuthProvider = (props: IAuthProvider) => {
  const { children } = props;

  const { hydrating, googleSignIn, logout, currentUser, setCurrentUser } =
    useAuth();

  return (
    <AuthContext.Provider
      value={{ hydrating, googleSignIn, logout, currentUser, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
