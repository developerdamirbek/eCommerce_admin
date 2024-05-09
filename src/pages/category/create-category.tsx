import { useState, useEffect } from 'react';
import { Tabs, TabsProps, message } from 'antd';
import './style.scss';
import { SubcategoryForm } from './components/create-subcategory';
import { usePostCategory } from './service/mutation/usePostCategory';
import { CategoryForm } from './components/category-form';

interface FormDataType {
    title: string;
    image?: {
        file: File,
        fileList: FileList
    };
};


export const CreateCategory = () => {
    const [activeTab, setActiveTab] = useState("1");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [subcategoryTabDisabled, setSubcategoryTabDisabled] = useState(true);
    const [createdCategoryId, setCreatedCategoryId] = useState<number | null>(null); 
    const postCategoryMutation = usePostCategory();
    const { mutate: postCategory, isPending } = postCategoryMutation;




    const handleCategoryFormSubmit = (values: FormDataType) => {
        const formData = new FormData();
        formData.append('title', values.title);
        if (values.image) {
            formData.append('image', values.image.file);
        }

        postCategory(formData, {
            onSuccess: (data) => {
                message.success('Category created successfully!');
                setFormSubmitted(true);
                setCreatedCategoryId(data?.data?.id);
            }
        });
    };

    useEffect(() => {
        if (formSubmitted) {
            setActiveTab("2");
            setSubcategoryTabDisabled(false);
        }
    }, [formSubmitted]);

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Create Category',
            children: <CategoryForm loading={isPending} submit={handleCategoryFormSubmit}/>,
          },
          {
            key: '2',
            label: 'Subcategory',
            children: <SubcategoryForm
            parentCategoryId={createdCategoryId} /> ,
            disabled: subcategoryTabDisabled
          },
    ]

    return (
        <div>
            <Tabs activeKey={activeTab} items={items} onChange={setActiveTab}/>
        </div>
    );
};