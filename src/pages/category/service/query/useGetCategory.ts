import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";
import { CategoryListType } from "../types/types";

export const useGetCategory = () => {
    return useQuery({
        queryKey: ['category'],
        queryFn: () => request.get<CategoryListType>("/category/").then((res) => {
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
