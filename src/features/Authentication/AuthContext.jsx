import { createContext, useContext, useState } from "react";

const initialAuth = {
  accessToken: null,
  user: null,
};

const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const fromStorage = localStorage.getItem("auth");
    return fromStorage ? JSON.parse(fromStorage) : initialAuth;
  });

  function login(data) {
    localStorage.setItem("auth", JSON.stringify(data));
    setAuth(data);
  }

  function logout() {
    localStorage.removeItem("auth");
    setAuth(initialAuth);
  }
  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error(
      "Please only use AuthContext inside a descendent of AuthContextProvider"
    );
  }
  return ctx;
}
