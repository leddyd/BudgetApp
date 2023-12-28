import { onAuthStateChanged, User } from "firebase/auth";
import firebase from "firebase/compat/app";
import { useState, createContext, useEffect, ReactNode, useContext } from "react";

export interface AuthContextProps {
  user: User | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase.auth(), (authUser) => {
      authUser ? setUser(authUser) : setUser(null);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? <></> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
