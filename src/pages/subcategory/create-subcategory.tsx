import { useEffect, useState } from 'react';
import {  message, Tabs, TabsProps } from 'antd';
import { usePostCategory } from '../category/service/mutation/usePostCategory';
import './style.scss';
import { CreateAttribute } from './components/createAttribute';
import { SubcategoryForm } from './components/subcategory-form';

export const CreateSubcategory = () => {
    const [subcategoryTabDisabled, setSubcategoryTabDisabled] = useState(true);

    const [subcategoryID, setSubcategoryID] = useState<number | null>(null); 
    const [activeTab, setActiveTab] = useState("1");
    const [formSubmitted, setFormSubmitted] = useState(false);

    const postCategoryMutation = usePostCategory();
    const { mutate: postSubcategory, isPending } = postCategoryMutation;

    const handleFormSubmit = (data: any) => {
        const formData = new FormData();
        formData.append('title', data.title);
        if (data.image) {
            formData.append("image", data.image.file);
        }
        formData.append('parent', data.parent);
    
        postSubcategory(formData, {
            onSuccess: (data) => { 
                message.success('Subcategory created successfully!');
                setActiveTab("2");
                setSubcategoryID(data.data?.id);
                setFormSubmitted(true)
            },
            onError: (error) => {
                message.error(error.message);
            }
        });
    };


    useEffect(() => {
        if (formSubmitted) {
            setActiveTab("2");
            setSubcategoryTabDisabled(false);
        }
    }, [formSubmitted]);

    const items : TabsProps['items'] = [
        {
            key: '1',
            label: 'Subcategory',
            children: <SubcategoryForm submit={handleFormSubmit} loading={isPending}/>,
        },
        {
            key: '2',
            label: 'Attribute',
            children: <CreateAttribute subcategoryID={subcategoryID}/>,
            disabled: subcategoryTabDisabled
        }
    ];

    return (
        <div>
            <Tabs activeKey={activeTab} items={items} onChange={setActiveTab} />
        </div>
    );
};
