import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import DashboardLayout from "../layout/DashboardLayout";

export default function ProtectedRoute({ children }) {
    const auth = useAuth();
    const location = useLocation()

    if (!auth.isAuthenticated) {
        return <Navigate to="/login" state={location} />
    }
    return <DashboardLayout> {children} </DashboardLayout>
}