import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

export const usePostProduct = () => {
    return useMutation({
        mutationKey: ["post-product"],
        mutationFn: (formData: FormData) =>
            request.post(`/product/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then((res) => res.data)
    });
};

