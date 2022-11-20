import React, { useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "./AuthDataProvider/UserAPI";
type AuthContextInterface = {
  token: string | null;
  expiresAt: Date | null;
  loadingAuthState: boolean;
  currentUser: string;
  signUp: (email: any, password: any) => Promise<UserCredential>;
  signIn: (email: any, password: any) => Promise<UserCredential>;
  signOut: () => void;
  setCurrentUser?: any;
  setToken?: any;
};
const authContextDefaults = {
  token: null,
  expiresAt: null,
  loadingAuthState: true,
  currentUser: "",
  signUp: (email: any, password: any): Promise<UserCredential> => {
    console.log(email, password);
    return createUserWithEmailAndPassword(email, password);
  },
  signIn: (email: any, password: any) => {
    return signInWithEmailAndPassword(email, password);
  },
  signOut: () => {
    return signOut();
  },
};

export const AuthContext =
  React.createContext<AuthContextInterface>(authContextDefaults);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: any }) => {
  const [currentUser, setCurrentUser] =
    React.useState<AuthContextInterface["currentUser"]>("");

  const [token, setToken] = React.useState<string>("");
  // React.useEffect(() => {
  //   const unsubscribe = (aContextDefaults: any) => {
  //     if (aContextDefaults.currentUser) {
  //       setCurrentUser(aContextDefaults.currentUser);
  //       setLoadingAuthState(false);
  //     } else {
  //       setCurrentUser("");
  //       setLoadingAuthState(false);
  //     }
  //   };
  //   return unsubscribe(authContextDefaults);
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authContextDefaults,
        currentUser,
        setCurrentUser,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
