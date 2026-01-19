"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useCreateUser } from "../hooks/addUser";
import { useUpdateUser } from "../hooks/updateUser";

interface UserData {
    id?: number;
    name: string;
    email: string;
    role: string;
}

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (user: { name: string; email: string; password: string; confirmPassword: string; role: string }) => void;
    editingUser?: UserData | null;
    mode?: "create" | "edit";
}

const UserModal = ({ isOpen, onClose, onSave, editingUser, mode = "create" }: UserModalProps) => {
    
    const { mutate: createUser, isPending: isCreating } = useCreateUser();
    const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
    
    const isPending = isCreating || isUpdating;
    const isEditMode = mode === "edit" && editingUser;

    const [formData, setFormData] = useState({
        name: "", 
        email: "", 
        password: "", 
        confirmPassword: "", 
        role: "admin"
    });

    useEffect(() => {
        if (isEditMode && editingUser) {
            setFormData({
                name: editingUser.name || "",
                email: editingUser.email || "",
                password: "",
                confirmPassword: "",
                role: editingUser.role?.toLowerCase() || "admin"
            });
        } else {
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: "admin"
            });
        }
    }, [isEditMode, editingUser, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isEditMode && editingUser?.id) {
            // Update user (no password required for update)
            updateUser(
                { 
                    userId: editingUser.id, 
                    userData: { 
                        name: formData.name, 
                        email: formData.email, 
                        role: formData.role 
                    } 
                },
                {
                    onSuccess: () => {
                        setFormData({ name: "", email: "", password: "", confirmPassword: "", role: "admin" });
                        onClose();
                    }
                }
            );
        } else {
            // Create new user
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            
            onSave(formData);
            createUser(formData, {
                onSuccess: () => {
                    setFormData({ name: "", email: "", password: "", confirmPassword: "", role: "admin" });
                    onClose();
                }
            });
        }
    };

    return (
        // Backdrop
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

            {/* Modal Content */}
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl border border-slate-100">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-slate-800">
                        {isEditMode ? "Edit User" : "Add New User"}
                    </h3>
                    <button 
                        onClick={onClose} 
                        className="rounded-full p-1 hover:bg-slate-100 text-slate-500 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                        <input
                            required
                            type="text"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            placeholder="Pratik Zajam"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <input
                            required
                            type="email"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            placeholder="zajampratik@gmail.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    {/* Password Fields - Only show for create mode */}
                    {!isEditMode && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                                <input
                                    required={!isEditMode}
                                    type="password"
                                    placeholder="Enter Password"
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                                <input
                                    required={!isEditMode}
                                    type="password"
                                    placeholder="Enter Confirm Password"
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                />
                            </div>
                        </>
                    )}

                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                        <select
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="staff">Staff</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isPending}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending ? "Saving..." : isEditMode ? "Update User" : "Add User"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserModal;
