import { useQuery } from '@tanstack/react-query';
import request from '../../../../config/request';


export const useGetSubcategories = (page?: number) => {
    return useQuery(
        {
            queryKey: ['subcategories', page],
            queryFn: () => request.get('/api/subcategory/', {
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