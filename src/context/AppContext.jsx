import { createContext, useEffect, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const activeUser = localStorage.getItem("user");

    if (activeUser) {
      setUser(JSON.parse(activeUser));
    }
  }, []);

  function loginUser(userData, token) {
    localStorage.setItem("token", JSON.stringify(token));

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }

  return (
    <AppContext.Provider value={{ user, loginUser }}>
      {children}
    </AppContext.Provider>
  );
}
export { AppContext, AppProvider };
