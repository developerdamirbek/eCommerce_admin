    import { useMutation } from "@tanstack/react-query";
    import request from "../../../../config/request";

    interface DataType {
        attr_list: {
            title: string;
            category: number[];
            values: string[];
        }[];
        category_id: string | null 
    }

    export const useEditAttribute = () => {
        return useMutation({
            mutationKey: ["edit-attribute"],
            mutationFn: (data: DataType) => (
                request.patch("/api/category_edit/", data)
                    .then(response => response.data)
            )
        });
    };
