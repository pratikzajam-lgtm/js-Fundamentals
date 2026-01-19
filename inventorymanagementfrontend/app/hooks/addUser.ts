import { useMutation, QueryClient, useQueryClient } from "@tanstack/react-query";
import { addUser } from '../services/user.service';
import { toast } from 'react-toastify'


export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addUser,


        onSuccess: (data) => {


            console.log("Server says:", data.message);
            toast(data.message || "User created successfully!");


            queryClient.invalidateQueries({ queryKey: ['users'] });
        },

        onError: (error: any) => {
            console.error("Failed:",error.response.data);
            toast(error.response.data.message)
        }
    });
};