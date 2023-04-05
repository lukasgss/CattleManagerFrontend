export type SidebarData = {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  toggleSidebarOpen: (event: React.MouseEvent<any, any> | MouseEvent) => void;
};

export type SidebarContextProps = {
  children: React.ReactNode;
};
