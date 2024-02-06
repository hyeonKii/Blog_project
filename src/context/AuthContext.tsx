import {ReactNode, createContext, useEffect, useState} from "react";
import {User, getAuth, onAuthStateChanged} from "firebase/auth";
import { app } from "firebaseApp";

interface AuthProps {
    children: ReactNode;
}

const AuthContext = createContext({
    user: null as User | null,
});

export const AuthContextProvider = ({children}: AuthProps) => {
    const auth = getAuth(app);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                // 유저가 없을 때 다르게 처리할 것 생각해보기
            }
        });
    }, [auth]);

    return (
        <AuthContext.Provider value={{user: currentUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;