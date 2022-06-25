import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';


const AuthContext = createContext({});
 
export const AuthProvider = ({children}) => {

  const [currentUser,setCurrentUser] = useState(null)
  

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log('user status changed: ', user);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{
        currentUser,
        signUp,
        login,
        logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth () {
    return useContext(AuthContext);
}