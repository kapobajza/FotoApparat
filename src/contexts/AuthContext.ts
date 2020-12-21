import { createContext } from 'react';

export interface AuthContextType {
  isSignedIn: boolean;
  setIsSignedIn: (isSignedIn: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  isSignedIn: false,
  setIsSignedIn: () => {},
});

export const AuthProvider = AuthContext.Provider;

export default AuthContext;
