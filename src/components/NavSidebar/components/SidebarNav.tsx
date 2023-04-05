import React, { useContext } from "react";

import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import SidebarRoutes from "./SidebarRoutes";
import { SidebarContext } from "../../../contexts/SidebarContext";

import tmpLogo from "../../../assets/img/tmpLogo.webp";

type SidebarNavProps = {
  sidebarCollapsed: boolean;
  toggleSidebarCollapsed: () => void;
  elementRef?: React.MutableRefObject<any>;
};

const SidebarNav = ({
  sidebarCollapsed,
  toggleSidebarCollapsed,
  elementRef,
}: SidebarNavProps) => {
  const { sidebarOpen } = useContext(SidebarContext);

  return (
    <nav
      ref={elementRef}
      className={`h-screen transition-width duration-200 fixed lg:relative z-40 ${
        sidebarOpen ? "" : "!w-0"
      } ${sidebarCollapsed ? "w-[225px]" : "w-[90px]"}`}
    >
      <div className="w-[inherit] fixed md:relative z-40 overflow-y-hidden mt-[50px] bg-white h-[calc(100vh-50px)]">
        {sidebarOpen ? (
          <div className="w-[inherit] fixed bg-white">
            <div className="w-[inherit]">
              <Link to="/">
                <img
                  src={tmpLogo}
                  alt="Logo da empresa"
                  className="w-16 md:w-20 md:h-20 mx-auto"
                />
              </Link>
              <div className="px-5">
                <div className="h-[2px] w-full bg-[var(--primary-light-gray)]" />
              </div>
              <div className="px-5 flex justify-center my-3">
                <button
                  type="button"
                  aria-label={sidebarCollapsed ? "expandir" : "retrair"}
                  className="mx-auto"
                  onClick={toggleSidebarCollapsed}
                >
                  <BsArrowRightShort
                    title={sidebarCollapsed ? "Retrair" : "Expandir"}
                    className={`w-8 h-8 bg-[#3b94fa] text-white rounded-full hover:brightness-110 transition duration-300 ${
                      sidebarCollapsed ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
              <div className="px-5">
                <div className="h-[2px] w-full bg-[var(--primary-light-gray)]" />
              </div>
            </div>
            <SidebarRoutes open={sidebarCollapsed} />
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default SidebarNav;
