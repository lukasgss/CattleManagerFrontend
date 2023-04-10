import React, {
  createContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { SidebarData, SidebarContextProps } from "./types";

export const SidebarContext = createContext<SidebarData>({
  sidebarOpen: true,
  setSidebarOpen: Object,
  toggleSidebarOpen: Object,
});

export const SidebarProvider = ({ children }: SidebarContextProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useLayoutEffect(() => {
    const open = localStorage.getItem("sidebarOpen");
    if (open === "true") {
      setSidebarOpen(true);
    }
  }, []);

  const toggleSidebarOpen = (event: React.MouseEvent | Event) => {
    event.stopPropagation();
    event.preventDefault();

    setSidebarOpen((prevValue) => !prevValue);
    localStorage.setItem("sidebarOpen", JSON.stringify(!sidebarOpen));
  };

  const contextData = useMemo(
    () => ({
      sidebarOpen,
      setSidebarOpen,
      toggleSidebarOpen,
    }),
    [sidebarOpen]
  );

  return (
    <SidebarContext.Provider value={contextData}>
      {children}
    </SidebarContext.Provider>
  );
};
