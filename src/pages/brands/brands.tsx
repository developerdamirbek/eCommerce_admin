import { Button, Image, Pagination, PaginationProps, Popconfirm, Select, Spin, Table, message } from 'antd';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useGetBrand } from './service/query/useGetBrand';
import { useNavigate } from 'react-router-dom';
import { useDeleteBrand } from './service/mutation/useDeleteBrand';
import { useEffect, useState } from 'react';
import { Option } from 'antd/es/mentions';

interface Brand {
    id: number;
    image: string | null;
    title: string;
}

export const Brands: React.FC = () => {
    const [ordering, setOrdering] = useState("id");
    const [page, setPage] = useState(1)
    const [page1, setPage1] = useState(1)


    const { data: brands, isLoading, refetch } = useGetBrand(ordering, page);
    const pageChange: PaginationProps["onChange"] = (page) => {
        setPage1(page)
        setPage(page !== 1 ? (page - 1) * 4 : 1)
    }
    const navigate = useNavigate();
    const { mutate, isPending } = useDeleteBrand();

    const handleEdit = (brandId: number) => {
        navigate(`/app/brand/edit/${brandId}`);
    };

    useEffect(() => {
        refetch();
    }, [ordering]);

    const handleChange = (value: string) => {
        setOrdering(value);
    };

    const handleDelete = (brandId: number) => {
        mutate(brandId, {
            onSuccess: () => {
                message.info('Brand deleted successfully!');
                refetch();
            },
        });
    };

    const options = [
        { value: "id", label: "ID - Ascending" },
        { value: "-id", label: "ID - Descending" },
        { value: "title", label: "Title - Ascending" },
        { value: "-title", label: "Title - Descending" }
    ];

    const columns = [
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
                <Image width={60} height={60} src={image} alt="Brand" style={{ objectFit: 'cover' }} />
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
            render: (_: any, data: Brand) => (
                <div style={{ display: 'flex', gap: 10 }}>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(data.id)}>Edit</Button>
                    <Popconfirm
                        onConfirm={() => handleDelete(data.id)}
                        title="Delete the task"
                        description="Are you sure to delete this brand?"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    >
                        <Button icon={<DeleteOutlined />} danger>Delete</Button>
                    </Popconfirm>
                </div>
            )
        }
    ];

    return (
        <div>
            <div style={{ width: "100%", display: "flex", alignItems: "start", justifyContent: "space-between" }}>
                <Button style={{ marginBottom: 20 }} onClick={() => navigate("/app/brand/create")} type="primary" icon={<PlusCircleOutlined />}>
                    Create
                </Button>
                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "end" }}>
                    <Select placeholder defaultValue={ordering} style={{ width: 200, marginBottom: 10 }} onChange={handleChange}>
                        {options.map(option => (
                            <Option key={option.value} value={option.value}>{option.label}</Option>
                        ))}
                    </Select>
                    <Pagination
                        style={{ width: "100%", display: "flex", justifyContent: "end", marginBottom: 10, marginTop: 10 }}
                        current={page1}
                        total={brands?.pageSize}
                        defaultCurrent={page}
                        pageSize={4}
                        onChange={pageChange} />
                </div>
            </div>
            <Spin spinning={isLoading || isPending}>
                <Table
                    className='brandTable'
                    dataSource={brands?.data.results}
                    columns={columns}
                    loading={isLoading}
                    pagination={false}
                />
            </Spin>
        </div>
    );
};