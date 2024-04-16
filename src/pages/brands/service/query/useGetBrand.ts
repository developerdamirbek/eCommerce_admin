import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";

export interface Brand {
    id: number;
    title: string;
    image: string | null;
}

export interface BrandListType {
    count: number;
    next: string | null;
    previous: string | null;
    results: Brand[];
}

export const useGetBrand = (ordering?: string) => {
    return useQuery({
        queryKey: ["brand", ordering],
        queryFn: () => {
            return request.get<BrandListType>(`brand/${ordering ? `?ordering=${ordering}` : ''}`).then((res) => {
                const { results } = res.data;
                const dataSource = results.map((brand) => ({
                    key: brand.id.toString(),
                    id: brand.id,
                    title: brand.title,
                    image: brand.image,
                }));
                return dataSource;
            });
        },
    });
};
