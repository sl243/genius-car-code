import React, {createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../../firebase/firebase.config';

const auth = getAuth(app);

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Create User
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // User Sign In
    const SignIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // User Log out
    const LogOut = () => {
        return signOut(auth)
    }

    // user manage
    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser)
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            return unsubscribe();
        }
    },[])

    const AuthInfo = {
        user,
        loading,
        createUser,
        SignIn,
        LogOut,
    }

    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;