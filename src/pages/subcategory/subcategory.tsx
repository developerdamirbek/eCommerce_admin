import { Button, Table, Spin, Popconfirm, message, Image, PaginationProps, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetSubcategories } from './service/query/useGetSubcategory';
import { useDeleteSubcategory } from './service/mutation/useDeleteSubcategory';
import { useState } from 'react';

export const Subcategory = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1)
    const [page1, setPage1] = useState(1)
    const { data, isLoading, refetch } = useGetSubcategories(page)


    const pageChange: PaginationProps["onChange"] = (page) => {
        setPage1(page)
        setPage(page !== 1 ? (page -1 ) * 4 : 1)
    }
    const { mutate: deleteSubcategory, isPending } = useDeleteSubcategory();


    const handleCreate = () => {
        navigate('/app/subcategory/create');
    };

    const handleEdit = (subcategoryId: string) => {
        navigate(`/app/subcategory/edit/${subcategoryId}`);
    };

    const handleDelete = (subcategoryId: string) => {
        deleteSubcategory(subcategoryId, {
            onSuccess: () => {
                refetch();
                message.success("Subcategory deleted successfully!")
            },
            onError: (error) => {
                console.error('Error deleting subcategory:', error);
            }
        });
    };

    const columns: any = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => (
                <Image src={image} style={{ width: 80 }} />
            )
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },

        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, data: any) => (
                <span className='btn_group'>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(data.id)}>Edit</Button>
                    <Popconfirm
                        title="Are you sure to delete this subcategory?"
                        onConfirm={() => handleDelete(data.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />}>
                            Delete
                        </Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    return (
        <Spin spinning={isPending}>
            <div>
                <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Button onClick={handleCreate} className='button' type="primary" icon={<PlusCircleOutlined />} >
                        Create
                    </Button>
                    <Pagination
                        style={{ width: "100%", display: "flex", justifyContent: "end", marginBottom: 10, marginTop: 10 }}
                        current={page1}
                        total={data?.pageSize}
                        defaultCurrent={page}
                        pageSize={4}
                        onChange={pageChange} />
                </div>
                <Spin spinning={isLoading}>
                    <Table className='table' pagination={false} dataSource={data?.data.results} columns={columns} />
                </Spin>
            </div>
        </Spin>
    );
};
