import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

export const usePostCategory = () => {
    return useMutation({
        mutationKey: ["post-category"],
        mutationFn: (formData: FormData) =>
            request.post(`/category/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then((res) => res.data)
    }
    );
};
