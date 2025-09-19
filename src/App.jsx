import { createBrowserRouter, RouterProvider } from "react-router";

import AppLayout from "./layout/AppLayout";
import Auth from "./pages/Auth";
import LogInForm from "./elements/auth/LogInForm";
import RegisterForm from "./elements/auth/RegisterForm";

// notes:
// X on successful purchase leads to items list page
// logout not neccessary

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout></AppLayout>,
    children: [
      { index: true, element: <h1>ITEMS LIST</h1> }, //so far
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
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
