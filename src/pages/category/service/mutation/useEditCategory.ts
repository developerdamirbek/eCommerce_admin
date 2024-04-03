import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";
import { CategoryListType } from "../types/types";

export const useEditCategory = (id: string | undefined) => {
    return useMutation({
        mutationKey: ['edit-category'],
        mutationFn: (data: FormData) => 
            request.patch<CategoryListType>(`/category/${id}/`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then((res) => res.data)
    });
};
