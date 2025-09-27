import { createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../services/cart";

const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const isAuthorised = !!JSON.parse(localStorage.getItem("token"))?.length;

  const colorMap = {
    White: "#FFFFFF",
    Red: "#FF0000",
    Multi: "linear-gradient(45deg, #ff0000, #ffff00, #00ff00, #0000ff)",
    Blue: "#0000FF",
    "Navy Blue": "#001F54",
    Grey: "#808080",
    Black: "#000000",
    Purple: "#800080",
    Orange: "#FFA500",
    Beige: "#F5F5DC",
    Pink: "#FFC0CB",
    Green: "#008000",
    Cream: "#FFFDD0",
    Maroon: "#800000",
    Brown: "#A52A2A",
    Peach: "#FFE5B4",
    "Off White": "#F8F8F0",
    Mauve: "#E0B0FF",
    Yellow: "#FFFF00",
    Magenta: "#FF00FF",
    Khaki: "#F0E68C",
    Olive: "#808000",
  };

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
        colorMap,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export { AppContext, AppProvider };
