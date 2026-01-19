"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem("jwtToken");
        
        if (!token) {
            // No token found, redirect to login
            router.push("/login");
        } else {
            setIsAuthenticated(true);
        }
    }, [router, pathname]);

    // Show nothing while checking authentication
    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                    <p className="mt-4 text-sm text-slate-600">Loading...</p>
                </div>
            </div>
        );
    }

    // If authenticated, render children
    if (isAuthenticated) {
        return <>{children}</>;
    }

    // If not authenticated, show nothing (redirect is happening)
    return null;
};

export default ProtectedRoute;
