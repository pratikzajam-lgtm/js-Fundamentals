"use client";
import fetchProfileDetails from '../services/user.service'
import { useProfile } from '../hooks/userProfile'
import { useState } from 'react';


import {
  Search,
  Bell,
  ChevronDown,
  Menu
} from "lucide-react";


const Navbar = () => {




  const { data } = useProfile()

  const userName = data?.data.user.name;
  const userRole = data?.data.user.role;


  



  return (
    <header className="flex h-16 w-full items-center justify-between bg-white px-6 border-b border-slate-200 sticky top-0 z-30">

      {/* 1. Search Bar & Mobile Toggle */}
      <div className="flex items-center gap-4">
        {/* Mobile Sidebar Toggle (Hidden on desktop) */}
        <button className="block md:hidden text-slate-500 hover:text-slate-700">
          <Menu className="h-6 w-6" />
        </button>

        {/* Search Input */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search SKU, products, orders..."
            className="h-10 w-96 rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {/* 2. Right Actions Area */}
      <div className="flex items-center gap-6">

        {/* Notification Bell with Badge */}
        <button className="relative text-slate-500 hover:text-slate-700 transition-colors">
          <Bell className="h-5 w-5" />
          {/* Red Dot for unread notifications */}
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          {/* Avatar Placeholder */}
          <div className="h-9 w-9 overflow-hidden rounded-full bg-slate-200 border border-slate-300">
            {/* If using Next/Image: <Image src="/avatar.jpg" ... /> */}
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jameson"
              alt="User Avatar"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Name & Role */}
          <div className="hidden text-sm md:block">
            <p className="font-semibold text-slate-700">{userName}</p>
            <p className="text-xs text-slate-500">{userRole}</p>
          </div>

          <ChevronDown className="h-4 w-4 text-slate-400" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;