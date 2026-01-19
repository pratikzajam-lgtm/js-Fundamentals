import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/user.service";

export const allUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
        staleTime: 0
    });
};
