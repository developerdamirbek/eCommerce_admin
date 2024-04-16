import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

export const useUpdateSubcategory = (id: string | undefined) => {
    return useMutation({
        mutationKey: ["update-subcategory"],
        mutationFn: (data : FormData) => (
            request.patch(`/category/${id}/`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(response => response.data)
        )
    });
};
