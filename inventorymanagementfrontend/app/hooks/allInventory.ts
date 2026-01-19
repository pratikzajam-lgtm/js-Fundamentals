import { useQuery } from "@tanstack/react-query";
import { getAllInventory } from "../services/inventory.service";

export const allInventory = () => {
    return useQuery({
        queryKey: ["inventory"],
        queryFn: getAllInventory,
        staleTime: 0
    });
};
