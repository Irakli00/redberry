import { Outlet } from "react-router";

import Navbar from "./NavBar";
import CartModal from "./CartModal";

function AppLayout() {
  return (
    <>
      <Navbar></Navbar>
      <CartModal></CartModal>
      <Outlet></Outlet>
      {/* <Footer></Footer> */}
    </>
  );
}

export default AppLayout;
