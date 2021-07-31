import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string; 
}

type AuthContextType = {
  vLoginContext: User | undefined;
  signInWithGoogle: () => Promise<void>; 
}
export const AuthContext = createContext({} as AuthContextType);

type AuthContextProviderProps = {
  children : ReactNode;
}

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [vLoginContext, setLoginContextValue] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(vLoginContext => {
      if (vLoginContext){
        const {displayName, photoURL, uid} = vLoginContext;

        if (!displayName || !photoURL){
          throw new Error('Missing name or photo from your google account. Please, update these informations before login');
        }

        setLoginContextValue({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe();
    }
  }, []);

  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
  
    if (result.user) {
      const {displayName, photoURL, uid} = result.user;

      if (!displayName || !photoURL){
        throw new Error('Missing name or photo from your google account. Please, update these informations before login');
      }

      setLoginContextValue({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    } 
  }
  
  return (
    <AuthContext.Provider value={{vLoginContext, signInWithGoogle}}>
      {props.children}
    </AuthContext.Provider>
  );
}