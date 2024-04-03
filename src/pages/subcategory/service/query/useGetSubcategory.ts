import { useQuery } from '@tanstack/react-query';
import request from '../../../../config/request';

export const useGetSubcategories = () => {
    return useQuery({
        queryKey: ['subcategories'],
        queryFn: async () => {
            try {
                const response = await request.get('/api/subcategory/');
                if (!response.data || !Array.isArray(response.data.results)) {
                    throw new Error('Invalid response data');
                }
                const subcategories = response.data.results.map((subcategory: any) => ({
                    id: subcategory.id,
                    image: subcategory.image,
                    title: subcategory.title
                }));
                return subcategories;
            } catch (error) {
                console.error('Error fetching subcategories:', error);
                throw new Error('Error fetching subcategories');
            }
        },
    });
};
