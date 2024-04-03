import { useMutation } from "@tanstack/react-query";
import request from "../../../../config/request";

interface LoginType {
    phone_number: string;
    password: string;
}

export const usePostUser = () => {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: (data:LoginType) => request.post<{token:string}>("/api/admin-login/", data).then((res) => res.data)
    });
};
