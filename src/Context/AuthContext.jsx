import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [_id, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const savedUsername = localStorage.getItem("username");
    const savedUserId = localStorage.getItem("ID");

    if (token) {
      setIsLoggedIn(true);
      setUsername(savedUsername || "");
      setUserId(savedUserId || null);
    }
  }, []);

  const login = (token, username) => {
    if (token && username) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", username);
      localStorage.setItem("ID", _id);
      setIsLoggedIn(true);
      setUsername(username);
      setUserId(_id);
    } else {
      console.error("Missing token or username");
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("ID");
    setIsLoggedIn(false);
    setUsername("");
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
