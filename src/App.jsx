import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./layout/AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout></AppLayout>,
    children: [],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
