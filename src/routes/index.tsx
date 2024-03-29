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
import MilkProductions from "../pages/MilkProductions";
import Cattle from "../pages/Cattle";
import Dashboard from "../pages/Dashboard";

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
              <Route path="/gado" element={<Cattle />} />
              <Route path="/cadastro-gado" element={<CreateCattle />} />
              <Route path="/producoes-leite" element={<MilkProductions />} />
              <Route path="/dashboard" element={<Dashboard />} />
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
