import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

export const usePostBrand = () => {
    return useMutation({
        mutationKey: ["post-brand"],
        mutationFn: (formData: FormData) =>
            request.post(`/brand/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then((res) => res.data)
    }
    );
};
