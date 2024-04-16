import { useState, useEffect, useRef } from 'react';
import { Tabs, TabsProps, message } from 'antd';
import './style.scss';
import { CreateForm } from '../../components/form/form';
import { SubcategoryForm } from '../../components/form/subcategory-form';
import { usePostCategory } from './service/mutation/usePostCategory';
//@ts-ignore
import SuccessNotify from "./success.mp3";
import { CategoryForm } from './components/category-form';

interface FormDataType {
    title: string;
    image?: {
        file: File;
    };
};

export const CreateCategory = () => {
    const [activeTab, setActiveTab] = useState("1");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [subcategoryTabDisabled, setSubcategoryTabDisabled] = useState(true);
    const [createdCategoryId, setCreatedCategoryId] = useState<number | null>(null); 
    const postCategoryMutation = usePostCategory();
    const { mutate: postCategory, isPending } = postCategoryMutation;

    const audioPlayer: any = useRef(null);

    const playAudio = () => {
        audioPlayer.current.play();
    }

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
                playAudio();
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
            <audio ref={audioPlayer} src={SuccessNotify} />
        </div>
    );
};