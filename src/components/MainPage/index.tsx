import React from "react";

type MainPageProps = {
  children: React.ReactNode;
  className?: string;
};

const MainPage = ({ children, className }: MainPageProps) => {
  return (
    <div
      className={`w-full min-h-[calc(100vh-50px)] px-6 py-5 md:px-14 md:py-8 lg:px-24 lg:py-14 mt-[50px] bg-[var(--primary-white)] ${className}`}
    >
      {children}
    </div>
  );
};

export default MainPage;
