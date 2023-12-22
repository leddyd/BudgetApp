import { onAuthStateChanged, User } from "firebase/auth";
import firebase from "firebase/compat/app";
import { useState, createContext, useEffect, ReactNode, useContext } from "react";

interface AuthContextProps {
    user: User | null;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebase.auth(), (authUser) => {
            authUser ? setUser(authUser) : setUser(null);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}
