import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import AppLayout from "./layout/AppLayout";
import Auth from "./pages/Auth";
import LogInForm from "./elements/auth/LogInForm";
import RegisterForm from "./elements/auth/RegisterForm";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

// notes:
// X on successful purchase leads to items list page
// logout not neccessary

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
      { path: "products", element: <Products></Products> },
      { path: "/products/:id", element: <ProductDetails></ProductDetails> },
      {
        path: "auth",
        element: <Auth></Auth>,
        children: [
          { path: "logIn", element: <LogInForm></LogInForm> },
          { path: "register", element: <RegisterForm></RegisterForm> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  );
}

export default App;
