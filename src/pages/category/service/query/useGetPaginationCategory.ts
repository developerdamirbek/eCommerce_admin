// import { useQuery } from "@tanstack/react-query";
// import request from "../../../../config/request";

// export interface CategoryType {
//     id: number;
//     title: string;
//     image: string;
//     description: string
// }

// export interface CategoryListType {
//     count: number;
//     next: number | null;
//     previous: number | null;
//     results: CategoryType[];
// }


// export const useGetPaginationCategory = ( page : number = 1 ) => {
//     return useQuery({
//         queryKey: ['banner', page],
//         queryFn: () => request.get<CategoryListType>(`/category/`)
//         }).then((res) => {
//             return {
//                 data: res.data,
                
//             }
//         })
//     });
// };
