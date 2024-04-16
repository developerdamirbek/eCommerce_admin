import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";

interface SubcategoryType {
    
}

export const useGetSubcategoryById = (id: string | undefined) => {
    return useQuery({
        queryKey: ['subcategory'],
        queryFn: () =>
            request.get<SubcategoryType>(`/category/${id}/`).then((res) => {
                const subcategory = res.data;
                return subcategory;
            }),
    });
};
