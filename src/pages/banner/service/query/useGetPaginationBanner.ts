import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";

export interface CategoryType {
    id: number;
    title: string;
    image: string;
    description: string
}

export interface CategoryListType {
    count: number;
    next: number | null;
    previous: number | null;
    results: CategoryType[];
}


export const useGetPaginationBanner = (ordering : string = "id", page : number = 1 ) => {
    return useQuery({
        queryKey: ['banner', ordering, page],
        queryFn: () => request.get<CategoryListType>(`/banner/${ordering ? `?ordering=${ordering}` : ''}`, {
            params: {offset: page, limit: 4}
        }).then((res) => {
            return {
                data: res.data,
                pageSize: Math.ceil(res.data.count)
            }
        })
    });
};
