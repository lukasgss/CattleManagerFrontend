import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { SidebarContext } from "../../contexts/SidebarContext";
import DetectClickOutside from "../DetectClickOutside";

import "./index.scss";
import SidebarNav from "./components/SidebarNav";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { AuthContext } from "../../contexts/AuthContext/authContext";

const Sidebar = () => {
  const { authenticated } = useContext(AuthContext);
  const { width: screenWidth } = useWindowDimensions();
  const { sidebarOpen, toggleSidebarOpen, setSidebarOpen } =
    useContext(SidebarContext);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navElement = useRef<any>(null);
  const currentRoute = useLocation().pathname;

  useLayoutEffect(() => {
    const openSidebar = localStorage.getItem("sidebarCollapsed");
    if (openSidebar && openSidebar === "true") {
      setSidebarCollapsed(true);
    }
  }, []);

  useEffect(() => {
    if (sidebarOpen && screenWidth < 768) {
      setSidebarOpen(false);
    }
  }, [currentRoute]);

  const toggleSidebarCollapsed = () => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(!sidebarCollapsed));
    setSidebarCollapsed((prevValue) => !prevValue);
  };

  const handleClickOutsideSideNav = (event: MouseEvent) => {
    if (sidebarOpen) {
      toggleSidebarOpen(event);
    }
  };

  if (!authenticated) {
    return null;
  }

  return screenWidth < 1024 ? (
    <>
      <DetectClickOutside
        onClickOutside={handleClickOutsideSideNav}
        elementRef={navElement}
      >
        <SidebarNav
          sidebarCollapsed={sidebarCollapsed}
          toggleSidebarCollapsed={toggleSidebarCollapsed}
          elementRef={navElement}
        />
      </DetectClickOutside>
      <div className={`overlay ${sidebarOpen ? "visible" : ""}`} />
    </>
  ) : (
    <SidebarNav
      sidebarCollapsed={sidebarCollapsed}
      toggleSidebarCollapsed={toggleSidebarCollapsed}
    />
  );
};

export default Sidebar;
