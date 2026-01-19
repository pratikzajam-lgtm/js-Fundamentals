"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useCreateProduct } from "../hooks/addProduct";
import { useUpdateProduct } from "../hooks/updateProduct";

interface ProductData {
    id?: number;
    name: string;
    description: string;
    price: number;
}

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: { name: string; description: string; price: number }) => void;
    editingProduct?: ProductData | null;
    mode?: "create" | "edit";
}

const ProductModal = ({ isOpen, onClose, onSave, editingProduct, mode = "create" }: ProductModalProps) => {
    
    const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
    const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
    
    const isPending = isCreating || isUpdating;
    const isEditMode = mode === "edit" && editingProduct;

    const [formData, setFormData] = useState({
        name: "", 
        description: "", 
        price: 0
    });

    useEffect(() => {
        if (isEditMode && editingProduct) {
            setFormData({
                name: editingProduct.name || "",
                description: editingProduct.description || "",
                price: editingProduct.price || 0
            });
        } else {
            setFormData({
                name: "",
                description: "",
                price: 0
            });
        }
    }, [mode, editingProduct?.id]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isEditMode && editingProduct?.id) {
            // Update product
            updateProduct(
                { 
                    productId: editingProduct.id, 
                    productData: { 
                        name: formData.name, 
                        description: formData.description, 
                        price: formData.price 
                    } 
                },
                {
                    onSuccess: () => {
                        setFormData({ name: "", description: "", price: 0 });
                        onClose();
                    }
                }
            );
        } else {
            // Create new product
            onSave(formData);
            createProduct(formData, {
                onSuccess: () => {
                    setFormData({ name: "", description: "", price: 0 });
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
                        {isEditMode ? "Edit Product" : "Add New Product"}
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
                        <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                        <input
                            required
                            type="text"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            placeholder="Enter product name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    {/* Description Input */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                        <textarea
                            required
                            rows={3}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                            placeholder="Enter product description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    {/* Price Input */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Price</label>
                        <input
                            required
                            type="number"
                            min="0"
                            step="0.01"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            placeholder="Enter price"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
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
                            {isPending ? "Saving..." : isEditMode ? "Update Product" : "Add Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
