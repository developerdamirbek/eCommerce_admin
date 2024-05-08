import { Button, Table, Spin, Popconfirm, message, Image, PaginationProps, Pagination, TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetSubcategories } from './service/query/useGetSubcategory';
import { useDeleteSubcategory } from './service/mutation/useDeleteSubcategory';
import { useState } from 'react';

interface DataType {
    title: string;
    image: {
        file: File;
        fileList: FileList;
    };
    id: number;
    key: number;
}

export const Subcategory = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1)
    const [page1, setPage1] = useState(1)
    const { data, isLoading, refetch } = useGetSubcategories(page);

    const dataSource = data?.data.results.map((item) => ({
        title: item.title,
        image: item.image,
        id: item.id,
        key: item.id,
    }))


    const pageChange: PaginationProps["onChange"] = (page) => {
        setPage1(page)
        setPage(page !== 1 ? (page - 1) * 4 : 1)
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
                message.error(error.message);
            }
        });
    };


    const columns: TableProps<DataType>["columns"] = [
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
                <Image src={image} width={60} height={60} style={{ objectFit: "cover" }} />
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
            render: (_, data) => (
                <span className='btn_group'>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(String(data.id))}>Edit</Button>
                    <Popconfirm
                        title="Are you sure to delete this subcategory?"
                        onConfirm={() => handleDelete(String(data.id))}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="default" danger icon={<DeleteOutlined />}>
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
                    <Table className='table' pagination={false} dataSource={dataSource} columns={columns} />
                </Spin>
            </div>
        </Spin>
    );
};
