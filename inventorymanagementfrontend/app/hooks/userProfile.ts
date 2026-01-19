import { useQuery } from "@tanstack/react-query";
import { fetchProfileDetails } from "../services/user.service";

export const useProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: fetchProfileDetails,
        staleTime:0
    });
};
