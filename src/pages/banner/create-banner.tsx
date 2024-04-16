import React from 'react';
import { message } from 'antd';
import { usePostBanner } from './service/mutation/usePostBanner';
import 'react-quill/dist/quill.snow.css';
import { BannerForm } from './components/banner-form';
import { useNavigate } from 'react-router-dom';

interface BannerPostType {
    id: number,
    title: string;
    image?: {
        file: File;
        fileList: FileList;
    };
    description: string;
}

export const CreateBanner: React.FC = () => {
    const { mutate, isPending } = usePostBanner();
    const navigate = useNavigate()

    const onFinish = async (values: BannerPostType) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        if (values.image) {
            formData.append("image", values.image.file);
        }
        mutate(formData, {
            onSuccess: () => {
                navigate('/app/banner')
                message.success('Banner created successfully');
            },
            onError: (error) => {
                message.error(error.message);
            },
        });
    };
    
    return (
        <BannerForm loading={isPending} submit={onFinish} />
    );
};
