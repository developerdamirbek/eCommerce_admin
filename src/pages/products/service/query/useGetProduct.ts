import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";

interface ProductType {
    id: number;
    title: string;
    image: {
        file: File;
    };
    price: string;
    is_available: boolean;
    category: number;
    is_new: boolean;
}

export const useGetproduct = (page = 1, pageSize = 2) => {
    const offset = (page - 1) * pageSize;

    return useQuery({
        queryKey: ['product', page, pageSize],
        queryFn: () =>
            request.get(`/product/?limit=${pageSize}&offset=${offset}`).then((res) => {
                const { results } = res.data;
                const dataSource = results.map((product: ProductType) => ({
                    id: product.id,
                    title: product.title,
                    image: product.image,
                    price: product.price,
                    is_available: product.is_available,
                    category: product.category,
                    is_new: product.is_new
                }));
                return dataSource;
            }),
    });
};
