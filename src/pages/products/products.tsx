import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Image, Modal, Pagination, PaginationProps, Popconfirm, Space, Spin, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetProduct } from "./service/query/useGetProduct";
import { useDeleteProduct } from "./service/mutation/useDeleteProduct";
import { Searchbar } from "../../components/search/searchbar";
import { useState } from "react";

export const Products = () => {
    const navigate = useNavigate();
    const { mutate, isPending } = useDeleteProduct();

    const handleCreate = () => {
        navigate('/app/product/create');
    };

    const handleEdit = (productId: number) => {

        navigate(`/app/product/edit/${productId}`);

    };


    const [page, setPage] = useState(1)
    const [page1, setPage1] = useState(1)
    const { data, isLoading, refetch } = useGetProduct(page)


    const pageChange: PaginationProps["onChange"] = (page) => {
        setPage1(page)
        setPage((page - 1) * 4)
    }

    const handleDelete = (productId: string) => {
        mutate(productId, {
            onSuccess: () => {
                refetch();
            }
        });
    };


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => <Image width={60} height={60} src={image} alt="Product" style={{ objectFit: "cover" }} />,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Available',
            dataIndex: 'is_available',
            key: 'is_available',
            render: (isAvailable: boolean) => isAvailable ? 'Yes' : 'No',
        },
        {
            title: 'New',
            dataIndex: 'is_new',
            key: 'is_new',
            render: (isNew: boolean) => isNew ? 'Yes' : 'No',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (record: { id: string }) => (
                <span>
                    <Button style={{ marginRight: 20 }} type="primary" icon={<EditOutlined />} onClick={() => handleEdit(Number(record.id))}>Edit</Button>
                    <Popconfirm
                        title="Are you sure you want to delete this product?"
                        icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="default" danger icon={<DeleteOutlined />}>Delete</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>

            <Space style={{ display: 'flex', marginBottom: 10, alignItems: "start", justifyContent: "space-between" }}>
                <Button style={{ marginBottom: 0 }} onClick={handleCreate} className='button' type="primary" icon={<PlusCircleOutlined />} >
                    Create
                </Button>
                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "end" }}>
                    <Button icon={<SearchOutlined />} type="primary" onClick={showModal}>
                        Search
                    </Button>
                    <Modal title="Search Category" open={isModalOpen} onCancel={handleCancel}>
                        <Searchbar api_url='product' />
                    </Modal>
                    <Pagination
                        style={{ width: "100%", display: "flex", justifyContent: "end", marginBottom: 10, marginTop: 10 }}
                        current={page1}
                        total={data?.pageSize}
                        defaultCurrent={page}
                        pageSize={4}
                        onChange={pageChange} />
                </div>
            </Space>
            <Spin spinning={isPending || isLoading}>
                <Table pagination={false} className="table" dataSource={data?.data.results} columns={columns} />
            </Spin>
        </div>
    );
};
