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

export interface ProductListType {
    count: number;
    next: number | null;
    previous: number | null;
    results: ProductType[];
}

export const useGetProduct = ( page : number = 1 ) => {
    return useQuery({
        queryKey: ['product', page],
        queryFn: () => request.get<ProductListType>(`/product/`, {
            params: {offset: page, limit: 4}
        }).then((res) => {
            return {
                data: res.data,
                pageSize: Math.ceil(res.data.count)
            }
        })
    });
};
