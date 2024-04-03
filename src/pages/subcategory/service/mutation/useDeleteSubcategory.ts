import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

export const useDeleteSubcategory = () => {
    return useMutation({
        mutationKey: ["delete-subcategory"],
        mutationFn: (subcategoryId: string) => (
            request.delete(`/category/${subcategoryId}/`)
                .then(response => response.data)
                .catch(error => {
                    throw new Error(`Failed to delete subcategory: ${error}`);
                })
        )
    });
};
