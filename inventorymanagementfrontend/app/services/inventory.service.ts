"use client"
import { api } from "../utils/axiosInstance";

export const getAllInventory = async () => {
    try {
        let response = await api.get("api/v1/inventory");
        return response.data.data?.inventory || response.data.data || response.data
    } catch (error) {
        throw error
    }
}

export const getInventoryById = async (inventoryId: number) => {
    try {
        let response = await api.get(`api/v1/inventory/${inventoryId}`);
        return response.data
    } catch (error) {
        throw error
    }
}

export const deleteInventory = async (inventoryId: number) => {
    try {
        let response = await api.delete(`api/v1/inventory/${inventoryId}`);
        return response.data
    } catch (error) {
        throw error
    }
}

interface InventoryData {
    quantity?: number;
    location?: string;
    [key: string]: any;
}

export const addInventory = async (productId: number, inventoryData: InventoryData) => {
    try {
        let response = await api.post(`api/v1/inventory/${productId}`, inventoryData)
        return response.data
    } catch (error) {
        throw error
    }
}

export const updateInventory = async (inventoryId: number, inventoryData: InventoryData) => {
    try {
        let response = await api.patch(`api/v1/inventory/${inventoryId}`, inventoryData)
        return response.data
    } catch (error) {
        throw error
    }
}
