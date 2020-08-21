import React, {
  useState,
  useContext,
  createContext,
  useLayoutEffect,
  PropsWithChildren
} from "react";

type ContextProps = {
  isAuth: boolean;
  login: (username: string, token: string) => void;
  logout: () => void;
};

type ProviderProps = {};

const AuthContext = createContext<Partial<ContextProps>>({});

export function AuthProvider({ children }: PropsWithChildren<ProviderProps>) {
  return (
    <AuthContext.Provider value={AuthValue()}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

function AuthValue() {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const login = (username: string, token: string): boolean => {
    localStorage.setItem("username", username);
    localStorage.setItem("access-token", token);
    setIsAuth(true);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("username");
    setIsAuth(false);
  };

  useLayoutEffect(() => {
    setIsAuth(!!localStorage.getItem("access-token"));
  }, []);

  return {
    isAuth,
    login,
    logout
  };
}
