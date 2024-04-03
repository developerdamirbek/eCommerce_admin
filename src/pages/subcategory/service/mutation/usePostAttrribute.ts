import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

interface DataType {
    attr_list: {
        title: string;
        category: number[];
        values: string[];
    }[];
}

export const usePostAttribute = () => {
    return useMutation({
        mutationKey: ["post-attribute"],
        mutationFn: (data: DataType) => (
            request.post("/attribute/", data
            )
                .then(response => response.data)
        )
    });
};
