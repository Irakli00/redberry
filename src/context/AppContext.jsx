import { createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../services/cart";

const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const isAuthorised = !!JSON.parse(localStorage.getItem("token"))?.length;

  const { data: cart = [], isLoading: cartLoading } = useQuery({
    queryKey: ["cart", user?.id],
    queryFn: () => getCart(),
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5min
  });

  useEffect(() => {
    const activeUser = localStorage.getItem("user");

    if (activeUser) {
      setUser(JSON.parse(activeUser));
    }
  }, []);

  function loginUser(userData, token) {
    if (token) localStorage.setItem("token", JSON.stringify(token));
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    }
  }

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthorised,
        loginUser,
        cartModalOpen,
        setCartModalOpen,
        cart,
        cartLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export { AppContext, AppProvider };
