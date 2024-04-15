import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";

export const useGetproduct = () => {
    return useQuery({
        queryKey: ['product'],
        queryFn: () => request.get("/product/").then((res) => {
            const { results } = res.data;
            const dataSource = results.map((category) => ({
                id: category.id,
                title: category.title,
                image: category.image,
                price: category.price,
                is_available: category.is_available,
                category: category.category,
                is_new: category.is_new
            }));
            return dataSource;
        })
    });
};
