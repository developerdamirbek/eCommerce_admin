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


export const useGetBanner = (ordering?: string) => {
    return useQuery({
        queryKey: ['banner', ordering], // Include ordering in the query key
        queryFn: () => request.get<CategoryListType>(`/banner/${ordering ? `?ordering=${ordering}` : ''}`).then((res) => {
            const { results } = res.data;
            const dataSource = results.map((category) => ({
                key: category.id.toString(),
                id: category.id,
                title: category.title,
                image: category.image,
                description: category.description,
            }));
            return dataSource;
        })
    });
};
