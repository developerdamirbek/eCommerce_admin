import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";
import { AttributeType } from "../types/types";

export const useGetAttribute = () => {
    return useQuery({
        queryKey: ['attribute'],
        queryFn: () => request.get<AttributeType>("/attribute/").then((res) => res.data)
    });
};
