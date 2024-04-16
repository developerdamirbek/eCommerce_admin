import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

export const useDeleteBanner = () => {
    return useMutation({
        mutationKey: ["delete-banner"],
        mutationFn: (bannerId: number) =>
            request.delete(`/banner/${bannerId}/`),
    }
    );
};
