import { createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../services/cart";

const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [cartModalOpen, setCartModalOpen] = useState(false);

  const { data: cart = [], isLoading: cartLoading } = useQuery({
    queryKey: ["cart", user?.id],
    queryFn: () => getCart(localStorage.getItem("token")),
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
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }

  return (
    <AppContext.Provider
      value={{
        user,
        loginUser,
        cartModalOpen,
        setCartModalOpen,
        cart,
        cartLoading,
        page,
        setPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export { AppContext, AppProvider };
