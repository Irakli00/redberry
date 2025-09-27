import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import { AppProvider } from "./context/AppContext.jsx";

import AppLayout from "./layout/AppLayout";
import Auth from "./pages/Auth";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";

import LogInForm from "./elements/auth/LogInForm";
import RegisterForm from "./elements/auth/RegisterForm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3 * 60000,
      // staleTime: 10,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout></AppLayout>,
    children: [
      { index: true, element: <Navigate to="/products" replace /> },
      { path: "/products", element: <Products></Products> },
      { path: "/products/:id", element: <ProductDetails></ProductDetails> },
      {
        path: "auth",
        element: <Auth></Auth>,
        handle: { fullWidth: true },

        children: [
          { index: true, element: <Navigate to="logIn" replace /> },
          { path: "logIn", element: <LogInForm></LogInForm> },
          { path: "register", element: <RegisterForm></RegisterForm> },
        ],
      },
      { path: "/checkout", element: <Checkout></Checkout> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <RouterProvider router={router}></RouterProvider>
      </AppProvider>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  );
}

export default App;
