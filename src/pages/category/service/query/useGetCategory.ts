import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";
import { CategoryListType } from "../types/types";


export const useGetCategory = ( page?: number ) => {
    return useQuery({
        queryKey: ['banner', page],
        queryFn: () => request.get<CategoryListType>(`/category/`, {
            params: {offset: page, limit: page ?  4 : ''}
        }).then((res) => {
            return {
                data: res.data,
                pageSize: Math.ceil(res.data.count)
            }
        })
    });
};
