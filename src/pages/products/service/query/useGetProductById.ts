import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";

interface ProductType {
    id: number;
    title: string;
    image: {
        file: File;
        fileList: FileList
    };
    price: string;
    is_available: boolean;
    category: string;
    is_new: boolean;
}

export const useGetProductById = (id: string | undefined) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () =>
            request.get<ProductType>(`/product/${id}/`).then((res) => {
                const product = res.data;
                return product;
            }),
    });
};
