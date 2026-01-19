"use client";

import React, { useState, useMemo } from 'react';
import { allInventory } from '@/app/hooks/allInventory';
import InventoryModal from '@/app/components/InventoryModal';
import {
    Plus,
    Search,
    Filter,
    Trash2,
    Edit,
    Package,
    Warehouse
} from "lucide-react";
import { useDeleteInventory } from '@/app/hooks/deleteInventory';


interface InventoryData {
    id: number,
    productId: number,
    product?: {
        id: number,
        name: string,
        description: string,
        price: number
    },
    quantity: number,
    location?: string,
    createdAt?: string,
    updatedAt?: string
}



const InventoryPage = () => {

    const { mutate: deleteInventory } = useDeleteInventory()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingInventory, setEditingInventory] = useState<InventoryData | null>(null);
    const [modalMode, setModalMode] = useState<"create" | "edit">("create");

    const [searchTerm, setSearchTerm] = useState("");
    const { data } = allInventory()

    console.log(data)

    
    const filteredInventory = useMemo(() => {
        if (!data) return [];
        // Ensure data is an array
        const inventoryArray = Array.isArray(data) ? data : [];
        if (!searchTerm) return inventoryArray;
        
        const searchLower = searchTerm.toLowerCase();
        return inventoryArray.filter((inventory: InventoryData) => {
            const productName = inventory.product?.name?.toLowerCase() || '';
            return productName.includes(searchLower);
        });
    }, [data, searchTerm]);

    console.log("filteredInventory", filteredInventory)


    let handleDelete = (id: number) => {
        if (confirm("Do You Really Want To Delete This Inventory?")) {
            deleteInventory(id)
        }
    }

    let handleAddInventory = () => {
        setModalMode("create");
        setEditingInventory(null);
        setIsModalOpen(true);
    }

    let handleEditInventory = (inventory: InventoryData) => {
        setModalMode("edit");
        setEditingInventory(inventory);
        setIsModalOpen(true);
    }

    let handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingInventory(null);
        setModalMode("create");
    }

    let handleAddInventorySave = () => { } // This is for backward compatibility, actual save is handled in modal


    return (
        <>
            <InventoryModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleAddInventorySave}
                editingInventory={editingInventory}
                mode={modalMode}
            />

            <div className="space-y-6">

                {/* 1. Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Inventory Management</h2>
                        <p className="text-sm text-slate-500">Manage your inventory stock levels.</p>
                    </div>
                    <button 
                        onClick={handleAddInventory} 
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-all active:scale-95"
                    >
                        <Plus className="h-4 w-4" />
                        Add Inventory
                    </button>
                </div>

                {/* 2. Toolbar (Search & Filter) */}
                <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by product name..."
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
                                    <th className="px-6 py-4 font-medium text-slate-500">Product</th>
                                    <th className="px-6 py-4 font-medium text-slate-500">Quantity</th>
                                    <th className="px-6 py-4 text-right font-medium text-slate-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredInventory?.length > 0 ? (
                                    filteredInventory.map((inventory: InventoryData) => {
                                        return (
                                            <tr
                                                key={inventory.id}
                                                className="group hover:bg-slate-50/80 transition-colors"
                                            >
                                                {/* Product */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                            <Package className="h-5 w-5" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-semibold text-slate-700">
                                                                {inventory.product?.name || `Product ID: ${inventory.productId}`}
                                                            </span>
                                                            {inventory.product?.description && (
                                                                <span className="text-xs text-slate-500 max-w-md line-clamp-1">
                                                                    {inventory.product.description}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Quantity */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Warehouse className="h-4 w-4 text-slate-400" />
                                                        <span className="font-semibold text-slate-700">
                                                            {inventory.quantity}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => handleEditInventory(inventory)}
                                                            className="rounded p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                                            title="Edit Inventory"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </button>

                                                        <button 
                                                            onClick={() => handleDelete(inventory.id)}
                                                            className="rounded p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                                                            title="Delete Inventory"
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
                                        <td colSpan={3} className="py-12 text-center text-slate-500">
                                            {searchTerm ? `No inventory found matching "${searchTerm}"` : "No inventory found"}
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

export default InventoryPage
