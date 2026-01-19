"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    Truck,
    BarChart3,
    Settings,
    LogOut,
    Box,
    User,
    Boxes
} from "lucide-react";
import { useAuth } from "../context/useAuth";

const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/dashboard/users", icon: User },
    { name: "Products", href: "/dashboard/products", icon: Package },
    { name: "Inventory", href: "/dashboard/inventory", icon: Boxes },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { Logout } = useAuth();

    const handleLogout = () => {
        Logout();
        router.push("/login");
    };

    return (
        <aside className="flex h-screen w-64 flex-col bg-slate-900 text-white border-r border-slate-800">
            {/* 1. Logo Section */}
            <div className="flex items-center gap-3 px-6 py-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Box className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold tracking-wide">InventoryPro</span>
            </div>

            {/* 2. Navigation Menu */}
            <nav className="flex-1 space-y-1 px-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive
                                ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                                : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                                }`}
                        >
                            <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-slate-400"}`} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* 3. Footer / Logout */}
            <div className="border-t border-slate-800 p-4">
                <button 
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-400 transition-colors hover:bg-red-900/20 hover:text-red-400"
                >
                    <LogOut className="h-5 w-5" />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;