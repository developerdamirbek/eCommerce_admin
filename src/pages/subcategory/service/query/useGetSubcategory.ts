import { useQuery } from '@tanstack/react-query';
import request from '../../../../config/request';

interface SubcategoryType {
    id: number,
    image: string,
    title: string
}

export const useGetSubcategories = () => {
    return useQuery(
        {
            queryKey: ['subcategories'],
            queryFn: () => request.get('/api/subcategory/').then((res) => {
                const { results } = res.data;
                const subcategories = results.map((subcategory: SubcategoryType) => ({
                    id: subcategory.id,
                    image: subcategory.image,
                    title: subcategory.title
                }));
                return subcategories;
            })

        },
    );
}