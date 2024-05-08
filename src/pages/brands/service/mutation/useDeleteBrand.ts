import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

export const useDeleteBrand = () => {
    return useMutation({
        mutationKey: ["delete-brand"],
        mutationFn: (brandId: number) =>
            request.delete(`/brand/${brandId}/`),

    }

    );
};
