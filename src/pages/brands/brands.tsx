import { Button, Image, Popconfirm, Table, message } from 'antd';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useGetBrand } from './service/query/useGetBrand';
import { useNavigate } from 'react-router-dom';
import { useDeleteBrand } from './service/mutation/useDeleteBrand';

export const Brands = () => {
    const { data: brands, isLoading, refetch} = useGetBrand();
    const navigate = useNavigate()
    const {mutate} = useDeleteBrand()

    const handleEdit = (record: any) => {
        console.log('Edit brand:', record);
    };

    const handleDelete = (brandId: number) => {
        mutate(brandId, {
            onSuccess: () => {
                message.info('Brand deleted successfully!');
                refetch()
            },
        });
    };
    

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
            render: (image: string | null) => (
                image ? <div style={{ width: 70, height: 70 }}>
                    <Image src={image} alt="Brand" style={{ objectFit: 'cover' }} />
                </div> : null
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
            render: (data: any) => (
                <div style={{ display: 'flex', gap: 10 }}>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(data)}>Edit</Button>
                    <Popconfirm
                    onConfirm={() => handleDelete(data?.id)}
                        title="Delete the task"
                        description="Are you sure to delete this brand?"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    >
                        <Button icon={<DeleteOutlined/>} danger>Delete</Button>
                    </Popconfirm>
                </div>
            )
        }
    ];

    

    return (
        <div>
            <Button onClick={() => navigate("/app/brands/create")} type="primary" icon={<PlusCircleOutlined />}>
                Create
            </Button>
            <Table
                className='brandTable'
                dataSource={brands}
                columns={columns}
                loading={isLoading}
                rowKey="id"
            />
        </div>
    );
};
