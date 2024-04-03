import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

export const useDeleteCategory = () => {
    return useMutation({
        mutationKey: ["delete-category"],
        mutationFn: (categoryId: number) =>
            request.delete(`/category/${categoryId}/`),
    }
    );
};
