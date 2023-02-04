import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { createContext, FC, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

import { auth } from '~/firebase';
import { IAuth } from '~/interfaces/Auth';
import { createEmailUser } from '~/services/firebase';
import { publicRoutes } from '~/utils/constants/common';

const AuthState: IAuth = {
  user: null,
  loading: false,
  error: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  redirectLogin: () => {},
};

const AuthContext = createContext<IAuth>(AuthState);

interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = () => useContext<IAuth>(AuthContext);

export const AuthProvider: FC<AuthProviderProps> = props => {
  const { children } = props;

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  const signUp = useCallback(async (email: string, password: string) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        const user = userCredential?.user;
        if (user) {
          setUser(user);
          await createEmailUser(user.uid, user.email || email);
        }
        setLoading(false);
      })
      .catch(error => {
        console.log(error.message);
        setError(error);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    return await signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        setUser(user);
        setLoading(false);
        return user;
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
      setInitialLoading(false);
    });
  }, [auth]);

  const redirectLogin = useCallback(
    (route: string = publicRoutes.index) => {
      if (!user) {
        router.push(route);
        toast.error('You must be login to continue!');
      }
    },
    [user]
  );

  const value: IAuth = useMemo(
    () => ({
      user,
      error,
      loading,
      signUp,
      signIn,
      logout,
      redirectLogin,
    }),
    [error, loading, user, logout, signIn, signUp, redirectLogin]
  );

  return <AuthContext.Provider value={value}>{!initialLoading && children}</AuthContext.Provider>;
};
