import { useRef, useState } from 'react';
import { Button, Table, Popconfirm, message, Image, Spin } from 'antd';
import { useGetCategory } from './service/query/useGetCategory';
import { PlusCircleOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import './style.scss';
import { useDeleteCategory } from './service/mutation/useDeleteCategory';
import { useNavigate } from 'react-router-dom';
//@ts-ignore
import notification from './delete.mp3'

export const Category = () => {
    const { data, isLoading } = useGetCategory();
    const deleteCategoryMutation = useDeleteCategory();
    const { mutate: deleteCategory } = deleteCategoryMutation;
    const [deletedIds, setDeletedIds] = useState<number[]>([]);
    const navigate = useNavigate();

    const audioPlayer: any = useRef(null);

    const playAudio = () => {
        audioPlayer.current.play();
    }

    const handleDelete = (categoryId: number) => {
        deleteCategory(categoryId, {
            onSuccess: () => {
                message.success('Category deleted successfully!');
                setDeletedIds([...deletedIds, categoryId]);
                playAudio()
            },
            onError: () => {
                message.error('Something went wrong!');
            }
        });
    };

    const handleCreate = () => {
        navigate('/app/category/create');
    }

    const handleEdit = (categoryId: number) => {
        navigate(`/app/category/edit/${categoryId}`);
    };





    const filteredData = data ? data.filter(item => !deletedIds.includes(item.id)) : [];

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
                <div style={{ position: 'relative' }}>
                    <Image src={image}
                        alt="Category"
                        style={{ width: 70, height: 70, objectFit: 'cover', cursor: 'pointer' }}
                    />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0, transition: 'opacity 0.3s', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '50%', padding: '5px' }}>
                        <EyeOutlined style={{ fontSize: 24, color: '#fff' }} />
                    </div>
                </div>
            ),
            onCell: () => {
                return {
                    onMouseEnter: () => {
                        document.querySelector('.eye-icon')?.setAttribute('style', 'opacity: 1');
                    },
                    onMouseLeave: () => {
                        document.querySelector('.eye-icon')?.setAttribute('style', 'opacity: 0');
                    },
                };
            },
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
                    <Popconfirm
                        title="Are you sure you want to delete this category?"
                        onConfirm={() => handleDelete(data.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" icon={<DeleteOutlined />}>Delete</Button>
                        <audio ref={audioPlayer} src={notification} />
                    </Popconfirm>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(data.id)}>Edit</Button>
                </span>
            ),
        },
    ];

    return (
        <div>
            <Button onClick={handleCreate} className='button' type="primary" icon={<PlusCircleOutlined />} >
                Create
            </Button>

            <Spin spinning={isLoading}>
                <Table  className='table' dataSource={filteredData} columns={columns} />

            </Spin>


        </div>
    );
};
