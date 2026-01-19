import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from '../services/user.service';
import { toast } from 'react-toastify'


export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userId, userData }: { userId: number; userData: { name?: string; email?: string; role?: string } }) => 
            updateUser(userId, userData),

        onSuccess: (data) => {
            console.log("Server says:", data.message);
            toast(data.message || "User updated successfully!");

            queryClient.invalidateQueries({ queryKey: ['users'] });
        },

        onError: (error: any) => {
            console.error("Failed:", error.response?.data);
            toast(error.response?.data?.message || "Failed to update user")
        }
    });
};
