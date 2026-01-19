import { useMutation } from '@tanstack/react-query';
import { deleteInventory } from '../services/inventory.service'
import { useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';

export const useDeleteInventory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteInventory,
        onSuccess: (result) => {
          console.log(result)

            queryClient.invalidateQueries({ queryKey: ["inventory"], refetchType: 'active' })
            toast(result.message || "Inventory deleted successfully")
            console.log(result.message)
        },

         onError: (error: any) => {
            console.error("Failed:", error.response?.data);
            toast(error.response?.data?.message || "Failed to delete inventory")
        }
    })
};
