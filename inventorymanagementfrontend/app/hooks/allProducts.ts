import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services/product.service";

export const allProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
        staleTime: 0
    });
};
