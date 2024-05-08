import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";

 interface Brand {
    id: number;
    title: string;
    image: string;
}

 interface BrandListType {
    count: number;
    next: string | null;
    previous: string | null;
    results: Brand[];
}

export const useGetBrand = (ordering?: string, page?: number) => {
    return useQuery({
        queryKey: ["brand", ordering, page],
        queryFn: () => {
            return request.get<BrandListType>(`brand/${ordering ? `?ordering=${ordering}` : ''}`, {
                params: {offset: page, limit: page ? 4: ''}
            }).then((res) => {
                return {
                    data: res.data,
                    pageSize: Math.ceil(res.data.count)
                }
            });
        },
    });
};
