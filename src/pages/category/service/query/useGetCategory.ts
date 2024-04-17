import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";
import { CategoryListType } from "../types/types";

export const useGetCategory = (page = 1, pageSize = 10) => {
    const offset = (page - 1) * pageSize;

    return useQuery({
        queryKey: ['category', { page, pageSize }],
        queryFn: () => request.get<CategoryListType>(`/category/`, {
            params: {
                limit: pageSize,
                offset: offset
            }
        }).then((res) => {
            const { results } = res.data;
            const dataSource = results.map((category) => ({
                key: category.id.toString(),
                id: category.id,
                title: category.title,
                image: category.image,
            }));
            return dataSource;
        })
    });
};
