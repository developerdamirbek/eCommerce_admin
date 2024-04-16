import { useQuery } from "@tanstack/react-query";
import request from "../../../../config/request";

interface BannerType {
    id: number;
    title: string;
    image: {
        file: File;
        fileList: FileList
    };
    description: string;
}

export const useGetBannertById = (id: string | undefined) => {
    return useQuery({
        queryKey: ['banner', id],
        queryFn: () =>
            request.get<BannerType>(`/banner/${id}/`).then((res) => {
                const banner = res.data;
                return banner;
            }),
    });
};
