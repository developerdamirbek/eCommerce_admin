import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

interface BannerType {
    id: number,
    image: {
        file: File,
        fileList: FileList
    },
    title: string,
    description: string
}


export const usePostBanner = () => {
    return useMutation({
        mutationKey: ["post-banner"],
        mutationFn: (formData: FormData) =>
            request.post<BannerType>(`/banner/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then((res) => res.data)
    });
};
