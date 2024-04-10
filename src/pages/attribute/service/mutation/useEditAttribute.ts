import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";


export const useEditAttribute = () => {
    return useMutation({
        mutationKey: ["edit-attribute"],
        mutationFn: () => request.patch('api/category_edit/').then((res) => res.data)
    })
}