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
  currentUser: UserCredential | undefined;
  signUp: (email: any, password: any) => Promise<UserCredential>;
  signIn: (email: any, password: any) => Promise<UserCredential>;
  signOut: () => void;
};
const authContextDefaults = {
  token: null,
  expiresAt: null,
  loadingAuthState: true,
  currentUser: undefined,
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
  const [currentUser, setCurrentUser] = React.useState<UserCredential>();

  const [loadingAuthState, setLoadingAuthState] = React.useState<boolean>(
    authContextDefaults.loadingAuthState
  );
  React.useEffect(() => {
    const unsubscribe = (aContextDefaults: any) => {
      if (aContextDefaults.currentUser) {
        setCurrentUser(aContextDefaults.currentUser);
        setLoadingAuthState(false);
      } else {
        setCurrentUser(undefined);
        setLoadingAuthState(false);
      }
    };
    return unsubscribe(authContextDefaults);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authContextDefaults,
        loadingAuthState: loadingAuthState,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
