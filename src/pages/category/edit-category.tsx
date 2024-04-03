import React from 'react';
import { useParams } from 'react-router-dom';
import { Spin, message, Tabs, Table, TabsProps, Image, Button, Popconfirm } from 'antd';
import { CreateForm } from '../../components/form/form';
import { useEditCategory } from './service/mutation/useEditCategory';
import { useGetCategoryByID } from './service/query/useGetCategoryById';
import { useGetSubcategoriesByCategoryID } from './service/mutation/useGetSubcategoriesByCategoryID';
import { FormDataType } from './service/types/types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDeleteSubcategory } from '../subcategory/service/mutation/useDeleteSubcategory';

export const EditCategory: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { mutate } = useEditCategory(id);
    const { data: categoryData, isLoading: categoryLoading } = useGetCategoryByID(id as string);
    const { data: subcategories, isLoading: subcategoriesLoading, refetch: refetchSubcategories } = useGetSubcategoriesByCategoryID(id as string);
    const { mutate: deleteSub, isPending } = useDeleteSubcategory();

    const dataSource = subcategories?.children?.map((item) => ({
        key: item.id,
        id: item.id,
        title: item.title,
        image: item.image
    }));

    const handleSubmit = async (formData: FormDataType) => {
        try {
            const formDataObject = new FormData();
            formDataObject.append('title', formData.title);
            if (formData.image?.file) {
                formDataObject.append('image', formData.image.file);
            }
            await mutate(formDataObject);
            message.success('Category edited successfully!');
        } catch (error) {
            console.error('Error editing category:', error);
            message.error('Error editing category!');
        }
    };

    const handleDelete = async ({ id }: { id: string }) => {
        try {
            await deleteSub(id, {
                onSuccess: () => {
                    message.info("Subcategory deleted successfully!");
                    refetchSubcategories();
                }
            });
        } catch (error) {
            console.error('Error deleting subcategory:', error);
            message.error('Error deleting subcategory!');
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => (
                <Image style={{ width: 70 }} src={image} />
            )
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: "Actions",
            dataIndex: 'actions',
            key: 'actions',
            render: (_, data) => (
                <span className='btn_group'>
                    <Popconfirm
                        title="Are you sure you want to delete this category?"
                        onConfirm={() => handleDelete(data)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" style={{ backgroundColor: "red" }} icon={<DeleteOutlined />}>Delete</Button>
                    </Popconfirm>
                    <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>Edit</Button>
                </span>
            )
        }
    ];

    const handleEdit = () => {
        console.log("Edit");
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Edit Category',
            children: <CreateForm
                initialValues={{
                    title: categoryData?.title ?? '',
                    //@ts-ignore
                    image: categoryData?.image ? { file: null, url: categoryData.image } : undefined
                }}
                onFinish={handleSubmit}
                isLoading={categoryLoading}
            />
        },
        {
            key: '2',
            label: 'Subcategories',
            children: <Table
                dataSource={dataSource}
                className='table'
                columns={columns}
                loading={subcategoriesLoading}
            />,
        }
    ];

    return (
        <div>
            <Spin spinning={categoryLoading || isPending}>
                <Tabs items={items} defaultActiveKey='1' />
            </Spin>

        </div>
    );
};
