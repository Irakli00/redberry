import { Outlet, useMatches } from "react-router";

import Navbar from "./NavBar";
import CartModal from "./CartModal";

function AppLayout() {
  const matches = useMatches();
  const fullWidth = matches.some((m) => m.handle?.fullWidth);

  return (
    <>
      <Navbar></Navbar>
      <main className={fullWidth ? "" : "custom-container"}>
        <CartModal></CartModal>
        <Outlet></Outlet>
      </main>
    </>
  );
}

export default AppLayout;
