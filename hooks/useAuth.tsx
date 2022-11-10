import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import { useRouter } from "next/router";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth } from "../firebase";

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>; //accepting email and password returning a Promise
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

interface AuthProviderProps {
  //defining type for children
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState<User | null>(null); //setting new state for user and providing type for this state
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  //checks if user is logged in or not to guide to either home or login page i.e., persisting a user
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => { //accepts auth instance and gives user back
        if (user) {
          // Logged in...
          setUser(user) //if there is a user then user is sent back again state is persisted
          setLoading(false)
        } else {
          // Not logged in... //if there is no user then user set to null and loading is set to true and sent to loading page 
          setUser(null)
          setLoading(true)
          router.push('/login')
        }

        setInitialLoading(false)
      }),
    [auth]
  )

  const signUp = async (email: string, password: string) => {
    //account creation
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/");
        setLoading(false);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/");
        setLoading(false);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    setLoading(true);

    signOut(auth)
      .then(() => {
        setUser(null); //setting users back to null - if there is no user it will push back to loguin page *line: 58 *
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(() => ({
    user, signUp, signIn, loading, logout, error,
  }), [user, loading])

  return (
    <AuthContext.Provider value={memoedValue}>{!initialLoading && children}</AuthContext.Provider>
  )
};

export default function useAuth() {
  return useContext(AuthContext);
}
