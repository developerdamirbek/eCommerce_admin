import { Button, Table, Spin, Popconfirm, message, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetSubcategories } from './service/query/useGetSubcategory';
import { useDeleteSubcategory } from './service/mutation/useDeleteSubcategory';

export const Subcategory = () => {
    const navigate = useNavigate();
    const { data: subcategories, isLoading, refetch } = useGetSubcategories();
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
                <Image src={image} style={{width: 80}} />
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
                <Button onClick={handleCreate} className='button' type="primary" icon={<PlusCircleOutlined />} >
                    Create
                </Button>
                <Spin spinning={isLoading}>
                    <Table className='table' dataSource={subcategories} columns={columns} />
                </Spin>
            </div>
        </Spin>
    );
};
