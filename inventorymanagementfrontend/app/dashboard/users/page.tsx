"use client";

import React, { useState, useMemo } from 'react';
import { deleteUser } from '@/app/services/user.service';
import { allUsers } from '@/app/hooks/allUsers';

import UserModal from '@/app/components/UserModal';

import {
    Plus,
    Search,
    Filter,
    Trash2,
    Edit,
    MoreHorizontal,
    User,
    Shield,
    Mail
} from "lucide-react";
import { useDeleteUser } from '@/app/hooks/deleteUser';


interface UserData {
    id: number,
    name: string,
    email: string,
    role: string,
    isActive: boolean,
    createdAt: string
}



const UsersPage = () => {

    const { mutate: deleteUser } = useDeleteUser()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<UserData | null>(null);
    const [modalMode, setModalMode] = useState<"create" | "edit">("create");

    const [searchTerm, setSearchTerm] = useState("");
    const { data } = allUsers()

    // Filter users based on search term
    const filteredUsers = useMemo(() => {
        if (!data) return [];
        if (!searchTerm) return data;
        
        const searchLower = searchTerm.toLowerCase();
        return data.filter((user: UserData) => 
            user.name.toLowerCase().includes(searchLower) || 
            user.email.toLowerCase().includes(searchLower)
        );
    }, [data, searchTerm]);


    let handleDelete = (id: number) => {

        if (confirm("Do You Really Want To Delete This User?")) {
            deleteUser(id)
        }

    }

    let handleAddUser = () => {
        setModalMode("create");
        setEditingUser(null);
        setIsModalOpen(true);
    }

    let handleEditUser = (user: UserData) => {
        setModalMode("edit");
        setEditingUser(user);
        setIsModalOpen(true);
    }

    let handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
        setModalMode("create");
    }

    let handleAddUserSave = () => { } // This is for backward compatibility, actual save is handled in modal


    return (
        <>
            <UserModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleAddUserSave}
                editingUser={editingUser}
                mode={modalMode}
            />

            <div className="space-y-6">

                {/* 1. Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">User Management</h2>
                        <p className="text-sm text-slate-500">Manage team members and their account permissions.</p>
                    </div>
                    <button 
                        onClick={handleAddUser} 
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-all active:scale-95"
                    >
                        <Plus className="h-4 w-4" />
                        Add User
                    </button>
                </div>

                {/* 2. Toolbar (Search & Filter) */}
                <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                    </div>
                    <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                        <Filter className="h-4 w-4 text-slate-500" />
                        Filters
                    </button>
                </div>

                {/* 3. The Data Table */}
                <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-slate-200 bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 font-medium text-slate-500">User</th>
                                    <th className="px-6 py-4 font-medium text-slate-500">Role</th>
                                    <th className="px-6 py-4 font-medium text-slate-500">Status</th>
                                    <th className="px-6 py-4 font-medium text-slate-500">Joined Date</th>
                                    <th className="px-6 py-4 text-right font-medium text-slate-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredUsers?.length > 0 ? (
                                    filteredUsers.map((user: UserData) => {
                                        const displayDate = new Date(user.createdAt).toLocaleString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        });

                                        return (
                                            <tr
                                                key={user.id}
                                                className="group hover:bg-slate-50/80 transition-colors"
                                            >
                                                {/* Name & Email */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                                            <User className="h-5 w-5" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-semibold text-slate-700">
                                                                {user.name}
                                                            </span>
                                                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                                                <Mail className="h-3 w-3" /> {user.email}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Role Badge */}
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium border ${user.role === "Admin" || user.role === "admin"
                                                            ? "bg-purple-50 text-purple-700 border-purple-200"
                                                            : user.role === "Editor" || user.role === "editor"
                                                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                                                : "bg-slate-100 text-slate-600 border-slate-200"
                                                            }`}
                                                    >
                                                        {(user.role === "Admin" || user.role === "admin") && <Shield className="h-3 w-3" />}
                                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()}
                                                    </span>
                                                </td>

                                                {/* Status Indicator */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span
                                                            className={`h-2 w-2 rounded-full ${user.isActive ? "bg-emerald-500" : "bg-slate-300"
                                                                }`}
                                                        />
                                                        <span
                                                            className={`text-sm ${user.isActive ? "text-slate-700" : "text-slate-500"
                                                                }`}
                                                        >
                                                            {user.isActive ? "Active" : "Inactive"}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Joined Date */}
                                                <td className="px-6 py-4 text-slate-500">
                                                    {displayDate}
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => handleEditUser(user)}
                                                            className="rounded p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                                            title="Edit User"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </button>

                                                        <button 
                                                            onClick={() => handleDelete(user.id)}
                                                            className="rounded p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                                                            title="Delete User"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-12 text-center text-slate-500">
                                            {searchTerm ? `No users found matching "${searchTerm}"` : "No users found"}
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UsersPage
