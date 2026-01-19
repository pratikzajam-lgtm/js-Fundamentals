"use client";

import React from "react";
import Sidebar from "../components/Sidebar"; 
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            <div className="flex h-screen w-full bg-slate-50">
                {/* Left Side: Sidebar (Fixed) */}
                <Sidebar />

                {/* Right Side: Navbar + Content */}
                <div className="flex flex-1 flex-col h-full overflow-hidden">

                    {/* Top: Navbar */}
                    <Navbar />

                    {/* Bottom: Main Content (The 'children' is your page.tsx) */}
                    <main className="flex-1 overflow-y-auto p-8">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
