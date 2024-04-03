import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";

export const useGetSubcategoriesByCategoryID = (categoryId: string) => {
    return useQuery({
        queryKey: ["subcategories", categoryId],
        queryFn: () => request.get(`/category/${categoryId}/`).then((res) => res.data),
    });
};
