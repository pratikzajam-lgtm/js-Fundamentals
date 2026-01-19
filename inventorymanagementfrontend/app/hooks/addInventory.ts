import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addInventory } from '../services/inventory.service';
import { toast } from 'react-toastify'


export const useCreateInventory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ productId, inventoryData }: { productId: number; inventoryData: { quantity?: number; location?: string; [key: string]: any } }) => 
            addInventory(productId, inventoryData),

        onSuccess: (data) => {
            console.log("Server says:", data.message);
            toast(data.message || "Inventory created successfully!");

            queryClient.invalidateQueries({ queryKey: ['inventory'] });
        },

        onError: (error: any) => {
            console.error("Failed:", error.response?.data);
            toast(error.response?.data?.message || "Failed to create inventory")
        }
    });
};
