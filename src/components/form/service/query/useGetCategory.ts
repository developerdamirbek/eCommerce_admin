
import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";

export const useGetCategory = () => {
    return useQuery({
        queryKey: ["get-category"],
        queryFn: () => request.get(`/category/`).then((res) => res.data)
    });
};
