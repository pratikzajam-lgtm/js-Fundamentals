"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useCreateInventory } from "../hooks/addInventory";
import { useUpdateInventory } from "../hooks/updateInventory";
import { allProducts } from "../hooks/allProducts";

interface InventoryData {
    id?: number;
    productId?: number;
    quantity?: number;
    location?: string;
    [key: string]: any;
}

interface ProductData {
    id: number;
    name: string;
    description: string;
    price: number;
}

interface InventoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (inventory: { productId: number; quantity?: number }) => void;
    editingInventory?: InventoryData | null;
    mode?: "create" | "edit";
}

const InventoryModal = ({ isOpen, onClose, onSave, editingInventory, mode = "create" }: InventoryModalProps) => {
    
    const { mutate: createInventory, isPending: isCreating } = useCreateInventory();
    const { mutate: updateInventory, isPending: isUpdating } = useUpdateInventory();
    const { data: products } = allProducts();
    
    const isPending = isCreating || isUpdating;
    const isEditMode = mode === "edit" && editingInventory;

    const [formData, setFormData] = useState({
        productId: 0,
        quantity: 0
    });

    useEffect(() => {
        if (isEditMode && editingInventory) {
            setFormData({
                productId: editingInventory.productId || 0,
                quantity: editingInventory.quantity || 0
            });
        } else {
            setFormData({
                productId: 0,
                quantity: 0
            });
        }
    }, [mode, editingInventory?.id]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isEditMode && editingInventory?.id) {
            // Update inventory
            updateInventory(
                { 
                    inventoryId: editingInventory.id, 
                    inventoryData: { 
                        quantity: formData.quantity
                    } 
                },
                {
                    onSuccess: () => {
                        setFormData({ productId: 0, quantity: 0 });
                        onClose();
                    }
                }
            );
        } else {
            // Create new inventory - requires productId
            if (!formData.productId) {
                alert("Please select a product");
                return;
            }
            
            createInventory(
                {
                    productId: formData.productId,
                    inventoryData: {
                        quantity: formData.quantity
                    }
                },
                {
                    onSuccess: () => {
                        setFormData({ productId: 0, quantity: 0 });
                        onClose();
                    }
                }
            );
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
                        {isEditMode ? "Edit Inventory" : "Add New Inventory"}
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

                    {/* Product Dropdown - Only show for create mode */}
                    {!isEditMode && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Select Product</label>
                            <select
                                required
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                value={formData.productId}
                                onChange={(e) => setFormData({ ...formData, productId: parseInt(e.target.value) || 0 })}
                            >
                                <option value="">Choose a product...</option>
                                {products?.map((product: ProductData) => (
                                    <option key={product.id} value={product.id}>
                                        {product.name} - ${product.price}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Quantity Input */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                        <input
                            required
                            type="number"
                            min="0"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            placeholder="Enter quantity"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                        />
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
                            {isPending ? "Saving..." : isEditMode ? "Update Inventory" : "Add Inventory"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InventoryModal;
