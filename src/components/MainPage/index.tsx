import React from "react";

type MainPageProps = {
  children: React.ReactNode;
  className?: string;
};

const MainPage = ({ children, className }: MainPageProps) => {
  return (
    <div
      className={`w-full min-h-[calc(100vh-50px)] mt-[50px] bg-[var(--primary-white)] ${className}`}
    >
      {children}
    </div>
  );
};

export default MainPage;
