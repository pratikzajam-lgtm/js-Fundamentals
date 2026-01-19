import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from '../services/product.service';
import { toast } from 'react-toastify'


export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ productId, productData }: { productId: number; productData: { name?: string; description?: string; price?: number } }) => 
            updateProduct(productId, productData),

        onSuccess: (data) => {
            console.log("Server says:", data.message);
            toast(data.message || "Product updated successfully!");

            queryClient.invalidateQueries({ queryKey: ['products'] });
        },

        onError: (error: any) => {
            console.error("Failed:", error.response?.data);
            toast(error.response?.data?.message || "Failed to update product")
        }
    });
};
