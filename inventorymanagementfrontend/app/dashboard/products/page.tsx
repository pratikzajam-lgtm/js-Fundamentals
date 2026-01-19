"use client";

import React, { useState, useMemo } from 'react';
import { allProducts } from '@/app/hooks/allProducts';
import ProductModal from '@/app/components/ProductModal';
import {
    Plus,
    Search,
    Filter,
    Trash2,
    Edit,
    Package,
    DollarSign
} from "lucide-react";
import { useDeleteProduct } from '@/app/hooks/deleteProduct';


interface ProductData {
    id: number,
    name: string,
    description: string,
    price: number,
    createdAt?: string,
    updatedAt?: string
}



const ProductsPage = () => {

    const { mutate: deleteProduct } = useDeleteProduct()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);
    const [modalMode, setModalMode] = useState<"create" | "edit">("create");

    const [searchTerm, setSearchTerm] = useState("");
    const { data } = allProducts()

    
    const filteredProducts = useMemo(() => {
        if (!data) return [];
        if (!searchTerm) return data;
        
        const searchLower = searchTerm.toLowerCase();
        return data.filter((product: ProductData) => 
            product.name.toLowerCase().includes(searchLower) || 
            product.description.toLowerCase().includes(searchLower)
        );
    }, [data, searchTerm]);


    let handleDelete = (id: number) => {
        if (confirm("Do You Really Want To Delete This Product?")) {
            deleteProduct(id)
        }
    }

    let handleAddProduct = () => {
        setModalMode("create");
        setEditingProduct(null);
        setIsModalOpen(true);
    }

    let handleEditProduct = (product: ProductData) => {
        setModalMode("edit");
        setEditingProduct(product);
        setIsModalOpen(true);
    }

    let handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
        setModalMode("create");
    }

    let handleAddProductSave = () => { } // This is for backward compatibility, actual save is handled in modal


    return (
        <>
            <ProductModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleAddProductSave}
                editingProduct={editingProduct}
                mode={modalMode}
            />

            <div className="space-y-6">

                {/* 1. Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Product Management</h2>
                        <p className="text-sm text-slate-500">Manage your inventory products and their details.</p>
                    </div>
                    <button 
                        onClick={handleAddProduct} 
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-all active:scale-95"
                    >
                        <Plus className="h-4 w-4" />
                        Add Product
                    </button>
                </div>

                {/* 2. Toolbar (Search & Filter) */}
                <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name or description..."
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
                                    <th className="px-6 py-4 font-medium text-slate-500">Description</th>
                                    <th className="px-6 py-4 font-medium text-slate-500">Price</th>
                                    <th className="px-6 py-4 text-right font-medium text-slate-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredProducts?.length > 0 ? (
                                    filteredProducts.map((product: ProductData) => {
                                        return (
                                            <tr
                                                key={product.id}
                                                className="group hover:bg-slate-50/80 transition-colors"
                                            >
                                                {/* Name */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                            <Package className="h-5 w-5" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-semibold text-slate-700">
                                                                {product.name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Description */}
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-slate-600 max-w-md line-clamp-2">
                                                        {product.description}
                                                    </span>
                                                </td>

                                                {/* Price */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <DollarSign className="h-4 w-4 text-slate-400" />
                                                        <span className="font-semibold text-slate-700">
                                                            {product.price.toLocaleString('en-IN', { 
                                                                minimumFractionDigits: 2, 
                                                                maximumFractionDigits: 2 
                                                            })}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => handleEditProduct(product)}
                                                            className="rounded p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                                            title="Edit Product"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </button>

                                                        <button 
                                                            onClick={() => handleDelete(product.id)}
                                                            className="rounded p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                                                            title="Delete Product"
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
                                        <td colSpan={4} className="py-12 text-center text-slate-500">
                                            {searchTerm ? `No products found matching "${searchTerm}"` : "No products found"}
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

export default ProductsPage
