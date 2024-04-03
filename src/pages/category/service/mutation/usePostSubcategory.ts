import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

export interface Subcategory {
    id: number;
    title: string;
    image: string | null;
    parent: number;
}

export interface SubcategoryResponse {
    id: number;
    title: string;
    image: string | null;
    parent: number;
}

export interface CreateSubcategoryPayload {
    title: string;
    image?: File;
    parent: number;
}

export const usePostSubcategory = () => {
    return useMutation({
        mutationKey: ["post-subcategory"],
        mutationFn: (payload) =>
            request.post<SubcategoryResponse>("/subcategory/", payload).then((res) => res.data)
    });
};
