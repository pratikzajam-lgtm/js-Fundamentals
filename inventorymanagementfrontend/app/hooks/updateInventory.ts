import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInventory } from '../services/inventory.service';
import { toast } from 'react-toastify'


export const useUpdateInventory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ inventoryId, inventoryData }: { inventoryId: number; inventoryData: { quantity?: number; location?: string; [key: string]: any } }) => 
            updateInventory(inventoryId, inventoryData),

        onSuccess: (data) => {
            console.log("Server says:", data.message);
            toast(data.message || "Inventory updated successfully!");

            queryClient.invalidateQueries({ queryKey: ['inventory'] });
        },

        onError: (error: any) => {
            console.error("Failed:", error.response?.data);
            toast(error.response?.data?.message || "Failed to update inventory")
        }
    });
};
