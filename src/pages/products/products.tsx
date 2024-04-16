import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Image, Popconfirm, Spin, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetproduct } from "./service/query/useGetProduct";
import { useDeleteProduct } from "./service/mutation/useDeleteProduct";

export const Products = () => {
    const { data, refetch } = useGetproduct();
    const navigate = useNavigate();
    const { mutate, isPending } = useDeleteProduct();

    const handleCreate = () => {
        navigate('/app/products/create');
    };

    const handleEdit = (productId: number) => {
        
            navigate(`/app/products/edit/${productId}`);
        
    };

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
            render: (image: string) => <Image src={image} alt="Product" style={{ maxWidth: 70 }} />,
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
            render: (record: { id: string  }) => (
                <span>
                    <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(Number(record.id))}>Edit</Button>
                    <Popconfirm
                        title="Are you sure you want to delete this product?"
                        icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" icon={<DeleteOutlined />}>Delete</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    return (
        <div>
            <Button onClick={handleCreate} className='button' type="primary" icon={<PlusCircleOutlined />} >
                Create
            </Button>
            <Spin spinning={isPending}>
                <Table className="table" dataSource={data} columns={columns} />
            </Spin>
        </div>
    );
};
