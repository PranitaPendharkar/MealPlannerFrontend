import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const [token, setToken] = useState(null);
  const [Id, setId] = useState(null);

  //initializing the token state when the component is first mounted.
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedId = localStorage.getItem("id");
    if (storedToken) {
      setToken(storedToken);
      setId(storedId);
    }
  }, []);

  //changes to the token state and performs actions based on those changes.
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("id", Id);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };
  console.log("ID IN CONTEXT", Id);

  return (
    <AuthContext.Provider value={{ token, login, logout, Id, setId }}>
      {props.children}
    </AuthContext.Provider>
  );
}
