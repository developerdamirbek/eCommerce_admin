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

export const useGetBrand = (filterParams?: Record<string, string>) => {
    return useQuery({
        queryKey: ["brand", filterParams], // Include filterParams in the query key
        queryFn: () => {
            // Construct the request URL with filterParams
            const url = "/brand/";
            const params = new URLSearchParams(filterParams).toString();
            const requestUrl = params ? `${url}?${params}` : url;

            return request.get<BrandListType>(requestUrl).then((res) => {
                const { results } = res.data;
                const dataSource = results.map((brand) => ({
                    key: brand.id.toString(),
                    id: brand.id,
                    title: brand.title,
                    image: brand.image, // Include the image property
                    // Add more properties as needed
                }));
                return dataSource;
            });
        },
    });
};
