import HeaderLogo from "../assets/header-logo.svg";
import UserIcon from "../assets/user.svg";

import { NavLink } from "react-router";

function Navbar() {
  return (
    <header>
      <div className="flex items-center justify-between py-[28px] m-auto max-w-[1720px]">
        <NavLink to={"/"} className="flex gap-[4px]">
          <img src={HeaderLogo} alt="RedSeam Clothing logo" />
          <span className="font-semibold ">RedSeam Clothing</span>
        </NavLink>

        <NavLink
          to={"/logIn"}
          className="flex items-center gap-[4px] min-w-[64px]"
        >
          <img
            src={UserIcon}
            width={"20px"}
            height={"20px"}
            alt="log in button"
          />
          <span className="font-medium text-[12px]">Log In</span>
        </NavLink>
      </div>
    </header>
  );
}
export default Navbar;
