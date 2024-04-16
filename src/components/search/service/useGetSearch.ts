import { useQuery } from "@tanstack/react-query";
import request from "../../../config/request";

export const useSearchQuery = (search= '', api_url: string) => {
    return useQuery({
        queryKey: ["search", search],
        queryFn: () => {
            return request.get(`/${api_url}/`, {params : {search}}).then((res) => res.data)
        }
    })
}