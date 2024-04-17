import { useRef, useState } from 'react';
import { Button, Table, Popconfirm, message, Image, Spin, Space, Modal, PaginationProps, Pagination } from 'antd';
import { useGetCategory } from './service/query/useGetCategory';
import { PlusCircleOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import './style.scss';
import { useDeleteCategory } from './service/mutation/useDeleteCategory';
import { useNavigate } from 'react-router-dom';
//@ts-ignore
import notification from './delete.mp3'
import { Searchbar } from '../../components/search/searchbar';

export const Category = () => {
    const {mutate: deleteCategory, isPending} = useDeleteCategory();
    const [deletedIds, setDeletedIds] = useState<number[]>([]);
    const navigate = useNavigate();

    const [page, setPage] = useState(1)
    const [page1, setPage1] = useState(1)
    const { data, isLoading, refetch } = useGetCategory(page)

    const audioPlayer: any = useRef(null);

    const playAudio = () => {
        audioPlayer.current.play();
    }

    const dataSource = data?.data.results?.map((item) => ({
        key: item.id,
        id: item.id,
        image: <Image src={item.image} width={60} height={60} alt="img" />,
        title: item.title,
        actions: (
            <span className='btn_group'>
                <Popconfirm
                    title="Are you sure you want to delete this category?"
                    onConfirm={() => handleDelete(item.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger type="primary" icon={<DeleteOutlined />}>Delete</Button>
                    <audio ref={audioPlayer} src={notification} />
                </Popconfirm>
                <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(item.id)}>Edit</Button>
            </span>
        ),
    }));

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image'
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Actions',
            key: 'actions',
            dataIndex: "actions"
        },
    ];

    const pageChange: PaginationProps["onChange"] = (page) => {
        setPage1(page)
        setPage(page !== 1 ? (page -1 ) * 4 : 1)
    }

    const handleDelete = (categoryId: number) => {
        deleteCategory(categoryId, {
            onSuccess: () => {
                message.success('Category deleted successfully!');
                setDeletedIds([...deletedIds, categoryId]);
                playAudio()
                refetch()
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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };









    return (
        <div>
            <Space style={{ display: 'flex', marginBottom: 10, alignItems: "center", justifyContent: "space-between" }}>
                <Button style={{ marginBottom: 0 }} onClick={handleCreate} className='button' type="primary" icon={<PlusCircleOutlined />} >
                    Create
                </Button>
                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "end" }}>
                    <Button icon={<SearchOutlined />} type="primary" onClick={showModal}>
                        Search
                    </Button>
                    <Modal title="Search Category" open={isModalOpen} onCancel={handleCancel}>
                        <Searchbar api_url='category' />
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

            <Spin spinning={isLoading || isPending}>
                <Table pagination={false} className='table' dataSource={dataSource} columns={columns} />
            </Spin>


        </div>
    );
};
