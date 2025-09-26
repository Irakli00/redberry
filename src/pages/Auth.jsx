import { Outlet } from "react-router";

import AuthBanner from "../assets/imgs/auth-banner.jpg";

function Auth() {
  return (
    <section className="flex gap-[173px]">
      <aside>
        <img
          src={AuthBanner}
          alt="two stylish people looking cool because they bought our stuff"
        />
      </aside>
      <Outlet></Outlet>
    </section>
  );
}

export default Auth;
