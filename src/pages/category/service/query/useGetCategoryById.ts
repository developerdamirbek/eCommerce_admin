import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";



export const useGetCategoryByID = (id: string) => {
    return useQuery({
        queryKey: ['category', id],
        queryFn: () => request.get(`/category/${id}/`).then((res) => res.data)
    });
};
