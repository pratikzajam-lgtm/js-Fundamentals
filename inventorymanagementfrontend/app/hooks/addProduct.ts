import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from '../services/product.service';
import { toast } from 'react-toastify'


export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addProduct,

        onSuccess: (data) => {
            console.log("Server says:", data.message);
            toast(data.message || "Product created successfully!");

            queryClient.invalidateQueries({ queryKey: ['products'] });
        },

        onError: (error: any) => {
            console.error("Failed:", error.response?.data);
            toast(error.response?.data?.message || "Failed to create product")
        }
    });
};
