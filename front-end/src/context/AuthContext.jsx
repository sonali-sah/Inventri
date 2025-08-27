import { createContext, useContext, useEffect, useState } from "react";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");

  const login = (t, e) => {
    setToken(t);
    setEmail(e);
    localStorage.setItem("token", t);
    localStorage.setItem("email", e);
  };
  const logout = () => {
    setToken("");
    setEmail("");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  useEffect(() => {}, [token]);

  return (
    <AuthCtx.Provider value={{ token, email, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
