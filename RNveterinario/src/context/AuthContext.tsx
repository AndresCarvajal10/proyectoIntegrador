import React, { PropsWithChildren, createContext, useState } from 'react';

interface AuthState {
  isLoggedIn: boolean;
}

interface AuthContextProps {
  authState: AuthState;
  startSessionUser: () => void;
  finishSesionUser: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  authState: { isLoggedIn: false },
  startSessionUser: () => { },
  finishSesionUser: () => { },
});

const AuthContextProvider = ({ children }: PropsWithChildren) => {

  const [authState, setAuthState] = useState<AuthState>({ isLoggedIn: false });

  const startSessionUser = () => {
    setAuthState({ isLoggedIn: true });
  };

  const finishSesionUser = () => {
    setAuthState({ isLoggedIn: false });
  };

  return (
    <AuthContext.Provider value={{ authState, startSessionUser, finishSesionUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
