import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { SidebarContext } from "../../contexts/SidebarContext";
import NavbarRoutes from "./components/NavbarRoutes";
import { AuthContext } from "../../contexts/AuthContext/authContext";

import tmpLogo from "../../assets/img/tmpLogo.webp";

const Navbar = () => {
  const { toggleSidebarOpen } = useContext(SidebarContext);
  const { authenticated } = useContext(AuthContext);

  const url = useLocation().pathname;

  if (url === "/404") {
    return null;
  }

  return (
    <nav className="fixed z-50 bg-white flex items-center shadow px-7 justify-between md:pr-10 h-[50px] w-full">
      {authenticated ? (
        <button
          type="button"
          aria-label="menu barra de navegação lateral"
          onClickCapture={(e) => toggleSidebarOpen(e)}
        >
          <RxHamburgerMenu
            id="hamburguerMenu"
            className="w-6 h-6 bg-transparent hover:brightness-150"
          />
        </button>
      ) : (
        <Link to="/">
          <img src={tmpLogo} alt="Logo da empresa" className="w-12" />
        </Link>
      )}
      <NavbarRoutes />
    </nav>
  );
};

export default Navbar;
