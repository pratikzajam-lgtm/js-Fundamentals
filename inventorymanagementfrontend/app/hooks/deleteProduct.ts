import { useMutation } from '@tanstack/react-query';
import { deleteProduct } from '../services/product.service'
import { useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: (result) => {
          console.log(result)

            queryClient.invalidateQueries({ queryKey: ["products"], refetchType: 'active' })
            toast(result.message || "Product deleted successfully")
            console.log(result.message)
        },

         onError: (error: any) => {
            console.error("Failed:", error.response?.data);
            toast(error.response?.data?.message || "Failed to delete product")
        }
    })
};
