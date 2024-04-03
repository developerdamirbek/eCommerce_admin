import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

interface Subcategory {
    id?: number;
    title: string;
    image?: [];
    parent?: null;
}

export const useUpdateSubcategory = () => {
    return useMutation({
        mutationKey: ["update-subcategory"],
        mutationFn: ({ id, ...subcategoryData }: { id: string, subcategoryData: Subcategory }) => (
            request.patch(`/category/${id}/`, subcategoryData)
                .then(response => response.data)
                .catch(error => {
                    throw new Error(`Failed to update subcategory: ${error}`);
                })
        )
    });
};
