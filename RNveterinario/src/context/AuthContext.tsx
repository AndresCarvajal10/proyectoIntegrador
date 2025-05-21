import React, { PropsWithChildren, createContext, useState } from 'react';
import { useHttpsCall } from '../hooks/useHttpsCall';
import { LoginData } from '../interfaces/LoginInterface';
import { DataLoginResponse } from '../interfaces/ListAppointment';

interface AuthState {
  isLoggedIn: boolean;
}

interface ResponseLogin {
    idClient: string;
    name: string;
    lastName: string;
    addres: string;
    phone: string;
    email: string;
}

interface AuthContextProps {
  authState: AuthState;
  startSessionUser: () => void;
  finishSesionUser: () => void;
   login: (
    username: string,
    password: string,
    showError: (msg: string) => void
  ) => Promise<void>;
  loginState: ResponseLogin;
}

export const AuthContext = createContext<AuthContextProps>({
  authState: { isLoggedIn: false },
  startSessionUser: () => { },
  finishSesionUser: () => { },
  login: async () => {},
  loginState: { 
    idClient: "",
    name: "",
    lastName: "",
    addres: "",
    phone: "",
    email: "",}
});

const AuthContextProvider = ({ children }: PropsWithChildren) => {

  const [authState, setAuthState] = useState<AuthState>({ isLoggedIn: false });
  const [loginState, setLoginState] = useState<ResponseLogin>({
    idClient: "",
    name: "",
    lastName: "",
    addres: "",
    phone: "",
    email: "",
});
  const { callServer } = useHttpsCall();

  const startSessionUser = () => {
    setAuthState({ isLoggedIn: true });
  };

  const finishSesionUser = () => {
    setAuthState({ isLoggedIn: false });
  };

   const login = async (
    username: string,
    password: string,
    showError: (msg: string) => void
  ): Promise<void> => {
    const requestData: LoginData = { username, password };

    const { response, error } = await callServer<LoginData, DataLoginResponse>(
      '/integrador/login',
      requestData,
      'post'
    );

    if (error) {
      showError('Error de conexión. Intenta nuevamente.');
      return;
    }

    if (response?.responseCode === '0000') {
       setLoginState({
        idClient: response.responseObj.idClient,
        name: response.responseObj.name,
        lastName: response.responseObj.lastName,
        addres: response.responseObj.addres,
        phone: response.responseObj.phone,
        email: response.responseObj.email,
    });

      startSessionUser();
    } else {
      showError('Ha ocurrido un error al iniciar sesión');
    }
  };

  return (
    <AuthContext.Provider value={{ authState, startSessionUser, finishSesionUser, login, loginState}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
