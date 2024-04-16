import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

export const useDeleteProduct = () => {
    return useMutation({
        mutationKey: ["delete-product"],
        mutationFn: (productId: string) => (
            request.delete(`/product/${productId}/`)
                .then(response => response.data)
        )
    });
};
