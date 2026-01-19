"use client"
import { api } from "../utils/axiosInstance";

export const getAllProducts = async () => {
    try {
        let response = await api.get("http://localhost:3000/api/v1/products");
        return response.data.data.products || response.data.data || response.data
    } catch (error) {
        throw error
    }
}

export const getProductById = async (productId: number) => {
    try {
        let response = await api.get(`http://localhost:3000/api/v1/products/${productId}`);
        return response.data
    } catch (error) {
        throw error
    }
}

export const deleteProduct = async (productId: number) => {
    try {
        let response = await api.delete(`http://localhost:3000/api/v1/products/${productId}`);
        return response.data
    } catch (error) {
        throw error
    }
}

interface Product {
    name: string,
    description: string,
    price: number
}

export const addProduct = async (product: Product) => {
    try {
        let response = await api.post(`http://localhost:3000/api/v1/products`, product)
        return response.data
    } catch (error) {
        throw error
    }
}

interface UpdateProduct {
    name?: string,
    description?: string,
    price?: number
}

export const updateProduct = async (productId: number, product: UpdateProduct) => {
    try {
        let response = await api.patch(`http://localhost:3000/api/v1/products/${productId}`, product)
        return response.data
    } catch (error) {
        throw error
    }
}
