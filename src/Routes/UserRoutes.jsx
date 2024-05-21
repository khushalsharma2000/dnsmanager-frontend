import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import UserPublic from "./UserPublic";
import Dashboard from "../Components/Dashboard";

export default function UserRoutes() {
  return (
    <div>
      <Routes>
        {/* Default route to redirect to /login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/home" element={<Home />} />
        
        <Route
          path="/login"
          element={
            <UserPublic>
              <Login />
            </UserPublic>
          }
        />
        
        <Route
          path="/signup"
          element={
            <UserPublic>
              <SignUp />
            </UserPublic>
          }
        />
        
        <Route
          path="/records"
          element={
            <UserPublic>
              <Dashboard />
            </UserPublic>
          }
        />
      </Routes>
    </div>
  );
}
