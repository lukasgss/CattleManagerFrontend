import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { AuthProvider } from "../contexts/AuthContext/authContext";
import { SidebarProvider } from "../contexts/SidebarContext";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/NavSidebar/Sidebar";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SidebarProvider>
          <Navbar />
          <div className="flex">
            <Sidebar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Register />} />
            </Routes>
          </div>
        </SidebarProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
