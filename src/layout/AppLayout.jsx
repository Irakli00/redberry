import { Outlet } from "react-router";

import Navbar from "./NavBar";

function AppLayout() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      {/* <Footer></Footer> */}
    </>
  );
}

export default AppLayout;
