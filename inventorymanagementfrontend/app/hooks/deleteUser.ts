import { useMutation, QueryClient } from '@tanstack/react-query';
import { deleteUser } from '../services/user.service'
import { useQueryClient } from "@tanstack/react-query";
import { ToastClassName, toast } from 'react-toastify';

export const useDeleteUser = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: (result) => {
            queryClient.invalidateQueries({ queryKey: ["users"], refetchType: 'active' })
            toast(result.message)
            console.log(result.message)
        },

         onError: (error: any) => {
            console.error("Failed:", error.response.data);
            toast(error.response.data.message)
        }
    })
};
