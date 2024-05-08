import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin, message, Tabs, Table, Image, Button, Popconfirm } from 'antd';
import { useEditCategory } from './service/mutation/useEditCategory';
import { useGetCategoryByID } from './service/query/useGetCategoryById';
import { useGetSubcategoriesByCategoryID } from './service/mutation/useGetSubcategoriesByCategoryID';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDeleteSubcategory } from '../subcategory/service/mutation/useDeleteSubcategory';
import { CategoryForm } from './components/category-form';

interface CategoryType {
    id?: number;
    title: string;
    image?: {
        file: File,
        fileList: FileList
    };
}

export const EditCategory: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { mutate } = useEditCategory(id);
    const { data: categoryData, isLoading: categoryLoading } = useGetCategoryByID(id);
    const { data: subcategories, isLoading: subcategoriesLoading, refetch: refetchSubcategories } = useGetSubcategoriesByCategoryID(id as string);
    const { mutate: deleteSub, isPending } = useDeleteSubcategory();

    const dataSource = subcategories?.children?.map((item: { key: number, id: number, title: string, image: string }) => ({
        key: item.id,
        id: item.id,
        title: item.title,
        image: item.image
    }));

    const navigate = useNavigate()

    const handleSubmit = (data: CategoryType) => {
        const formDataObject = new FormData();
        formDataObject.append('title', data.title);
        if (data.image && (data.image.file instanceof File)) {
            formDataObject.append("image", data.image.file);
        }
        mutate(formDataObject, {
            onSuccess: () => {
                message.success('Category edited successfully!');
                navigate("/app/category")
            }
        });

    };

    const handleDelete = (subcategoryId: string | undefined) => {
        deleteSub(subcategoryId, {
            onSuccess: () => {
                message.info("Subcategory deleted successfully!");
                refetchSubcategories();
                console.log(id);

            }
        });
    };

    const handleEdit = (subcategoryId: string | undefined) => {
        navigate(`/app/subcategory/edit/${subcategoryId}`)
    }

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
            render: (_: { id: string }, record: { id: string | undefined }) => (
                <span className='btn_group'>
                    <Popconfirm
                        title="Are you sure you want to delete this category?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" style={{ backgroundColor: "red" }} icon={<DeleteOutlined />}>Delete</Button>
                    </Popconfirm>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record.id)}>Edit</Button>
                </span>
            )
        }
    ];

    const items = [
        {
            key: '1',
            label: 'Edit Category',
            children: categoryLoading ? <Spin /> : <CategoryForm loading={isPending} initialValue={categoryData} submit={handleSubmit} />
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

