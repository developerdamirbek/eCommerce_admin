import { useQuery } from '@tanstack/react-query';
import request from '../../../../config/request';

interface SubcategoryType {
    count: number,   
    next: number | null
    previous: number | null
    results : {
        title: string;
        image: {
            file: File,
            fileList: FileList
        }
        id: number
    }[]
}

export const useGetSubcategories = (page?: number) => {
    return useQuery(
        {
            queryKey: ['subcategories', page],
            queryFn: () => request.get<SubcategoryType>('/api/subcategory/', {
                params: { offset: page, limit: page ? 4 : '' }
            }).then((res) => {
                return {
                    data: res.data,
                    pageSize: Math.ceil(res.data.count)
                }
            })

        },
    );
}