import React from 'react';
import { Spin, Tabs, message } from 'antd';
import type { TabsProps } from 'antd';
import { SubcategoryForm } from './components/subcategory-form';
import { useGetCategoryByID } from '../category/service/query/useGetCategoryById';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditCategory } from '../category/service/mutation/useEditCategory';
import { useEditAttribute } from './service/mutation/useEditAttribute';
import { AttributeForm } from './components/attribute-form';

interface SubcategoryType {
  id: number,
  title: string,
  image: {
    file: File,
    fileList: FileList
  }
}

interface DataType {
  attr_list: {
      title: string;
      category: number[];
      values: string[];
  }[];
  category_id: string | null 
}

export const EditSubcategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetCategoryByID(id);

  const navigate = useNavigate()

  const { mutate: editCategory, isPending: isCategoryPending } = useEditCategory(id);
  const { mutate: editAttribute, isPending } = useEditAttribute();

  const submitCategory = (data: SubcategoryType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image && (data.image.file instanceof File)) {
      formData.append("image", data.image.file);
    }
    editCategory(formData, {
      onSuccess: () => {
        message.success("Category Edited");
      }
    });
  };

  const submitAttribute = (values: any) => {
    const attributes = values.items?.map((item: {
        title: string;
        category: number[];
        values: { value: string, value_id: string | null }[];

    }) => {
      return {
        attribute_id: null,
        title: item.title,
        values: item?.values?.map((innerItem) => {
          return {
            value: innerItem.value, value_id: null
          }
        })
      }
    })
    const itemValue = { attributes, category_id: data.id }

    editAttribute(itemValue, {
      onSuccess: () => {
        message.success("Updated successfully!")
        navigate("/app/subcategory")
      }
    })
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Subcategory',
      children: <SubcategoryForm loading={isCategoryPending} initialValue={data} submit={submitCategory} />,
    },
    {
      key: '2',
      label: 'Attribute',
      children: <AttributeForm initialValue={data} submit={submitAttribute} loading={isPending} />,
    }
  ];

  return isLoading ? <Spin /> : (
    <Tabs defaultActiveKey="1" items={items} />
  );
};
