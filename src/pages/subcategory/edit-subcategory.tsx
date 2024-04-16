import React from 'react';
import { Tabs, message } from 'antd';
import type { TabsProps } from 'antd';
import { EditAttribute } from './components/edit-attribute';
import { SubcategoryForm } from './components/subcategory-form';
import { useGetCategoryByID } from '../category/service/query/useGetCategoryById';
import { useParams } from 'react-router-dom';
import { useEditCategory } from '../category/service/mutation/useEditCategory';

interface SubcategoryType {
  id: number,
  title: string,
  image: {
    file: File,
    fileList: FileList
  }
}


export const EditSubcategory: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const {data} = useGetCategoryByID(id)
  const {mutate, isPending} = useEditCategory(id)
  console.log(data);
  

  const submit = (data: SubcategoryType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if(data.image && (data.image.file instanceof File)){
      formData.append("image", data.image.file);
    }
    mutate(formData, {
      onSuccess: () => {
        message.success("Edited")
      }
    })
  }



  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Subcategory',
      children: <SubcategoryForm loading={isPending} initialValue={data} submit={submit} />,
    },
    {
      key: '2',
      label: 'Attribute',
      children: <EditAttribute />,
    }
  ];
  return (
    <Tabs defaultActiveKey="1" items={items} />
  );
}
