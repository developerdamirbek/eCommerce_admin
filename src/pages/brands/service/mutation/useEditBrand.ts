import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

export const useEditBrand = (brandId: string | undefined) => {
    return useMutation({
        mutationKey: ["edit-brand"],
        mutationFn: (data : FormData) =>
            request.patch(`/brand/${brandId}/`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then((res) => res.data),
    });
};
