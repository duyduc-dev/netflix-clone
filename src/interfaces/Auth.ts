import { User } from 'firebase/auth';

export interface IAuth {
  user: User | null;
  error: string | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  redirectLogin: () => void;
}
