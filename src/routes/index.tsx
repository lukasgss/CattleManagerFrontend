import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { AuthProvider } from "../contexts/AuthContext/authContext";
import { SidebarProvider } from "../contexts/SidebarContext";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/NavSidebar/Sidebar";
import CreateCattle from "../pages/Cattle/CreateCattle";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SidebarProvider>
          <Navbar />
          <div className="flex">
            <Sidebar />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Register />} />
              <Route path="/cadastro-gado" element={<CreateCattle />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </div>
        </SidebarProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
