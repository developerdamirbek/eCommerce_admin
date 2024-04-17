import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

interface DataType {
    attributes: {
        attribute_id: null,
        title: string,
        values: {
            value: string,
            value_id: null
        }[],
    }[]
}

export const usePostAttribute = () => {
    return useMutation({
        mutationKey: ["post-attribute"],
        mutationFn: (data: DataType) => (
            request.patch("/api/category_edit/", data
            )
                .then(response => response.data)
        )
    });
};
