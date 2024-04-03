import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

interface DataType {
    attr_list: {
        title: string;
        category: number[];
        values: string[];
    }[];
}

export const useEditAttribute = () => {
    return useMutation({
        mutationKey: ["edit-attribute"],
        mutationFn: (data: DataType) => (
            request.post("api/category_edit/", data
            )
                .then(response => response.data)
        )
    });
};
