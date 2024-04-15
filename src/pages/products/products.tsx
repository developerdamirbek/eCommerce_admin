import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Image, Popconfirm, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetproduct } from "./service/query/useGetProduct";

export const Products = () => {
    const { data } = useGetproduct();
    const navigate = useNavigate();

    const handleCreate = () => {
        navigate('/app/products/create');
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
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
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
            render: ( record: any) => (
                <span>
                    <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
                    <Popconfirm
                        title="Are you sure you want to delete this product?"
                        icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => handleDelete(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" icon={<DeleteOutlined />}>Delete</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];
    
    // Assuming you have functions to handle edit and delete actions
    
    const handleEdit = (record) => {
        console.log(record);
        
    };
    
    const handleDelete = () => {
        
    };

    return (
        <div>
            <Button onClick={handleCreate} className='button' type="primary" icon={<PlusCircleOutlined />} >
                Create
            </Button>
            <Table className="table" dataSource={data} columns={columns} />
        </div>
    );
};
